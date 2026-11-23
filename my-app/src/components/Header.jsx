import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// 공통 헤더 + 네비게이션 (현재 화면 메뉴는 파란색 + 굵게)
function Header({ page, onNavigate, onCreate }) {
  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="inherit" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #E6E6E6' }}>
      <Toolbar disableGutters sx={{ maxWidth: 1170, width: '100%', mx: 'auto', px: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button onClick={() => onNavigate('list')} sx={{ color: '#1E9EFF', fontSize: 20, fontWeight: 700, px: 0 }}>책갈피</Button>
        </Typography>
        <Box component="nav" aria-label="주 메뉴">
          <Button color="inherit" onClick={() => onNavigate('list')} sx={{ color: page === 'list' ? '#1E9EFF' : '#141414', fontWeight: page === 'list' ? 700 : 500 }}>도서 목록</Button>
          <Button color="inherit" onClick={onCreate} sx={{ color: page === 'form' ? '#1E9EFF' : '#141414', fontWeight: page === 'form' ? 700 : 500 }}>새 도서 등록</Button>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
}

export default Header
