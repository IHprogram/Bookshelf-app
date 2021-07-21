import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import Home from '../components/Home';
import Detail from '../components/Detail';
import Mypage from '../components/Mypage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index.tsx';
import { MemoryRouter } from 'react-router-dom';
import { setSearchResult, setMyBooks, createBook, deleteOneBook, getMyBooks } from '../actions/index.tsx'
import { createMemoryHistory } from 'history';
import { Router } from "react-router";

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

describe('パスに関するテスト', () => {
  test('トップページのパスをテスト', () => {
    const history = createMemoryHistory();
    history.push('/')
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Router history={history}>
            <Home />
          </Router>
        </MemoryRouter>
      </Provider>
    )
    expect(history.location.pathname).toBe("/");
  })
})

describe('非同期ActionCreatorに関するテスト', () => {
  test('getMyBooksの確認', () => {
    const { next, invoke } = create();
    const action = { type: 'SET_MY_BOOKS' };
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  test('addTweetの確認', () => {
    const { next, invoke } = create();
    const action = { type: 'CREATE_BOOK' };
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  test('deleteTweetの確認', () => {
    const { next, invoke } = create();
    const action = { type: 'DELETE_ONE_BOOK' };
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  test('関数の呼び出しを確認', () => {
    const { invoke } = create()
    const fn = jest.fn();
    invoke(fn)
    expect(fn).toHaveBeenCalled()
  })

  test('dispatchとgetStateを返すことを確認', () => {
    const { store2, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch('SET_MY_BOOKS');
      getState();
    })
    expect(store2.dispatch).toHaveBeenCalledWith('SET_MY_BOOKS')
    expect(store2.getState).toHaveBeenCalled()
  })
})

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