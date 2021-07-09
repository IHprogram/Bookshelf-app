import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  Link,
} from 'react-router-dom';

function Header() {
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
      }
    }),
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.logo}>
              Bookshelf App
            </Link>
          </Typography>
          <Button color="inherit">ログイン</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
