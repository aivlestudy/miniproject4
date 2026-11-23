import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

// 선반 끝의 빈 자리 (누르면 새 도서 등록) — BookItem과 같은 높이 구조
function AddBookSlot({ onCreate }) {
  return <ButtonBase onClick={onCreate} sx={{ width: 124, height: 280, pt: 3, flexDirection: 'column', justifyContent: 'flex-start' }}>
    <Box sx={{
      width: 120, height: 180, borderRadius: 1,
      border: '2px dashed', borderColor: '#9aa3b5', bgcolor: 'rgba(255,255,255,.6)', color: 'primary.light',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.5,
      transition: 'background-color .2s',
      '&:hover': { bgcolor: '#fff' },
    }}>
      <AddIcon sx={{ fontSize: 40 }} />
      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>새 책 꽂기</Typography>
    </Box>
  </ButtonBase>
}

export default AddBookSlot
