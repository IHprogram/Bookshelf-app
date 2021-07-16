import {
  useLocation
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { deleteNote } from '../actions/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

  return (
    <div>
      <p>ノートの詳細です</p>
      <Card>
        <CardContent>
          <Typography>
            読む目的: {notesInfo.purpose}
          </Typography>
          <Typography>
            この本のポイント: {notesInfo.point}
          </Typography>
          <Typography>
            説明: {notesInfo.explain}
          </Typography>
          <Typography>
            感想: {notesInfo.impression}
          </Typography>
          <Button variant="outlined" color="secondary" onClick={deleteButton}>削除</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoteDetail
