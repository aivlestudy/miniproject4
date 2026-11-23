import { createTheme } from '@mui/material/styles'

// AIVLE 서재 테마 (잉크 네이비 + 밝은 원목)
const theme = createTheme({
  palette: {
    primary: { main: '#1b2a4a', light: '#3d5a99', contrastText: '#fff' },
    secondary: { main: '#e8a33d', contrastText: '#1b2a4a' }, // AI 반짝임 포인트
    background: { default: '#f7f7f5', paper: '#ffffff' },
    text: { primary: '#1f2430', secondary: '#6b7280' },
    divider: '#e6e6e2',
  },
  typography: {
    fontFamily: '"Noto Sans KR", system-ui, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h5: { fontWeight: 700, letterSpacing: '-0.3px' },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { textTransform: 'none' } } },
  },
})

export default theme
