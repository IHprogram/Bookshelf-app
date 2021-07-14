import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  purpose: String,
  point: String,
  explain: String,
  impression: String,
  bookId: String,
  loginUserId: String
})

const Note = mongoose.model('Note', notesSchema);
export default Note;