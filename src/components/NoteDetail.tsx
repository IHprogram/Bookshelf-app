import {
  useLocation,
  Link
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { deleteNote } from '../actions/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface NoteType {
  noteId: string,
  purpose: string,
  point: string,
  explain: string,
  impression: string,
  bookId: string,
  loginUserId: string,
}

interface StateType {
  notesInfo: NoteType
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: "80%",
    margin: "60px auto"
  },
  editLink: {
    textDecoration: 'none',
    color: 'orange'
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px"
  },
  noteContent: {
    marginTop: "10px"
  },
  noteColumn: {
    fontWeight: "bold"
  }
}));

function NoteDetail() {
  const location = useLocation();
  const state = location.state as StateType;
  const notesInfo: NoteType = state.notesInfo;

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteButton = () => {
    dispatch(deleteNote(notesInfo.noteId));
    history.push('/mypage');
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.noteContent}>
            <span className={classes.noteColumn}>読む目的</span>: {notesInfo.purpose}
          </Typography>
          <Typography className={classes.noteContent}>
            <span className={classes.noteColumn}>この本のポイント</span>: {notesInfo.point}
          </Typography>
          <Typography className={classes.noteContent}>
            <span className={classes.noteColumn}>説明</span>: {notesInfo.explain}
          </Typography>
          <Typography className={classes.noteContent}>
            <span className={classes.noteColumn}>感想</span>: {notesInfo.impression}
          </Typography>
          <div className={classes.buttonWrapper}>
            <Link to={{
              pathname: `/noteeditform`,
              state: { noteId: notesInfo.noteId }
            }}
              className={classes.editLink}
            >
              編集する
            </Link>
            <Button variant="outlined" color="secondary" onClick={deleteButton}>削除</Button>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default NoteDetail
