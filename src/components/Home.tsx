import React, { useState, useEffect } from 'react'
import SearchForm from './SearchForm';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

interface BookInfoType {
  title: string,
  author: string,
  image: string,
  price: number,
  caption: string,
  itemUrl: string
}

const useStyles = makeStyles((theme) => ({
  booksWrapper: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "900px"
  },
  list: {
    listStyle: 'none',
    margin: '0 auto 30px',
  },
  card: {
    width: "250px",
    height: "350px",
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
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
  }
}));

function Home() {
  const initial: BookInfoType[] = [];
  const [searchData, setSearchData] = useState(initial);

  const SearchResultState = useSelector((state: { Search: BookInfoType[] }) => state.Search);

  useEffect(() => {
    setSearchData(SearchResultState);
  }, [SearchResultState]);

  const classes = useStyles();

  return (
    <Grid container alignItems="center" justifyContent="center">
      <h1>- 書籍一覧 -</h1>
      <SearchForm />

      <ul className={classes.booksWrapper}>
        {searchData.length === 0 &&
          <p>検索結果はありません。キーワードを変えてもう一度お試しください。</p>
        }
        {searchData.map((element: any, index: any) => {
          return (
            <li key={index} className={classes.list}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.bookImageWrapper}>
                    <img src={element.image} />
                  </div>
                  <Grid container alignItems="center" justifyContent="center">
                    <Link to={{
                      pathname: `/detail/${index + 1}`,
                      state: { searchdata: element }
                    }}
                      className={classes.bookLink} >
                      {element.title}
                    </Link>
                  </Grid>
                  <Grid container alignItems="center" justifyContent="center">
                    <div>
                      {element.author}
                    </div>
                  </Grid>
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