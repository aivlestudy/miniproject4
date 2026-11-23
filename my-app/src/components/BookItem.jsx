import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import BookCover from './BookCover'

// 서가에 꽂힌 책 1권 (누르면 상세)
// 높이 구조는 BookList 선반과 맞춤: 위 여백 24 + 책 180 + 선반 16 + 이름표 44 = 264
function BookItem({ book, onSelect }) {
  return <ButtonBase
    onClick={() => onSelect(book.id)}
    aria-label={book.title + ' 상세 보기'}
    sx={{
      width: 124, height: 264, pt: '24px', flexDirection: 'column', justifyContent: 'flex-start',
      '& .cover': { transition: 'transform .2s' },
      '&:hover .cover, &:focus-visible .cover': { transform: 'translateY(-10px)' },
    }}
  >
    <Box className="cover"><BookCover book={book} width={120} /></Box>
    <Box sx={{ mt: '16px', width: 120, height: 44, textAlign: 'center', pt: 0.25 }}>
      <Typography noWrap sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.4 }}>{book.title}</Typography>
      {/* 별점 강조: 크게 + 호박색 + 빈 별은 연하게 */}
      {book.rating ? <Rating
        value={book.rating} readOnly
        sx={{ fontSize: 19, color: 'secondary.main', '& .MuiRating-iconEmpty': { color: '#d6d3cc' }, filter: 'drop-shadow(0 1px 1px rgba(232,163,61,.35))' }}
      /> : null}
    </Box>
  </ButtonBase>
}

export default BookItem
