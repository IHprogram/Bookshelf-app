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
import Mypage from './Mypage';
import firebase from '../firebase/firebase';
import { setUserInfo } from '../actions/index';
import { UserInfo } from '../Types';
import Detail from '../components/Detail';
import NoteCreateForm from './NoteCreateForm';
import NoteEditForm from './NoteEditForm';
import MyNotes from '../components/MyNotes';
import NoteDetail from '../components/NoteDetail';

function App() {
  const dispatch = useDispatch();
  const loginUserState = useSelector((state: { User: UserInfo }) => state.User.login_user);

  const [loginUser, setLoginUser] = useState<boolean>(false),
    [loginUserId, setLoginUserId] = useState<string>('');

  useEffect(() => {
    console.log('PORTです: ', process.env.PORT, process.env);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId: string | null = user.uid;
        const name: string | null = user.displayName;
        const email: string | null = user.email;
        dispatch(setUserInfo(name, email));
        setLoginUserId(userId);
      }
    })
  }, []);

  useEffect(() => {
    setLoginUser(loginUserState);
  }, [loginUserState]);

  return (
    <Router>
      <Header loginUser={loginUser} />
      <Switch>
        <Route exact path='/detail/:id'>
          <Detail loginUser={loginUser} loginUserId={loginUserId} />
        </Route>
        <Route exact path='/notedetail/:id'>
          <NoteDetail />
        </Route>
        <Route exact path='/mynotes'>
          <MyNotes />
        </Route>
        <Route exact path='/noteform'>
          <NoteCreateForm loginUserId={loginUserId} />
        </Route>
        <Route exact path='/noteeditform'>
          <NoteEditForm />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/mypage'>
          <Mypage loginUserId={loginUserId} />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
