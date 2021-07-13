import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Link,
} from 'react-router-dom';


function Mypage() {
  const [registeredBooks, setRegisteredBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3002/books')
      .then(res => {
        console.log(res.data)
        setRegisteredBooks(res.data);
      })
  }, [])

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
