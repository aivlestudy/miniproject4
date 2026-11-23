import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'

// 리디 느낌의 기본 색/글꼴 (파란색은 강조에만)
const theme = createTheme({
  palette: {
    primary: { main: '#1E9EFF', contrastText: '#fff' },
    text: { primary: '#141414', secondary: '#787878' },
    divider: '#F0F0F0',
  },
  // 제목은 굵게(700), 소제목은 600, 본문은 보통(400) / 글자 사이는 리디처럼 살짝 좁게
  typography: {
    fontFamily: '"Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
    h5: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' },
    subtitle1: { fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' },
    subtitle2: { fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' },
    body1: { fontSize: 15, fontWeight: 400, letterSpacing: '-0.01em' },
    body2: { fontSize: 14, fontWeight: 400, letterSpacing: '-0.01em' },
    caption: { fontSize: 12, fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
