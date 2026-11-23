import Box from '@mui/material/Box'

// 별점 표시 (리디처럼 빨간 별 하나 + 점수, 예: 4 → ★ 4.0)
function RatingStars({ rating }) {
  if (!rating) return null
  return <Box component="span" aria-label={'별점 ' + rating + '점'} sx={{ color: '#DC3232', fontSize: 13, fontWeight: 700 }}>★ {Number(rating).toFixed(1)}</Box>
}

export default RatingStars
