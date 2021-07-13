import React, { useState, useEffect } from 'react'
import SearchForm from './SearchForm';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

interface BookInfoType {
  title: string,
  author: string,
  image: string,
  price: number,
  caption: string,
  itemUrl: string
}

function Home() {
  const initial: BookInfoType[] = [];
  const [searchData, setSearchData] = useState(initial);

  const SearchResultState = useSelector((state: { Search: BookInfoType[] }) => state.Search);

  useEffect(() => {
    // console.log(SearchResultState)
    setSearchData(SearchResultState);
  }, [SearchResultState]);


  return (
    <Grid container alignItems="center" justifyContent="center">
      <h1>書籍一覧</h1>
      <SearchForm />

      <button onClick={() => console.log(SearchResultState)}>取得したデータ確認</button>

      <ul>
        {searchData.length === 0 &&
          <p>検索結果はありません。キーワードを変えてもう一度お試しください。</p>
        }
        {searchData.map((element: any, index: any) => {
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
    </Grid>
  )
}

export default Home