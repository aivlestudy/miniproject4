import { useState } from 'react'

// 등록/수정 폼 (입력 state는 폼 안에, 저장은 App에 알리기)
function BookForm({ book, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: book?.title || '',
    author: book?.author || '',
    content: book?.content || '',
    coverImageUrl: book?.coverImageUrl || '',
  })

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(form)
  }

  return <section className="form-page">
    <h1>{book ? '도서 수정' : '새 도서 등록'}</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">제목</label>
      <input id="title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="도서 제목을 입력하세요" required />
      <label htmlFor="author">저자</label>
      <input id="author" value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} placeholder="저자를 입력하세요" />
      <label htmlFor="content">내용</label>
      <textarea id="content" value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} placeholder="도서의 내용을 입력하세요" rows="8" required />
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
