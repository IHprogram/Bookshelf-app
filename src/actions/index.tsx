import firebase from '../firebase/firebase.js';
import axios from 'axios';
import rakutenid from '../rakutenid';

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

export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';
export const SET_MY_BOOKS = 'SET_MY_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const DELETE_ONE_BOOK = 'DELETE_ONE_BOOK';
export const SET_NOTES = 'SET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';

export const setUserInfo = (name, email) => {
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

export const setSearchResult = (result) => {
  return (
    {
      type: SET_SEARCH_RESULT,
      result
    }
  )
}

export const setMyBooks = (myBooks) => {
  return (
    {
      type: SET_MY_BOOKS,
      myBooks
    }
  )
}

export const createBook = (bookInfo, loginUserId, bookId) => {
  return (
    {
      type: CREATE_BOOK,
      bookInfo,
      loginUserId,
      bookId
    }
  )
}

export const deleteOneBook = (id) => {
  return (
    {
      type: DELETE_ONE_BOOK,
      id,
    }
  )
}

export const setNotes = (newNotes) => {
  return (
    {
      type: SET_NOTES,
      newNotes,
    }
  )
}

export const addNote = (noteId, newNote) => {
  return (
    {
      type: ADD_NOTE,
      noteId,
      newNote,
    }
  )
}

export const getMyBooks = (loginUserId) => (dispatch) => {
  console.log(loginUserId);
  axios.get('http://localhost:3002/books')
    .then(res => {
      console.log(res.data);
      const myBooks: myBooksType[] = res.data.filter(element => element.loginUserId === loginUserId);
      console.log(myBooks);
      dispatch(setMyBooks(myBooks));
    })
}

export const registerBook = (newBook, loginUserId) => (dispatch) => {
  console.log(newBook);
  axios.post('http://localhost:3002/books', {
    title: newBook.title,
    author: newBook.author,
    image: newBook.image,
    caption: newBook.caption,
    itemUrl: newBook.itemUrl,
    loginUserId
  })
    .then(res => {
      console.log('resです', res)
      const bookId: string = res.data._id;
      console.log(bookId);
      dispatch(createBook(newBook, loginUserId, bookId));
    }).catch(error => {
      console.log(error);
    })
}

export const deleteBook = (id) => (dispatch) => {
  axios.delete(`http://localhost:3002/books/${id}`)
    .then(res => {
      console.log(res);
      dispatch(deleteOneBook(res.data));
    })
}

export const getNotes = (bookId) => (dispatch) => {
  console.log(bookId);
  axios.get('http://localhost:3002/notes')
    .then(res => {
      console.log('responseデータです', res.data)
      const newNotes = res.data.filter(element => element.bookId === bookId);
      console.log(newNotes);
      if (newNotes.length > 0) {
        dispatch(setNotes(newNotes));
      } else {
        console.log('newNotesは空です')
      }
    })
}

export const createNote = (purpose, point, explain, impression, bookId, loginUserId) => (dispatch) => {
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
      const newNote = res.data;
      dispatch(addNote(noteId, newNote));
    }).catch(error => {
      console.log(error);
    })
}

export const fetchBooksInfo = (searchWord) => (dispatch) => {
  console.log(searchWord);
  axios.get("https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?", {
    params: {
      applicationId: rakutenid, //楽天でログインし、自分のアプリケーションIDを取得
      title: searchWord, //後で変数にし、検索フォームのキーワードで検索できるようにする
    },
  }).then(res => {
    console.log(res.data.Items);
    dispatch(setSearchResult(res.data.Items))
  });
}


export const userRegister = (user: newUserType) => (dispatch) => {

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

export const signIn = (email, password) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      const userName: string | null = result.user!.displayName;
      const userEmail: string | null = result.user!.email;
      dispatch(setUserInfo(userName, userEmail));
    }).catch((error) => {
      alert('メールアドレスかパスワードが間違えています')
    })
}

export const signOut = () => (dispatch) => {
  firebase.auth().signOut()
    .then(result => {
      dispatch(logoutUser());
    }).catch((error) => {
      alert('ログアウトに失敗しました。お手数ですがもう1度お試しください')
    })
}