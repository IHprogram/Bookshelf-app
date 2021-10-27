import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { registerBook } from '../actions/index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface LocationContent {
  title: string,
  author: string,
  image: string,
  price: number,
  caption: string | null,
  itemUrl: string
}

interface LocationState {
  searchdata: LocationContent
}

interface Props {
  loginUser: boolean,
  loginUserId: string
}

interface newBookType {
  title: string,
  author: string,
  image: string,
  caption: string | null,
  itemUrl: string
}

const useStyles = makeStyles((theme) => ({
  bookWrapper: {
    margin: "60px auto",
    display: "flex",
    width: "80%"
  },
  bookImage: {
    width: "300px",
  },
  tableWrapper: {
    width: "300px",
  },
  tableBorder: {
    style: "border-collapse: collapse",
    border: "1"
  }
}));

function Detail({ loginUser, loginUserId }: Props) {
  const location = useLocation();
  const state = location.state as LocationState;
  const title: string = state.searchdata.title;
  const author: string = state.searchdata.author;
  const image: string = state.searchdata.image;
  const price: number = state.searchdata.price;
  const caption: string | null = state.searchdata.caption;
  const itemUrl: string = state.searchdata.itemUrl;

  const dispatch = useDispatch();

  const register = () => {
    const newBook: newBookType = {
      title,
      author,
      image,
      caption,
      itemUrl,
    };
    dispatch(registerBook(newBook, loginUserId));
    alert('本を登録しました！\nマイページから確認できます。')
  }

  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.bookWrapper}>
      <Grid item xs={4}>
        <img src={image} className={classes.bookImage} />
      </Grid>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              <TableRow>
                <TableCell align="center">タイトル</TableCell>
                <TableCell align="left">{title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">著者</TableCell>
                <TableCell align="left">{author}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">商品価格</TableCell>
                <TableCell align="left">{price}円</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">商品説明</TableCell>
                <TableCell align="left">{caption}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">商品URL</TableCell>
                <TableCell align="left"><a href={itemUrl} target='_blank'>この本のURLはこちら</a></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {loginUser === true &&
          <Button color="primary" onClick={register}>登録</Button>
        }
      </Grid>
    </Grid>
  )
};

export default Detail
