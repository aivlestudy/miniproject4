import Box from '@mui/material/Box'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import BookCover from './BookCover'
import RatingStars from './RatingStars'
import CategoryChip from './CategoryChip'
import formatDate from '../utils/formatDate'

// 목록의 도서 카드 1개
function BookItem({ book, onSelect }) {
  return <CardActionArea onClick={() => onSelect(book.id)} sx={{ borderRadius: '4px', alignSelf: 'start' }}>
    <BookCover book={book} />
    <Box sx={{ pt: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CategoryChip category={book.category} />
        <RatingStars rating={book.rating} />
      </Box>
      <Typography variant="subtitle2" component="strong" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.title}</Typography>
      <Typography variant="body2" color="text.secondary">{book.author && '저자: ' + book.author}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.content}</Typography>
      <Typography variant="caption" color="text.secondary">등록일 {formatDate(book.createdAt)}</Typography>
    </Box>
  </CardActionArea>
}

export default BookItem
