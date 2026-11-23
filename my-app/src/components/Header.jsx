import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Logo from './Logo'

// 상단 바 (서가가 아닌 화면에서는 '홈' 버튼)
function Header({ page, onNavigate }) {
  return <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', color: 'primary.main', borderBottom: 1, borderColor: 'divider' }}>
    <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto' }}>
      <ButtonBase onClick={() => onNavigate('list')} sx={{ gap: 1.25, flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Logo size={32} />
        <Typography variant="h6" component="span">AIVLE 서재</Typography>
      </ButtonBase>
      {page !== 'list' && <Button startIcon={<ArrowBackIcon />} onClick={() => onNavigate('list')}>홈</Button>}
    </Toolbar>
  </AppBar>
}

export default Header
