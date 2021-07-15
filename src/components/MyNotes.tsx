import React, { useState, useEffect } from 'react'
import {
  useLocation
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes } from '../actions/index';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  }
}));

interface bookIdType {
  bookId: string
}

interface NoteType {
  noteId: string,
  purpose: string,
  point: string,
  explain: string,
  impression: string,
  bookId: string,
  loginUserId: string,
}

function MyNotes() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const state = location.state as bookIdType;
  const bookId: string = state.bookId;
  const classes = useStyles();

  const notesState = useSelector((state: { Note: NoteType[] }) => state.Note);

  const initialState: NoteType[] = []
  const [notes, setNotes] = useState(initialState);

  useEffect(() => {
    dispatch(getNotes(bookId));
  }, [])

  useEffect(() => {
    setNotes(notesState);
  }, [notesState]);

  return (
    <div>
      <h3>ノート一覧</h3>
      {notes.length === 0 &&
        <p>登録した本はありません。</p>
      }
      {notes.map((element: any, index: any) => {
        return (
          <li key={index}>
            <Card>
              <CardContent>
                <Typography>
                  読む目的: {element.purpose}
                </Typography>
                <Typography>
                  この本のポイント: {element.purpose}
                </Typography>
                <Typography>
                  説明: {element.explain}
                </Typography>
                <Typography>
                  感想: {element.impression}
                </Typography>
              </CardContent>
            </Card>
          </li>
        )
      })}
    </div>
  )
}

export default MyNotes
