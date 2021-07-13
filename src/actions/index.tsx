import firebase from '../firebase/firebase.js';
import axios from 'axios';
import rakutenid from '../rakutenid';

interface newUserType {
  name: string;
  email: string;
  password: string;
}

export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';

export const setUserInfo = (name, email) => {
  return (
    {
      type: SET_USER_INFO,
      name: name,
      email: email,
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