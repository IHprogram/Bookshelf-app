import Book from "../models/books.js";

export const getBooks = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
}

export const createBook = async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const image = req.body.image;
  const caption = req.body.caption;
  const itemUrl = req.body.itemUrl;
  const loginUserId = req.body.loginUserId;
  const newBook = new Book({
    title,
    author,
    image,
    caption,
    itemUrl,
    loginUserId,
  })
  try {
    await newBook.save().then(() => {
      res.status(201).json(newBook);
    })
  } catch (error) {
    console.log(error);
  }
}