import {
  useLocation
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

  return (
    <div>
      <p>ノートの詳細です</p>
      <Card>
        <CardContent>
          <Typography>
            読む目的: {notesInfo.purpose}
          </Typography>
          <Typography>
            この本のポイント: {notesInfo.purpose}
          </Typography>
          <Typography>
            説明: {notesInfo.explain}
          </Typography>
          <Typography>
            感想: {notesInfo.impression}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoteDetail
