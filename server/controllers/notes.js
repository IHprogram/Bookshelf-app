import Note from "../models/notes.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    console.log(notes)
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
  }
}

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

export const deleteNote = async (req, res) => {
  console.log('リクエストです', req.params.id)
  const id = req.params.id;
  try {
    await Note.deleteOne({ _id: id });
    res.status(200).json(id);
  } catch (error) {
    console.log(error);
  }
}