import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

import { Storage } from '@google-cloud/storage';

dotenv.config();

const storage = new Storage({
  keyFilename: path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Multer middleware to parse multipart/form-data into req.file
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Middleware to upload file buffer to GCS and generate signed URL
export const uploadToGCS = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const blob = bucket.file(`tasks/${Date.now()}_${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: req.file.mimetype,
    });

    blobStream.on('error', err => next(err));

    blobStream.on('finish', async () => {
      try {
        // Generate a signed URL valid for 1 hour
        const [url] = await blob.getSignedUrl({
          version: 'v4',
          action: 'read',
          expires: Date.now() + 60 * 60 * 1000, // 1 hour
        });
        req.file.publicUrl = url;
        next();
      } catch (err) {
        next(err);
      }
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    next(err);
  }
};

export default upload;
