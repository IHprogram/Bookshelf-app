import express from 'express';
import { createNote } from '../controllers/notes.js';

const router = express.Router();

router.post('/', createNote);

export default router;