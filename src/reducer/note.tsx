import { SET_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_ONE_NOTE } from '../actions';

interface NoteType {
  noteId: string,
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
    case SET_NOTES:
      state = [];
      action.newNotes.forEach(element => {
        const myNotes: NoteType = {
          noteId: element._id,
          purpose: element.purpose,
          point: element.point,
          explain: element.explain,
          impression: element.impression,
          bookId: element.bookId,
          loginUserId: element.loginUserId,
        }
        state.push(myNotes)
      })
      return [...state];
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
    case UPDATE_NOTE:
      const target1 = state.findIndex(element => element.noteId === action.newNote.noteId);
      if (target1 !== -1) {
        state.splice(target1, 1, action.newNote);
        return [...state];
      } else {
        return [...state];
      }
    case DELETE_ONE_NOTE:
      const target2 = state.findIndex(element => element.noteId === action.id);
      if (target2 !== -1) {
        state.splice(target2, 1);
        return [...state]
      } else {
        return [...state];
      }
    default:
      return state;
  }
}