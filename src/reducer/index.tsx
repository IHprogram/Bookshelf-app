import { combineReducers } from 'redux';
import User from './user';
import Search from './search';
import Book from './book';
import Note from './note';

export default combineReducers({ User, Search, Book, Note });