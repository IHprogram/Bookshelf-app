import React, { useState, useEffect } from 'react'
import {
  useLocation,
  Link
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes } from '../actions/index';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: 'none',
  }
}));

interface bookIdType {
  bookId: string,
  title: string
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
  console.log(state)
  const bookId: string = state.bookId;
  const title: string = state.title;

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
      <h3>「{title}」のノート一覧</h3>
      {notes.length === 0 &&
        <p>作成したノートはありません。</p>
      }
      {notes.map((element: NoteType, index: number) => {
        return (
          <li key={index} className={classes.list}>
            <Card>
              <CardContent>
                <Typography>
                  <Link to={{
                    pathname: `/notedetail/:id`,
                    state: { notesInfo: element }
                  }}
                  >
                    読む目的: {element.purpose}
                  </Link>
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
