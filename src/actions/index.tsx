import firebase from '../firebase/firebase.js';
import axios from 'axios';
import rakutenid from '../rakutenid';
import { ThunkDispatch } from 'redux-thunk';

interface newUserType {
  name: string;
  email: string;
  password: string;
}

interface myBooksType {
  _id: string;
  title: string;
  loginUserId: string;
  itemUrl: string;
  image: string;
  caption: string;
  author: string;
}

interface searchResultType {
  title: string;
  itemUrl: string;
  image: string;
  price: number;
  caption: string;
  author: string;
}

interface newBookType {
  title: string,
  author: string,
  image: string,
  caption: string | null,
  itemUrl: string,
}

interface newNoteType {
  _id: string,
  purpose: string,
  point: string,
  explain: string,
  impression: string,
  bookId: string,
  loginUserId: string
}

interface addNoteType {
  purpose: string,
  point: string,
  explain: string,
  impression: string,
  bookId: string,
  loginUserId: string,
}

interface editNoteType {
  purpose: string,
  point: string,
  explain: string,
  impression: string,
  noteId: string,
}

const PORT: string = process.env.REACT_APP_PORT || "http://localhost:3002";

export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';
export const SET_MY_BOOKS = 'SET_MY_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const DELETE_ONE_BOOK = 'DELETE_ONE_BOOK';
export const SET_NOTES = 'SET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_ONE_NOTE = 'DELETE_ONE_NOTE';

export const setUserInfo = (name: string | null, email: string | null) => {
  return (
    {
      type: SET_USER_INFO,
      name,
      email,
      login_user: true
    }
  )
}

export const logoutUser = () => {
  return (
    {
      type: LOGOUT_USER
    }
  )
}

export const setSearchResult = (result: searchResultType[]) => {
  return (
    {
      type: SET_SEARCH_RESULT,
      result
    }
  )
}

export const setMyBooks = (myBooks: myBooksType[]) => {
  return (
    {
      type: SET_MY_BOOKS,
      myBooks
    }
  )
}

export const createBook = (bookInfo: newBookType, loginUserId: string, bookId: string) => {
  return (
    {
      type: CREATE_BOOK,
      bookInfo,
      loginUserId,
      bookId
    }
  )
}

export const deleteOneBook = (id: string) => {
  return (
    {
      type: DELETE_ONE_BOOK,
      id,
    }
  )
}

export const setNotes = (newNotes: newNoteType[]) => {
  return (
    {
      type: SET_NOTES,
      newNotes,
    }
  )
}

export const addNote = (noteId: string, newNote: addNoteType) => {
  return (
    {
      type: ADD_NOTE,
      noteId,
      newNote,
    }
  )
}

export const updateNote = (newNote: editNoteType) => {
  return (
    {
      type: UPDATE_NOTE,
      newNote
    }
  )
}

export const deleteOneNote = (id: string) => {
  return (
    {
      type: DELETE_ONE_NOTE,
      id,
    }
  )
}

export const getMyBooks = (loginUserId: string) => (dispatch: any) => {
  console.log(PORT);
  axios.get(`${PORT}/books`)
    .then(res => {
      const myBooks: myBooksType[] = res.data.filter(element => element.loginUserId === loginUserId);
      dispatch(setMyBooks(myBooks));
    })
}

export const registerBook = (newBook: newBookType, loginUserId: string) => (dispatch: any) => {
  axios.post('http://localhost:3002/books', {
    title: newBook.title,
    author: newBook.author,
    image: newBook.image,
    caption: newBook.caption,
    itemUrl: newBook.itemUrl,
    loginUserId
  })
    .then(res => {
      const bookId: string = res.data._id;
      dispatch(createBook(newBook, loginUserId, bookId));
    }).catch(error => {
      console.log(error);
    })
}

export const deleteBook = (id: string) => (dispatch: any) => {
  axios.delete(`http://localhost:3002/books/${id}`)
    .then(res => {
      dispatch(deleteOneBook(res.data));
    })
}

