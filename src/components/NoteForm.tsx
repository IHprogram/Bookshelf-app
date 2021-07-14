import React, { useState } from 'react'
import {
  useLocation
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { createNote } from '../actions/index';
import { useHistory } from 'react-router-dom';

interface bookIdType {
  bookId: string
}

interface Props {
  loginUserId: string
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  formGroup: {
    marginTop: '10px'
  }
}));

function NoteForm({ loginUserId }: Props) {
  const location = useLocation();
  const state = location.state as bookIdType;
  const bookId: string = state.bookId;
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const [purpose, setPurpose] = useState<string>(''),
    [point, setPoint] = useState<string>(''),
    [explain, setExplain] = useState<string>(''),
    [impression, setImpression] = useState<string>('');

  const inputPurpose = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPurpose(e.target.value);
  }

  const inputPoint = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPoint(e.target.value);
  }

  const inputExplain = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setExplain(e.target.value);
  }

  const inputImpression = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setImpression(e.target.value);
  }

  const submit = () => {
    dispatch(createNote(purpose, point, explain, impression, bookId, loginUserId));
    history.push('/mypage')
  }

  return (
    <div>
      <h2>ノート作成画面</h2>
      <Button onClick={() => console.log(bookId)}>確認</Button>

      <form className={classes.form} noValidate>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="purpose"
              label="読む目的"
              name="purpose"
              autoComplete="purpose"
              onChange={inputPurpose}
            />
          </Grid>
          <Grid item xs={8} className={classes.formGroup}>
            <TextField
              variant="standard"
              required
              fullWidth
              id="point"
              label="ポイント"
              name="point"
              autoComplete="point"
              onChange={inputPoint}
            />
          </Grid>
          <Grid item xs={8} className={classes.formGroup}>
            <TextField
              variant="standard"
              required
              fullWidth
              multiline={true}
              rows={3}
              name="explain"
              label="説明"
              type="explain"
              id="explain"
              autoComplete="explain"
              onChange={inputExplain}
            />
          </Grid>
          <Grid item xs={8} className={classes.formGroup}>
            <TextField
              variant="standard"
              required
              fullWidth
              multiline={true}
              rows={3}
              name="impression"
              label="感想"
              type="impression"
              id="impression"
              autoComplete="impression"
              onChange={inputImpression}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent='center' spacing={2} className={classes.formGroup}>
          <Grid item xs={4}>
            <Button
              type="button"
              variant="contained"
              fullWidth
              color="primary"
              onClick={submit}
            >
              ノートを作成する
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default NoteForm
