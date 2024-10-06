// routes/book.js
import express from 'express';
import { CreateBook, GetAllBooks, GetBookById, UpdateBook, DeleteBook } from '../controllers/book.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Create a new book
router.post('/', verifyToken, CreateBook); // Protect route with JWT

// Get all books created by the logged-in user
router.get('/', verifyToken, GetAllBooks); // Protect route with JWT

// Get a single book by ID (only if the user is the owner)
router.get('/:id', verifyToken, GetBookById); // Protect route with JWT

// Update a book by ID (only if the user is the owner)
router.put('/:id', verifyToken, UpdateBook); // Protect route with JWT

// Delete a book by ID (only if the user is the owner)
router.delete('/:id', verifyToken, DeleteBook); // Protect route with JWT

export default router;
