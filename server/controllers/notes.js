import Note from "../models/notes.js";

export const createNote = async (req, res) => {
  console.log(req.body);
  const purpose = req.body.purpose;
  const point = req.body.point;
  const explain = req.body.explain;
  const impression = req.body.impression;
  const bookId = req.body.bookId;
  const loginUserId = req.body.loginUserId;
  const newBook = new Note({
    purpose,
    point,
    explain,
    impression,
    bookId,
    loginUserId
  })
  try {
    await newBook.save().then(() => {
      res.status(201).json(newBook);
    })
  } catch (error) {
    console.log(error);
  }
}