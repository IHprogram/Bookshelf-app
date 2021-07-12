import firebase from '../firebase/firebase.js';

interface newUserType {
  name: string;
  email: string;
  password: string;
}

export const userRegister = (user: newUserType) => (dispatch) => {
  console.log(user);

  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(async result => {
      // 「firebase.auth().currentUser」の後に「!」で修飾することで、「firebase.auth().currentUserがnullならupdateProfileを行わない」という処理を行う。
      firebase.auth().currentUser!.updateProfile({
        displayName: user.name
      })
        .then(result2 => {
          console.log(result);
          const user = result.user;
          if (user) {
            console.log(user)
          }
        }).catch((error) => {
          alert('ユーザー登録に失敗しました。お手数ですがもう一度やり直してください')
        })
    }).catch((error) => {
      console.log(error)
      alert('入力したメールアドレスはすでに使用されています。')
    })
}