import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { registerBook } from '../actions/index';
import { StringLiteralType } from 'typescript';

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
    const newBook = {
      title,
      author,
      image,
      caption,
      itemUrl,
    };
    dispatch(registerBook(newBook, loginUserId))
  }

  return (
    <div>
      <ul>
        <li><img src={image} /></li>
        <li>{title}</li>
        <li>著者：{author}</li>
        <li>商品価格：{price}円</li>
        <li>商品説明：{caption}</li>
        <li><a href={itemUrl} target='_blank'>この本のURLはこちら</a></li>
        {loginUser === true &&
          <li>
            <Button color="primary" onClick={register}>登録</Button>
          </li>
        }
      </ul>
    </div>
  )
};

export default Detail
