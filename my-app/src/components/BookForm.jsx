import { useState } from 'react'

const CATEGORIES = ['소설', '에세이', 'IT', '과학', '기타']
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

  return <section className="form-page">
    <h1>{book ? '도서 수정' : '새 도서 등록'}</h1>
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          value={form.title}
          onChange={(event) => handleChange('title', event.target.value)}
          placeholder="도서 제목을 입력하세요"
          required
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <p id="title-error" className="error-message">{errors.title}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="author">저자</label>
        <input
          id="author"
          value={form.author}
          onChange={(event) => handleChange('author', event.target.value)}
          placeholder="저자를 입력하세요"
          required
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {errors.author && <p id="author-error" className="error-message">{errors.author}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="category">카테고리</label>
        <select
          id="category"
          value={form.category}
          onChange={(event) => handleChange('category', event.target.value)}
          required
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'category-error' : undefined}
        >
          <option value="">카테고리를 선택하세요</option>
          {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        {errors.category && <p id="category-error" className="error-message">{errors.category}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="rating">별점</label>
        <select
          id="rating"
          value={form.rating}
          onChange={(event) => handleChange('rating', event.target.value)}
          required
          aria-invalid={!!errors.rating}
          aria-describedby={errors.rating ? 'rating-error' : undefined}
        >
          <option value="">별점을 선택하세요</option>
          {[5, 4, 3, 2, 1].map((score) => <option key={score} value={score}>{'★'.repeat(score)} ({score}점)</option>)}
        </select>
        {errors.rating && <p id="rating-error" className="error-message">{errors.rating}</p>}
      </div>
      <div className="form-field">
        <div className="field-header">
          <label htmlFor="content">내용</label>
          <span className="char-count">{form.content.length} / {CONTENT_MAX}</span>
        </div>
        <textarea
          id="content"
          value={form.content}
          onChange={(event) => handleChange('content', event.target.value)}
          placeholder="도서의 내용을 입력하세요"
          rows="8"
          required
          maxLength={CONTENT_MAX}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'content-error' : undefined}
        />
        {errors.content && <p id="content-error" className="error-message">{errors.content}</p>}
      </div>
      <label htmlFor="cover">표지 이미지 URL (선택)</label>
      <input id="cover" type="url" value={form.coverImageUrl} onChange={(event) => setForm({ ...form, coverImageUrl: event.target.value })} placeholder="https://example.com/cover.jpg" />
      <div className="form-actions">
        <button type="button" className="button light" onClick={onCancel}>취소</button>
        <button className="button primary">저장</button>
      </div>
    </form>
  </section>
}

export default BookForm
