import firebase from '../firebase/firebase.js';

interface newUserType {
  name: string;
  email: string;
  password: string;
}

export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';

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

export const signOut = () => (dispatch) => {
  firebase.auth().signOut()
    .then(result => {
      dispatch(logoutUser());
    }).catch((error) => {
      alert('ログアウトに失敗しました。お手数ですがもう1度お試しください')
    })
}