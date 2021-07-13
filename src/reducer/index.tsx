import { combineReducers } from 'redux';
import User from './user';
import Search from './search';
import Book from './book'

export default combineReducers({ User, Search, Book });