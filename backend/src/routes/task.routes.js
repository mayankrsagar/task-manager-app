import express from 'express';

import * as TaskController from '../controllers/task.controller.js';
import upload, { uploadToGCS } from '../upload.js';

const router = express.Router();

// List tasks
router.get('/', TaskController.getTasks);

// Create task with optional file upload to GCS
// 'linkedFile' matches the form field name expected in multer
router.post(
  '/add',
  upload.single('linkedFile'),   // handle single file field 'linkedFile'
  uploadToGCS,                   // upload to Google Cloud Storage
  TaskController.createTask
);

// Update task with optional file upload to GCS
router.patch(
  '/:id',
  upload.single('linkedFile'),
  uploadToGCS,
  TaskController.updateTask
);

// Delete task
router.delete('/:id', TaskController.deleteTask);

// Download file for a task
router.get('/:id/file', TaskController.getTaskFile);

export default router;