export const getNotes = (bookId: string) => (dispatch: any) => {
  axios.get('http://localhost:3002/notes')
    .then(res => {
      const getNotes = res.data.filter(element => element.bookId === bookId);
      if (getNotes.length > 0) {
        const newNotes: newNoteType[] = [];
        getNotes.forEach(element => {
          const newNote: newNoteType = {
            _id: element._id,
            purpose: element.purpose,
            point: element.point,
            impression: element.impression,
            explain: element.explain,
            bookId: element.bookId,
            loginUserId: element.loginUserId
          }
          newNotes.push(newNote);
        });
        dispatch(setNotes(newNotes));
      }
    })
}

export const createNote = (purpose: string, point: string, explain: string, impression: string, bookId: string, loginUserId: string) => (dispatch: any) => {
  axios.post('http://localhost:3002/notes', {
    purpose,
    point,
    explain,
    impression,
    bookId,
    loginUserId
  })
    .then(res => {
      const noteId: string = res.data._id;
      const newNote: addNoteType = {
        purpose: res.data.purpose,
        point: res.data.point,
        explain: res.data.explain,
        impression: res.data.impression,
        bookId: res.data.bookId,
        loginUserId: res.data.loginUserId
      };
      dispatch(addNote(noteId, newNote));
    }).catch(error => {
      console.log(error);
    })
}

export const editNote = (noteId: string, purpose: string, point: string, explain: string, impression: string) => (dispatch: any) => {
  const newNote: editNoteType = {
    noteId,
    purpose,
    point,
    explain,
    impression
  };
  axios.put(`http://localhost:3002/notes/${noteId}`, newNote)
    .then(res => {
      dispatch(updateNote(newNote));
    })
}


export const deleteNote = (id: string) => (dispatch: any) => {
  axios.delete(`http://localhost:3002/notes/${id}`)
    .then(res => {
      dispatch(deleteOneNote(res.data));
    })
}

export const fetchBooksInfo = (searchWord: string) => (dispatch: any) => {
  axios.get("https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?", {
    params: {
      applicationId: rakutenid, //楽天でログインし、自分のアプリケーションIDを取得
      title: searchWord, //後で変数にし、検索フォームのキーワードで検索できるようにする
    },
  }).then(res => {
    const newArray: searchResultType[] = [];
    res.data.Items.forEach(element => {
      newArray.push({
        title: element.Item.title,
        author: element.Item.author,
        image: element.Item.largeImageUrl,
        price: element.Item.itemPrice,
        caption: element.Item.itemCaption,
        itemUrl: element.Item.itemUrl
      })
    })
    dispatch(setSearchResult(newArray))
  });
}


export const userRegister = (user: newUserType) => (dispatch: any) => {

  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(async result => {
      // 「firebase.auth().currentUser」の後に「!」で修飾することで、「firebase.auth().currentUserがnullならupdateProfileを行わない」という処理を行う。
      firebase.auth().currentUser!.updateProfile({
        displayName: user.name
      })
        .then(result2 => {
          dispatch(setUserInfo(user.name, user.email))
        }).catch((error) => {
          alert('ユーザー登録に失敗しました。お手数ですがもう一度やり直してください')
        })
    }).catch((error) => {
      alert('入力したメールアドレスはすでに使用されています。')
    })
}

export const signIn = (email: string, password: string) => (dispatch: any) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      const userName: string | null = result.user!.displayName;
      const userEmail: string | null = result.user!.email;
      dispatch(setUserInfo(userName, userEmail));
    }).catch((error) => {
      alert('メールアドレスかパスワードが間違えています')
    })
}

export const signOut = () => (dispatch: any) => {
  firebase.auth().signOut()
    .then(result => {
      dispatch(logoutUser());
    }).catch((error) => {
      alert('ログアウトに失敗しました。お手数ですがもう1度お試しください')
    })
}