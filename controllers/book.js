// controllers/book.js
import Book from '../models/book.js';

// Create a new book
export async function CreateBook(req, res) {
  const { title, description } = req.body;
  const userId = req.user.id; // Extract user id from JWT token

  try {
    const newBook = new Book({ title, description, user: userId });
    const savedBook = await newBook.save();

    return res.status(201).json({
      status: 'success',
      data: savedBook,
      message: 'Book created successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Error creating book.',
    });
  }
}

// Get all books created by the logged-in user
export async function GetAllBooks(req, res) {
  const userId = req.user.id;

  try {
    const books = await Book.find({ user: userId }); // Find books created by the logged-in user
    return res.status(200).json({
      status: 'success',
      data: books,
      message: 'Books fetched successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Error fetching books.',
    });
  }
}

// Get a book by ID (if the logged-in user created it)
export async function GetBookById(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const book = await Book.findOne({ _id: id, user: userId }); // Find the book by id and user

    if (!book) {
      return res.status(404).json({
        status: 'failed',
        message: 'Book not found or you are not the owner',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: book,
      message: 'Book fetched successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Error fetching book.',
    });
  }
}

// Update a book by ID (if the logged-in user created it)
export async function UpdateBook(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id, user: userId }, // Match the book by id and user
      { title, description },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        status: 'failed',
        message: 'Book not found or you are not the owner',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: updatedBook,
      message: 'Book updated successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Error updating book.',
    });
  }
}

// Delete a book by ID (if the logged-in user created it)
export async function DeleteBook(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedBook = await Book.findOneAndDelete({ _id: id, user: userId }); // Match the book by id and user

    if (!deletedBook) {
      return res.status(404).json({
        status: 'failed',
        message: 'Book not found or you are not the owner',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Book deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Error deleting book.',
    });
  }
}
