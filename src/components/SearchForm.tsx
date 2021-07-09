import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function SearchForm() {
  return (
    <div>
      <div>検索フォームがここに入る</div>
      <TextField variant='outlined' />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  )
}

export default SearchForm
