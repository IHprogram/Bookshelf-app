import { render, screen } from '@testing-library/react';
import Header from '../components/Header'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index.tsx';
import { MemoryRouter } from 'react-router-dom';

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