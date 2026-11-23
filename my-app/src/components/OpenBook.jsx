import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

// 펼친 책 틀 (왼쪽 페이지 + 오른쪽 페이지) — 상세, 등록/수정 화면에서 같이 사용
function OpenBook({ left, right }) {
  return <Paper elevation={6} sx={{
    display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
    maxWidth: 1000, mx: 'auto', overflow: 'hidden', bgcolor: 'background.paper',
    borderRadius: 2,
  }}>
    <Box sx={{
      flex: { sm: '0 0 300px', md: '0 0 38%' }, p: { xs: 3, md: 4 }, // 표지(220px)가 들어갈 최소 너비
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      // 가운데 접히는 부분 그림자
      background: { sm: 'linear-gradient(90deg, #ffffff 82%, #efeee9)' },
      // 모바일은 아래쪽, 넓은 화면은 오른쪽에 구분선 (두께: 위 오른쪽 아래 왼쪽)
      borderStyle: 'solid', borderColor: 'divider', borderWidth: { xs: '0 0 1px 0', sm: '0 1px 0 0' },
    }}>
      {left}
    </Box>
    <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, background: { sm: 'linear-gradient(90deg, #efeee9, #ffffff 10%)' } }}>
      {right}
    </Box>
  </Paper>
}

export default OpenBook
