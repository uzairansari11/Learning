import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  order: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export const Todo = mongoose.model('Todo', todoSchema); 