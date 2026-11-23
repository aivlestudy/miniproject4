import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import BookCover from './BookCover'
import RatingStars from './RatingStars'
import CategoryChip from './CategoryChip'
import formatDate from '../utils/formatDate'

// 도서 상세 화면 (수정/삭제 + AI 표지 생성 영역)
function BookDetail({ book, onEdit, onDelete, onBack, onGenerateCover, coverBusy, generating }) {
  return <Box component="section">
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, pb: 2, mb: 4, borderBottom: '1px solid #F0F0F0' }}>
      <Typography variant="h5" component="h1">{book.title}</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" color="inherit" onClick={onEdit} disabled={generating} sx={{ borderColor: '#E6E6E6' }}>수정</Button>
        <Button variant="outlined" color="error" onClick={onDelete} disabled={generating}>삭제</Button>
      </Box>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '240px 1fr' }, gap: 5 }}>
      <Box sx={{ width: '100%', maxWidth: 240 }}>
        <BookCover book={book} />
      </Box>
      <Box>
        <Box sx={{ p: 2.5, border: '1px solid #E6E6E6', borderRadius: '4px', bgcolor: '#FAFAFA' }}>
          <Typography variant="subtitle1" component="h2">AI 표지 생성</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>도서 내용에 어울리는 표지를 만들어 보세요.</Typography>
          <Box component="form" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }} onSubmit={(event) => {
            event.preventDefault()
            onGenerateCover(new FormData(event.currentTarget).get('quality'))
          }}>
            <TextField id="quality" select size="small" label="이미지 품질" name="quality" defaultValue="medium" disabled={coverBusy} sx={{ minWidth: 140, bgcolor: '#fff' }}>
              <MenuItem value="low">LOW</MenuItem>
              <MenuItem value="medium">MEDIUM</MenuItem>
              <MenuItem value="high">HIGH</MenuItem>
            </TextField>
            <Button type="submit" variant="outlined" color="inherit" disabled={coverBusy} sx={{ borderColor: '#E6E6E6', bgcolor: '#fff' }}>
              {generating ? '생성 중…' : 'AI 표지 생성'}
            </Button>
          </Box>
        </Box>
        <Box sx={{ py: 3, borderBottom: '1px solid #F0F0F0' }}>
          <Typography variant="subtitle1" component="h2">책 내용</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
            <CategoryChip category={book.category} />
            <RatingStars rating={book.rating} />
          </Box>
          {book.author && <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>저자: {book.author}</Typography>}
          <Typography sx={{ mt: 1.5, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{book.content}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, py: 2 }}>
          <Typography variant="caption" color="text.secondary">생성일: {formatDate(book.createdAt)}</Typography>
          <Typography variant="caption" color="text.secondary">수정일: {formatDate(book.updatedAt)}</Typography>
        </Box>
      </Box>
    </Box>
    <Box sx={{ borderTop: '1px solid #F0F0F0', mt: 4, pt: 2.5, textAlign: 'center' }}>
      <Button variant="outlined" color="inherit" onClick={onBack} sx={{ borderColor: '#E6E6E6' }}>도서 목록으로 돌아가기</Button>
    </Box>
  </Box>
}

export default BookDetail
