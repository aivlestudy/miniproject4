import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenBook from './OpenBook'
import BookCover from './BookCover'
import formatDate from '../utils/formatDate'

const QUALITIES = [
  { value: 'low', label: '낮음 (빠름)' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음 (느림)' },
]

// 도서 상세 화면: 펼친 책 (왼쪽: 표지 + AI 표지 생성 / 오른쪽: 정보 + 수정/삭제)
function BookDetail({ book, onEdit, onDelete, onGenerateCover, coverBusy, generating }) {
  const [quality, setQuality] = useState('medium')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const left = <>
    <BookCover book={book} width={220} />
    <TextField select size="small" label="표지 품질" value={quality} onChange={(event) => setQuality(event.target.value)} disabled={coverBusy} sx={{ width: 220 }}>
      {QUALITIES.map((item) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
    </TextField>
    <Button
      variant="contained" color="secondary" sx={{ width: 220 }}
      startIcon={generating ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeIcon />}
      onClick={() => onGenerateCover(quality)} disabled={coverBusy}
    >
      {generating ? '표지 그리는 중...' : book.coverImageUrl ? 'AI 표지 다시 만들기' : 'AI 표지 만들기'}
    </Button>
    <Typography variant="caption" color="text.secondary">생성할 때마다 OpenAI 사용 요금이 듭니다.</Typography>
  </>

  const right = <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Typography variant="h4" component="h1">{book.title}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
      {book.author && <Typography color="text.secondary">{book.author}</Typography>}
      {book.category && <Chip label={book.category} size="small" color="primary" variant="outlined" />}
      {book.rating ? <Rating value={book.rating} readOnly sx={{ color: 'secondary.main', '& .MuiRating-iconEmpty': { color: '#d6d3cc' } }} /> : null}
    </Box>
    <Divider sx={{ my: 2 }} />
    <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', lineHeight: 1.8, flex: 1 }}>{book.content}</Typography>
    <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
      등록 {formatDate(book.createdAt)} · 수정 {formatDate(book.updatedAt)}
    </Typography>
    <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
      <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit} disabled={generating}>수정</Button>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setConfirmOpen(true)} disabled={generating}>삭제</Button>
    </Box>
  </Box>

  return <>
    <OpenBook left={left} right={right} />
    <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
      <DialogTitle>도서를 삭제할까요?</DialogTitle>
      <DialogContent>
        <DialogContentText>「{book.title}」을(를) 서가에서 삭제합니다. 되돌릴 수 없어요.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmOpen(false)}>취소</Button>
        <Button color="error" variant="contained" onClick={() => { setConfirmOpen(false); onDelete() }}>삭제</Button>
      </DialogActions>
    </Dialog>
  </>
}

export default BookDetail
