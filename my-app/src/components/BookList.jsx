import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import CATEGORIES from '../utils/categories'
import BookItem from './BookItem'
import AddBookSlot from './AddBookSlot'

// 선반 한 칸 높이 264px 중 책 바로 아래(204~220px)에 나무 선반을 그림
const SHELF_BACKGROUND = 'repeating-linear-gradient(to bottom, transparent 0 204px, #e2cfae 204px 212px, #cdb18a 212px 220px, rgba(27,42,74,.08) 220px 224px, transparent 224px 264px)'

// 첫 화면: 서가 (검색 + 책 + 빈 자리)
// searchedBooks: 검색어만 적용한 목록 (탭별 권수 계산용) / books: 검색어 + 카테고리 + 정렬 적용한 목록
function BookList({ books, searchedBooks, loading, search, onSearch, category, onCategory, sort, onSort, onSelect, onCreate }) {
  // 탭별 권수
  function countOf(item) {
    return item === '전체' ? searchedBooks.length : searchedBooks.filter((book) => book.category === item).length
  }

  return <Box>
    {/* 검색창 + 카테고리 탭 (서가와 같은 가운데 축) */}
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mb: 4 }}>
      <TextField
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="제목, 저자, 내용으로 검색"
        size="small"
        sx={{ width: '100%', maxWidth: 420, '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: 'background.paper' } }}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
      />
      {/* 카테고리 분류 탭 + 정렬 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        {['전체', ...CATEGORIES].map((item) => <Chip
          key={item} clickable
          label={<>{item}<Box component="span" sx={{ ml: 0.75, opacity: 0.7, fontWeight: 400 }}>{loading ? '' : countOf(item)}</Box></>}
          color="primary" variant={category === item ? 'filled' : 'outlined'}
          onClick={() => onCategory(item)}
          sx={{ fontWeight: 700, bgcolor: category === item ? undefined : 'background.paper' }}
        />)}
        <TextField
          select size="small" value={sort} onChange={(event) => onSort(event.target.value)}
          aria-label="정렬"
          sx={{ ml: 1, '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: 'background.paper', fontSize: 14, height: 32 } }}
        >
          <MenuItem value="newest">최신순</MenuItem>
          <MenuItem value="oldest">오래된순</MenuItem>
          <MenuItem value="rating">별점 높은순</MenuItem>
          <MenuItem value="title">제목순</MenuItem>
        </TextField>
      </Box>
    </Box>

    {loading
      ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      : <>
        {books.length === 0 && (search || category !== '전체') && <Typography color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>조건에 맞는 책이 없어요.</Typography>}
        <Box sx={{
          // 칸 묶음은 가운데, 책은 왼쪽부터 채움 (마지막 줄도 왼쪽에 붙음)
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 124px)', justifyContent: 'center', columnGap: 1, px: 1,
          background: SHELF_BACKGROUND, borderRadius: 1,
        }}>
          {books.map((book) => <BookItem key={book.id} book={book} onSelect={onSelect} />)}
          <AddBookSlot onCreate={onCreate} />
        </Box>
      </>}
  </Box>
}

export default BookList
