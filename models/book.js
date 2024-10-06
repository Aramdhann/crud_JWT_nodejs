// models/book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // Name of the user model
        required: true,
      },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model('Book', bookSchema);
