import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['TODO', 'DONE'],
    default: 'TODO',
  },
  // Store file data and its MIME type
   linkedFile: {
    url:         { type: String },
    contentType: { type: String, enum: ['application/pdf'] },
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required'],
    validate: {
      validator: value => value > Date.now(),
      message: 'Deadline must be in the future'
    },
  }
}, {
  timestamps: true,            // adds createdAt / updatedAt
  toJSON: { virtuals: true },  // if you want to expose virtuals
  toObject: { virtuals: true }
});

// (Optional) A virtual to check existence of a file
// taskSchema.virtual('hasFile').get(function() {
//   return !!(this.linkedFile && this.linkedFile.data);
// });


export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

