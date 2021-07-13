import { CREATE_BOOK } from '../actions';

interface BookInfoType {
  bookId: string
  title: string,
  author: string,
  image: string,
  caption: string,
  itemUrl: string,
}

interface UsersBooksType {
  userId: string,
  bookArray: BookInfoType[]
}

const initialState: UsersBooksType = {
  userId: '',
  bookArray: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      const newBook = {
        ...action.bookInfo,
        bookId: action.bookId
      }
      state.userId = action.loginUserId;
      state.bookArray.push(newBook)
      return { ...state };
    default:
      return state;
  }
}