import { useState } from 'react'
import { CATEGORIES } from '../utils/categories'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const TITLE_MAX = 50
const CONTENT_MIN = 10
const CONTENT_MAX = 1000
// 등록/수정 폼 (입력 state는 폼 안에, 저장은 App에 알리기)
function BookForm({ book, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: book?.title || '',
    author: book?.author || '',
    content: book?.content || '',
    coverImageUrl: book?.coverImageUrl || '',
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

  return <Box component="section" sx={{ maxWidth: 680, mx: 'auto' }}>
    <Typography variant="h5" component="h1" sx={{ mb: 3 }}>{book ? '도서 수정' : '새 도서 등록'}</Typography>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        id="title"
        label="제목"
        value={form.title}
        onChange={(event) => handleChange('title', event.target.value)}
        placeholder="도서 제목을 입력하세요"
        required
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        id="author"
        label="저자"
        value={form.author}
        onChange={(event) => handleChange('author', event.target.value)}
        placeholder="저자를 입력하세요"
        required
        error={!!errors.author}
        helperText={errors.author}
      />
      <TextField
        id="category"
        select
        label="카테고리"
        value={form.category}
        onChange={(event) => handleChange('category', event.target.value)}
        required
        error={!!errors.category}
        helperText={errors.category}
      >
        <MenuItem value="">카테고리를 선택하세요</MenuItem>
        {CATEGORIES.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
      </TextField>
      <TextField
        id="rating"
        select
        label="별점"
        value={form.rating}
        onChange={(event) => handleChange('rating', event.target.value)}
        required
        error={!!errors.rating}
        helperText={errors.rating}
      >
        <MenuItem value="">별점을 선택하세요</MenuItem>
        {[5, 4, 3, 2, 1].map((score) => <MenuItem key={score} value={score}>{'★'.repeat(score)} ({score}점)</MenuItem>)}
      </TextField>
      <Box>
        <TextField
          id="content"
          label="내용"
          value={form.content}
          onChange={(event) => handleChange('content', event.target.value)}
          placeholder="도서의 내용을 입력하세요"
          multiline
          rows={8}
          fullWidth
          required
          error={!!errors.content}
          helperText={errors.content}
          slotProps={{ htmlInput: { maxLength: CONTENT_MAX } }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>{form.content.length} / {CONTENT_MAX}</Typography>
      </Box>
      <TextField id="cover" type="url" label="표지 이미지 URL (선택)" value={form.coverImageUrl} onChange={(event) => setForm({ ...form, coverImageUrl: event.target.value })} placeholder="https://example.com/cover.jpg" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button type="button" variant="outlined" color="inherit" onClick={onCancel} sx={{ borderColor: '#E6E6E6' }}>취소</Button>
        <Button type="submit" variant="contained" disableElevation>저장</Button>
      </Box>
    </Box>
  </Box>
}

export default BookForm
