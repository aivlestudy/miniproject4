import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import BookCover from './BookCover'
import formatDate from '../utils/formatDate'

// 서가에 꽂힌 책 1권 (누르면 상세)
// 높이 구조는 BookList 선반과 맞춤: 위 여백 24(pt: 3) + 책 180 + 선반 16(mt: 2) + 이름표 60 = 280
function BookItem({ book, onSelect }) {
  return <ButtonBase
    onClick={() => onSelect(book.id)}
    aria-label={book.title + ' 상세 보기'}
    sx={{
      width: 124, height: 280, pt: 3, flexDirection: 'column', justifyContent: 'flex-start',
      '& .cover': { transition: 'transform .2s' },
      '&:hover .cover, &:focus-visible .cover': { transform: 'translateY(-10px)' },
    }}
  >
    <Box className="cover"><BookCover book={book} width={120} /></Box>
    <Box sx={{ mt: 2, width: 120, height: 60, textAlign: 'center', pt: 0.25 }}>
      <Typography noWrap sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4 }}>{book.title}</Typography>
      {/* 별점 강조: 크게 + 호박색 + 빈 별은 연하게 */}
      {book.rating ? <Rating
        value={book.rating} readOnly
        sx={{ fontSize: 19, color: 'secondary.main', '& .MuiRating-iconEmpty': { color: '#d6d3cc' }, filter: 'drop-shadow(0 1px 1px rgba(232,163,61,.35))' }}
      /> : null}
      {/* 등록일 */}
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4 }}>{formatDate(book.createdAt)}</Typography>
    </Box>
  </ButtonBase>
}

export default BookItem
