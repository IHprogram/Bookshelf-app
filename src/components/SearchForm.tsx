import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fetchBooksInfo } from '../actions/index';
import { useDispatch } from 'react-redux';

function SearchForm() {
  const [searchWord, setSearchWord] = useState<string>('');
  const dispatch = useDispatch();

  const inputSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  }

  const submit = () => {
    if (searchWord !== null) {
      dispatch(fetchBooksInfo(searchWord));
    }
    setSearchWord('');
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <TextField variant='outlined' onChange={inputSearchWord} />
      <Button onClick={submit}>
        <SearchIcon />
      </Button>
    </Grid>
  )
}

export default SearchForm
