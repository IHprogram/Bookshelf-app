import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login.tsx'
import Register from '../components/Register.tsx'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index.tsx';
import { MemoryRouter } from 'react-router-dom';
import { setUserInfo, logoutUser } from '../actions';
import { createMemoryHistory } from 'history';
import { Router } from "react-router";

const store = createStore(reducer, applyMiddleware(thunk));

describe('ユーザー登録に関するテスト', () => {
  test('ユーザー登録画面の各フォームの値を取り出せていることをテスト', () => {
    render(<Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>);
    const nameInput = screen.getByLabelText('name').querySelector("input");
    const emailInput = screen.getByLabelText('email').querySelector("input");
    const passwordInput = screen.getByLabelText('password').querySelector("input");

    // fireEvent関数で各フォームに値を入力
    fireEvent.change(nameInput, { target: { value: 'テスト名' } });
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'a12345' } });

    // フォームの値が一致していることを検証
    expect(nameInput.value).toEqual('テスト名');
    expect(emailInput.value).toEqual('test@test.com');
    expect(passwordInput.value).toEqual('a12345');
  })
})

describe('パスに関するテスト', () => {
  test('ログイン画面のパスをテスト', () => {
    const history = createMemoryHistory();
    history.push('/login')
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Router history={history}>
            <Login />
          </Router>
        </MemoryRouter>
      </Provider>
    )
    expect(history.location.pathname).toBe("/login");
  })

  test('ユーザー登録画面のパスをテスト', () => {
    const history = createMemoryHistory();
    history.push('/register')
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Router history={history}>
            <Register />
          </Router>
        </MemoryRouter>
      </Provider>
    )
    expect(history.location.pathname).toBe("/register");
  })
})

describe('テキストが表示されているかの確認', () => {
  describe('ログイン画面のテキスト確認', () => {
    test('ログイン画面のタイトル確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('ログイン')).toBeInTheDocument();
    })

    test('ログインボタンのテキスト確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('ログインする')).toBeInTheDocument();
    })

    test('新規登録画面へのリンクボタンのテキスト確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('登録していない方はこちらから')).toBeInTheDocument();
    })

    test('メールアドレスのラベル確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('メールアドレス')).toBeInTheDocument();
    })

    test('パスワードのラベル確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('パスワード')).toBeInTheDocument();
    })
  })

  describe('新規登録画面のテキスト確認', () => {
    test('新規登録画面のタイトル確認', () => {
      render(<Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>);
      expect(screen.getByText('新規登録')).toBeInTheDocument();
    })

    test('新規登録ボタンのテキスト確認', () => {
      render(<Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>);
      expect(screen.getByText('登録する')).toBeInTheDocument();
    })

    test('名前のラベル確認', () => {
      render(<Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>);
      expect(screen.getByText('名前')).toBeInTheDocument();
    })

    test('メールアドレスのラベル確認', () => {
      render(<Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>);
      expect(screen.getByText('メールアドレス')).toBeInTheDocument();
    })

    test('パスワードのラベル確認', () => {
      render(<Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>);
      expect(screen.getByText('パスワード')).toBeInTheDocument();
    })
  })
})

describe('Actions', () => {
  test('ActionCreatorのsetUserInfoをテスト', () => {
    const name = "名前";
    const email = 'email@email.com';
    const result = setUserInfo(name, email);
    const login_user = true;
    const expected = {
      type: 'SET_USER_INFO',
      name: name,
      email: email,
      login_user: login_user
    }
    expect(result).toEqual(expected);
  })

  test('ActionCreatorのlogoutUserをテスト', () => {
    const result = logoutUser();
    const expected = {
      type: 'LOGOUT_USER'
    }
    expect(result).toEqual(expected);
  })
})

describe('Reducers', () => {
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
    }
    expect(result).toEqual(expected)
  })
})