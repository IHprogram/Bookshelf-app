import { render, screen } from '@testing-library/react';
import Mypage from '../components/Mypage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index.tsx';
import { MemoryRouter } from 'react-router-dom';

const store = createStore(reducer, applyMiddleware(thunk));
const middlewares = [thunk];

describe('テキストが表示されているかの確認', () => {
  describe('マイページのテキスト確認', () => {
    test('マイページのタイトル確認', () => {
      render(<Provider store={store}><MemoryRouter><Mypage /></MemoryRouter></Provider>);
      expect(screen.getByText('登録した本')).toBeInTheDocument();
    })

    test('ユーザーが書籍を登録してしない場合「登録した本はありません」と表示されることを確認', () => {
      render(<Provider store={store}><MemoryRouter><Mypage /></MemoryRouter></Provider>);
      expect(screen.getByText('登録した本はありません。')).toBeInTheDocument();
    })
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