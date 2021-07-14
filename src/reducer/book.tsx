import { SET_MY_BOOKS, CREATE_BOOK, DELETE_ONE_BOOK } from '../actions';

interface BookInfoType {
  bookId: string,
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
    case SET_MY_BOOKS:
      if (action.myBooks.length > 0) {
        state.bookArray = [];
        state.userId = action.myBooks[0].loginUserId;
        action.myBooks.forEach(element => {
          const myBook: BookInfoType = {
            bookId: element._id,
            title: element.title,
            author: element.author,
            image: element.image,
            caption: element.caption,
            itemUrl: element.itemUrl,
          }
          state.bookArray.push(myBook);
        });
        console.log(state);
        return { ...state }
      } else {
        return { ...state }
      }
    case CREATE_BOOK:
      const newBook = {
        ...action.bookInfo,
        bookId: action.bookId
      }
      state.userId = action.loginUserId;
      state.bookArray.push(newBook)
      return { ...state };
    case DELETE_ONE_BOOK:
      const target = state.bookArray.findIndex(element => element.bookId === action.id);
      console.log(target)
      if (target !== -1) {
        state.bookArray.splice(target, 1);
        console.log(state);
        return { userId: state.userId, bookArray: [...state.bookArray] };
      } else {
        return { ...state };
      }
    default:
      return state;
  }
}