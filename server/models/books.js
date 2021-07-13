import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  caption: String,
  itemUrl: String
})

const Book = mongoose.model('Book', booksSchema);
export default Book;