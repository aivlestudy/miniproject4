import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// 표지가 없을 때 쓸 책 색 (제목 글자로 골라서 책마다 항상 같은 색)
const COLORS = ['#1b2a4a', '#3d5a99', '#c46a4a', '#2f6f6a', '#7a6aa8', '#c08a2e', '#4a5568', '#a34a5e']

function pickColor(title = '') {
  let sum = 0
  for (const char of title) sum += char.charCodeAt(0)
  return COLORS[sum % COLORS.length]
}

// 책 앞면 (AI 표지가 있으면 이미지, 없으면 제목으로 기본 표지)
function BookCover({ book, width = 120 }) {
  const height = width * 1.5 // 2:3 책 비율 (AI 표지 1024x1536과 같음)
  return <Box sx={{
    width, height, flexShrink: 0, overflow: 'hidden',
    borderRadius: '2px 6px 6px 2px',
    boxShadow: 'inset 4px 0 0 rgba(0,0,0,.15), 2px 4px 12px rgba(27,42,74,.25)',
    bgcolor: pickColor(book.title),
  }}>
    {book.coverImageUrl
      ? <Box component="img" src={book.coverImageUrl} alt={book.title + ' 표지'} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      : <Box sx={{ height: '100%', p: width / 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
        <Typography sx={{ fontFamily: '"Gowun Batang", serif', fontWeight: 700, fontSize: width / 8, lineHeight: 1.3, wordBreak: 'keep-all' }}>
          {book.title || '제목 없음'}
        </Typography>
        <Typography sx={{ fontSize: width / 12, opacity: 0.85 }}>{book.author}</Typography>
      </Box>}
  </Box>
}

export default BookCover
