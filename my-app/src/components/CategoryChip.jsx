import Box from '@mui/material/Box'
import { CATEGORY_COLORS } from '../utils/categories'

// 카테고리 라벨 (카테고리마다 색이 다름, 없는 카테고리는 회색)
function CategoryChip({ category }) {
  if (!category) return null
  const color = CATEGORY_COLORS[category] || { bg: '#F0F0F0', text: '#555555' }
  return <Box component="span" sx={{ fontSize: 11, fontWeight: 700, px: 0.75, py: 0.25, borderRadius: '2px', bgcolor: color.bg, color: color.text }}>{category}</Box>
}

export default CategoryChip
