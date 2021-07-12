import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import firebase from '../firebase/firebase';
import { setUserInfo } from '../actions/index';
import { UserInfo } from '../Types';

function App() {
  const dispatch = useDispatch();
  const loginUserState = useSelector((state: { User: UserInfo }) => state.User.login_user);

  const [loginUser, setLoginUser] = useState<boolean>(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(loginUserState);
      console.log(user)
      if (user) {
        const name: string | null = user.displayName;
        const email: string | null = user.email;
        dispatch(setUserInfo(name, email));
      }
    })
  }, []);

  useEffect(() => {
    console.log(loginUserState);
    setLoginUser(loginUserState);
  }, [loginUserState]);

  return (
    <Router>
      <Header loginUser={loginUser} />
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/'>
          <button onClick={() => console.log(loginUserState)}>確認</button>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
