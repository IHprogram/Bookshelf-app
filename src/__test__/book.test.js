import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import Mypage from '../components/Mypage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index.tsx';
import { MemoryRouter } from 'react-router-dom';
import { setSearchResult, setMyBooks, createBook, deleteOneBook } from '../actions/index.tsx'

const store = createStore(reducer, applyMiddleware(thunk));
const middlewares = [thunk];

const thunk2 =
  ({ dispatch, getState }) =>
    next =>
      action => {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }
        return next(action)
      }

const create = () => {
  const store2 = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()
  const invoke = action => thunk2(store2)(next)(action)
  return { store2, next, invoke }
}


describe('ヘッダーのテキストの確認！', () => {

  test('ヘッダーロゴ「Bookshelf App」が表示されていることを確認', () => {
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('Bookshelf App');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログアウト時に、ログイン画面へのリンクボタンが表示されているか確認', () => {
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('ログイン');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログアウト時に、新規画面へのリンクボタンが表示されているか確認', () => {
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('新規登録');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログイン時に、ツイート投稿画面へのリンクボタンが表示されているか確認', () => {
    const loginUser = true;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('マイページ');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログイン時に、ログアウトボタンが表示されているか確認', () => {
    const loginUser = true;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('ログアウト');
    expect(linkElement).toBeInTheDocument();
  })
})

describe('マイページのテキスト確認', () => {
  test('「タイトル」が表示されていることを確認', () => {
    const loginUser = true;
    render(<Provider store={store}><MemoryRouter><Mypage loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('登録した本');
    expect(linkElement).toBeInTheDocument();
  })
})

describe('Actions', () => {
  test('ActionCreatorのsearchBooksをテスト', () => {
    const searchBooks = [
      {
        title: '書籍タイトル',
        author: '著者名',
        image: 'https://www.tsuzukiblog.org/_wu/2020/03/shutterstock_1005938026.jpg',
        price: 1000,
        caption: '書籍の説明',
        itemUrl: 'https://www.google.com/?hl=ja',
      }
    ];

    const result = setSearchResult(searchBooks);

    const expected = {
      type: 'SET_SEARCH_RESULT',
      result: searchBooks
    }
    expect(result).toEqual(expected);
  })

  test('ActionCreatorのsetMyBooksをテスト', () => {
    const myBooks = {
      _id: 'id',
      title: '書籍タイトル',
      loginUserId: 'loginUserId123',
      itemUrl: 'https://www.google.com/?hl=ja',
      image: 'https://www.tsuzukiblog.org/_wu/2020/03/shutterstock_1005938026.jpg',
      caption: '書籍の説明',
      author: '著者名',
    };
    const result = setMyBooks(myBooks);
    const expected = {
      type: 'SET_MY_BOOKS',
      myBooks: myBooks
    };
    expect(result).toEqual(expected);
  })

  test('ActionCreatorのcreateBookをテスト', () => {
    const bookInfo = {
      title: '書籍タイトル',
      itemUrl: 'https://www.google.com/?hl=ja',
      image: 'https://www.tsuzukiblog.org/_wu/2020/03/shutterstock_1005938026.jpg',
      caption: '書籍の説明',
      author: '著者名',
    };
    const loginUserId = 'loginUserId123';
    const bookId = 'bookId123';
    const result = createBook(bookInfo, loginUserId, bookId);
    const expected = {
      type: 'CREATE_BOOK',
      bookInfo,
      loginUserId,
      bookId
    };
    expect(result).toEqual(expected)
  })

  test('ActionCreatorのdeleteOneBookをテスト', () => {
    const id = 'id123';
    const result = deleteOneBook(id);
    const expected = {
      type: 'DELETE_ONE_BOOK',
      id
    };
    expect(result).toEqual(expected)
  })
})

describe('Reducer', () => {
  test('初期値の確認', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
      User: {
        name: '',
        email: '',
        login_user: false
      },
      Book: {
        bookArray: [],
        userId: ''
      },
      Note: [],
      Search: []
    };
    expect(result).toEqual(expected)
  })
})