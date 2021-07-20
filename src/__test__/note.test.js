import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import Mypage from '../components/Mypage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index.tsx';
import { MemoryRouter } from 'react-router-dom';


const store = createStore(reducer, applyMiddleware(thunk));
const middlewares = [thunk];

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