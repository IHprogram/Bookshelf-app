import express from 'express';
import { getBooks, createBook, deleteBook } from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooks)
router.post('/', createBook);
router.delete('/:id', deleteBook);

export default router;