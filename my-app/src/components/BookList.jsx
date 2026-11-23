import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import BookItem from './BookItem'
import { CATEGORIES } from '../utils/categories'

// 도서 목록 화면 (검색 + 카테고리 알약 + 정렬 + 카드 목록 + 로딩/빈 목록)
function BookList({ books, loading, search, onSearch, category, onCategory, sort, onSort, onSelect, onCreate }) {
  return <Box component="section">
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      <Box>
        <Typography variant="h5" component="h1">도서 목록</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>등록한 도서를 확인하고 관리하세요.</Typography>
      </Box>
      <Button variant="contained" disableElevation onClick={onCreate}>+ 새 도서 등록</Button>
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
      <TextField
        size="small"
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="제목이나 내용으로 검색"
        slotProps={{ htmlInput: { 'aria-label': '도서 검색' } }}
        sx={{ flexGrow: 1, maxWidth: 420 }}
      />
      <TextField select size="small" label="정렬" value={sort} onChange={(event) => onSort(event.target.value)} sx={{ width: 150 }}>
        <MenuItem value="latest">최신 등록순</MenuItem>
        <MenuItem value="rating">별점 높은순</MenuItem>
        <MenuItem value="title">제목순</MenuItem>
      </TextField>
    </Box>
    {/* 카테고리 알약 (선택된 것만 파란색) */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 4 }}>
      {['전체', ...CATEGORIES].map((name) => <Button
        key={name}
        variant={category === name ? 'contained' : 'text'}
        disableElevation
        aria-pressed={category === name}
        onClick={() => onCategory(name)}
        sx={{ borderRadius: '99px', minWidth: 0, px: 1.5, fontWeight: category === name ? 700 : 600, color: category === name ? '#fff' : '#141414' }}
      >{name}</Button>)}
    </Box>
    {loading
      ? <Typography color="text.secondary">도서 목록을 불러오는 중입니다...</Typography>
      : books.length
        ? <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', columnGap: 3, rowGap: 4 }}>{books.map((book) => <BookItem key={book.id} book={book} onSelect={onSelect} />)}</Box>
        : <Box sx={{ textAlign: 'center', py: 8, borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
          <Typography variant="h6" component="h2">{search || category !== '전체' ? '검색 결과가 없습니다' : '등록된 도서가 없습니다'}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>새 도서를 등록해 보세요.</Typography>
        </Box>}
  </Box>
}

export default BookList
