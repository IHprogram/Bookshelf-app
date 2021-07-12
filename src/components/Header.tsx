import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  Link,
} from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signOut } from '../actions/index'

interface Props {
  loginUser: boolean
}

function Header({ loginUser }: Props) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      logo: {
        color: '#ffffff',
        textDecoration: 'none',
        marginRight: '20px'
      },
      logout: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        padding: '0',
        color: '#ffffff',
        fontSize: '16px'
      },
      link: {
        color: '#ffffff',
        textDecoration: 'none',
        marginRight: '20px'
      }
    }),
  );

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()

  const LoginOrLogout = (props) => {
    const clickLogout = () => {
      dispatch(signOut());
    };

    if (props.loginUser === true) {
      return (
        <React.Fragment>
          <Link to='/mypage' className={classes.link}>マイページ</Link>
          <Button className={classes.logout} onClick={() => { clickLogout(); }}>ログアウト</Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Link to='/login' className={classes.link}>ログイン</Link>
          <Link to='/register' className={classes.link}>新規登録</Link>
        </React.Fragment>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.logo}>
              Bookshelf App
            </Link>
          </Typography>
          <div>
            <LoginOrLogout loginUser={loginUser} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
