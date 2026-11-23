import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import OpenBook from './OpenBook'
import BookCover from './BookCover'
import CATEGORIES from '../utils/categories'

const TITLE_MAX = 50
const CONTENT_MIN = 10
const CONTENT_MAX = 1000

// 등록/수정 폼: 펼친 책 (왼쪽: 표지 미리보기 / 오른쪽: 입력칸)
// 입력 state는 폼 안에, 저장은 App에 알리기
function BookForm({ book, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: book?.title || '',
    author: book?.author || '',
    content: book?.content || '',
    coverImageUrl: book?.coverImageUrl || '', // 표지 미리보기용 (저장할 때는 보내지 않음)
    rating: book?.rating || '',
    category: book?.category || '',
  })

  const [errors, setErrors] = useState({})

  function validate(values) {
    const newErrors = {}
    if (!values.title.trim()) newErrors.title = '제목을 입력하세요.'
    else if (values.title.trim().length > TITLE_MAX) newErrors.title = `제목은 ${TITLE_MAX}자 이하로 입력하세요.`
    if (!values.author.trim()) newErrors.author = '저자를 입력하세요.'
    if (!values.category) newErrors.category = '카테고리를 선택하세요.'
    if (!values.rating) newErrors.rating = '별점을 선택하세요.'
    if (!values.content.trim()) newErrors.content = '내용을 입력하세요.'
    else if (values.content.trim().length < CONTENT_MIN) newErrors.content = '내용을 10자 이상 입력하세요.'
    else if (values.content.trim().length > CONTENT_MAX) newErrors.content = '내용을 1000자 이하 입력하세요.'
    return newErrors
  }

  // 입력값 변경 + 해당 필드 에러 해제
  function handleChange(name, value) {
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = validate(form)
    setErrors(newErrors)
    const errorFields = Object.keys(newErrors)
    if (errorFields.length > 0) {
      document.getElementById(errorFields[0])?.focus() // 첫 번째 에러 칸으로 이동
      return
    }
    onSubmit(form)
  }

  const left = <>
    <Typography variant="overline" color="text.secondary">표지 미리보기</Typography>
    <BookCover book={form} width={220} />
    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
      저장한 뒤 상세 화면에서 AI 표지를 만들 수 있어요.
    </Typography>
  </>

  const right = <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
    <Typography variant="h5" component="h1">{book ? '책 정보 고치기' : '새 책 꽂기'}</Typography>
    <TextField
      id="title" label="제목" required value={form.title}
      onChange={(event) => handleChange('title', event.target.value)}
      error={!!errors.title} helperText={errors.title}
    />
    <TextField
      id="author" label="저자" required value={form.author}
      onChange={(event) => handleChange('author', event.target.value)}
      error={!!errors.author} helperText={errors.author}
    />
    <TextField
      id="category" select label="카테고리" required value={form.category}
      onChange={(event) => handleChange('category', event.target.value)}
      error={!!errors.category} helperText={errors.category}
    >
      {CATEGORIES.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
    </TextField>
    <Box id="rating" tabIndex={-1} sx={{ outline: 'none' }}>
      <Typography component="legend" variant="body2" color={errors.rating ? 'error' : 'text.secondary'}>별점 *</Typography>
      <Rating
        name="rating" size="large" value={Number(form.rating) || null}
        sx={{ color: 'secondary.main', '& .MuiRating-iconEmpty': { color: '#d6d3cc' } }}
        onChange={(event, value) => handleChange('rating', value || '')}
      />
      {errors.rating && <FormHelperText error>{errors.rating}</FormHelperText>}
    </Box>
    <TextField
      id="content" label="내용" required multiline minRows={6} value={form.content}
      onChange={(event) => handleChange('content', event.target.value)}
      error={!!errors.content}
      helperText={errors.content || `${form.content.length} / ${CONTENT_MAX}`}
      slotProps={{ htmlInput: { maxLength: CONTENT_MAX } }}
    />
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
      <Button onClick={onCancel}>취소</Button>
      <Button type="submit" variant="contained">{book ? '저장' : '꽂기'}</Button>
    </Box>
  </Box>

  return <OpenBook left={left} right={right} />
}

export default BookForm
