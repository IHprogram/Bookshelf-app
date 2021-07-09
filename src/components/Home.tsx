import React from 'react'
import SearchForm from './SearchForm';
import Grid from '@material-ui/core/Grid';

function Home() {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <h1>書籍一覧</h1>
      <SearchForm />

      <div>検索結果がここに表示される</div>
    </Grid>
  )
}

export default Home