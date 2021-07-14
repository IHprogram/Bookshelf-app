import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Link,
} from 'react-router-dom';
import { getMyBooks, deleteBook } from '../actions/index';
import Button from '@material-ui/core/Button';

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

function Mypage({ loginUserId }: Props) {
  const initialState: BookInfoType[] = [];

  const [registeredBooks, setRegisteredBooks] = useState(initialState);
  const dispatch = useDispatch();

  const myBooks: BookInfoType[] = useSelector((state: { Book: UsersBooksType }) => state.Book.bookArray);

  useEffect(() => {
    dispatch(getMyBooks(loginUserId));
  }, []);

  useEffect(() => {
    setRegisteredBooks(myBooks)
  }, [myBooks]);

  const deleteButton = (id) => {
    dispatch(deleteBook(id))
  }

  return (
    <div>
      <h2>登録した本</h2>
      <ul>
        {registeredBooks.length === 0 &&
          <p>登録した本はありません。</p>
        }
        {registeredBooks.map((element: any, index: any) => {
          return (
            <li key={index}>
              <Card>
                <CardContent>
                  <Typography>
                    <img src={element.image} />
                  </Typography>
                  <Typography>
                    <Link to={{
                      pathname: `/detail/${index + 1}`,
                      state: { searchdata: element }
                    }}
                    >
                      {element.title}
                    </Link>
                  </Typography>
                  <Typography>
                    {element.author}
                  </Typography>
                  <Button variant="outlined" color="secondary" onClick={() => deleteButton(element.bookId)}>削除</Button>
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