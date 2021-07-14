import { ADD_NOTE } from '../actions';

interface NoteType {
  noteId: string
  purpose: string,
  point: string,
  explain: string,
  impression: string,
  bookId: string,
  loginUserId: string,
}

const initialState: NoteType[] = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      const newNote: NoteType = {
        noteId: action.noteId,
        purpose: action.newNote.purpose,
        point: action.newNote.point,
        explain: action.newNote.explain,
        impression: action.newNote.impression,
        bookId: action.newNote.bookId,
        loginUserId: action.newNote.loginUserId
      }
      return [...state, newNote];
    default:
      return state;
  }
}