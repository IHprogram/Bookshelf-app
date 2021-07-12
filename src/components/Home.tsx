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


function Home() {
  const initial: [] = [];
  const [searchData, setSearchData] = useState(initial);

  useEffect(() => {
    axios.get("https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?", {
      params: {
        applicationId: "1019108687944298363", //楽天でログインし、自分のアプリケーションIDを取得
        title: '卓球', //後で変数にし、検索フォームのキーワードで検索できるようにする(現在はダミー)
      },
    }).then(res => {
      console.log(res)
      setSearchData(res.data.Items);
    });
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <h1>書籍一覧</h1>
      <SearchForm />

      <div>検索結果がここに表示される</div>
      <button onClick={() => console.log(searchData)}>取得したデータ確認</button>

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
                    <img src={element.Item.largeImageUrl} />
                  </Typography>
                  <Typography>
                    <Link to={{
                      pathname: `/detail/${index + 1}`,
                      state: { searchdata: element }
                    }}
                    >
                      {element.Item.title}
                    </Link>
                  </Typography>
                  <Typography>
                    {element.Item.author}
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