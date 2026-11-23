import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CATEGORY_COLORS } from '../utils/categories'

const WEEK = 7 * 24 * 60 * 60 * 1000
const NOW = Date.now() // 앱을 연 시점 기준으로 NEW 판단

// 표지 이미지 (없으면 카테고리 색 바탕에 제목/저자 표시, 일주일 안에 등록한 책은 NEW 배지)
function BookCover({ book }) {
  const isNew = NOW - new Date(book.createdAt) < WEEK
  const coverColor = CATEGORY_COLORS[book.category]?.cover || '#F5F5F5'
  return <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2 / 3', borderRadius: '4px', overflow: 'hidden', bgcolor: coverColor, outline: '1px solid rgba(0,0,0,0.04)', outlineOffset: '-1px' }}>
    {book.coverImageUrl
      ? <Box component="img" src={book.coverImageUrl} alt={book.title + ' 표지'} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      : <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, pb: 4 }}>
        <Typography variant="subtitle2" component="span" sx={{ wordBreak: 'keep-all' }}>{book.title}</Typography>
        <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.55)' }}>{book.author}</Typography>
      </Box>}
    {isNew && <Box component="span" sx={{ position: 'absolute', left: 0, bottom: 0, minWidth: 23, height: 23, px: 0.75, display: 'flex', alignItems: 'center', bgcolor: '#1ECDCD', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: '0 4px 0 0' }}>NEW</Box>}
  </Box>
}

export default BookCover
