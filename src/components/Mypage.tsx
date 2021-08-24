import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Link,
} from 'react-router-dom';
import { getMyBooks, deleteBook, setUserInfo } from '../actions/index';
import Button from '@material-ui/core/Button';
import firebase from '../firebase/firebase';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface Props {
  loginUserId: string
}

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

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    margin: '0 auto 30px',
    maxWidth: "50%",
  },
  bookWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  bookImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  bookLink: {
    textDecoration: 'none',
    color: 'orange'
  },
  bookInfo: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  deleteButton: {
    width: '50%'
  }
}));

function Mypage({ loginUserId }: Props) {
  const initialState: BookInfoType[] = [];

  const [registeredBooks, setRegisteredBooks] = useState(initialState),
    [loginUserIdState, setLoginUserIdState] = useState<string>('');
  const dispatch = useDispatch();

  const myBooks: BookInfoType[] = useSelector((state: { Book: UsersBooksType }) => state.Book.bookArray);

  const classes = useStyles();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId: string | null = user.uid;
        const name: string | null = user.displayName;
        const email: string | null = user.email;
        dispatch(setUserInfo(name, email));

        if (loginUserId === "") {
          dispatch(getMyBooks(userId));
        } else {
          dispatch(getMyBooks(loginUserId));
        }
      }
    })
  }, []);

  useEffect(() => {
    setRegisteredBooks(myBooks)
  }, [myBooks]);

  const deleteButton = (id) => {
    dispatch(deleteBook(id))
  }

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <h2>- 登録書籍一覧 -</h2>
      </Grid>
      <ul>
        {registeredBooks.length === 0 &&
          <p>登録した本はありません。</p>
        }
        {registeredBooks.map((element: any, index: any) => {
          return (
            <li key={index} className={classes.list}>
              <Card>
                <CardContent className={classes.bookWrapper}>
                  <div className={classes.bookImageWrapper}>
                    <img src={element.image} />
                  </div>
                  <Grid container alignItems="center" justify="center">
                    <Link to={{
                      pathname: `/detail/${index + 1}`,
                      state: { searchdata: element }
                    }}
                      className={classes.bookLink} >
                      {element.title}
                    </Link>
                  </Grid>

                  <Grid container alignItems="center" justifyContent="center">
                    <Typography>
                      {element.author}
                    </Typography>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="center">
                    <Typography>
                      <Link to={{
                        pathname: `/noteform`,
                        state: { bookId: element.bookId }
                      }}
                        className={classes.bookLink} >
                        ノートを作成する
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="center">
                    <Typography>
                      <Link to={{
                        pathname: `/mynotes`,
                        state: { bookId: element.bookId, title: element.title }
                      }}
                        className={classes.bookLink}>
                        この本のノートを見る
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="center">
                    <Button variant="outlined" color="secondary" onClick={() => deleteButton(element.bookId)} className={classes.deleteButton}>削除</Button>
                  </Grid>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Mypage
