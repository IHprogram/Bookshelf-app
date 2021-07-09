import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function SearchForm() {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <TextField variant='outlined' />
      <Button>
        <SearchIcon />
      </Button>
    </Grid>
  )
}

export default SearchForm
