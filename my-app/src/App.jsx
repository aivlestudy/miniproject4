import { useEffect, useState } from 'react'
import './App.css'

const API = 'http://localhost:3000/books'
const emptyForm = { title: '', author: '', content: '', coverImageUrl: '' }
const date = (value) => value ? new Date(value).toLocaleDateString('ko-KR') : '-'

function Cover({ book }) {
  return <div className="book-cover">{book.coverImageUrl
    ? <img src={book.coverImageUrl} alt={book.title + ' 표지'} />
    : <div className="cover-placeholder"><span>✦</span><strong>{book.title}</strong><small>BOOK COLLECTION</small></div>}
  </div>
}

function App() {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState('home')
  const [selectedId, setSelectedId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const selected = books.find((book) => String(book.id) === String(selectedId))
  const filtered = books.filter((book) => (book.title + book.author + book.content).toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    let active = true
    fetch(API).then((response) => {
      if (!response.ok) throw new Error('도서 목록을 불러오지 못했습니다.')
      return response.json()
    }).then((data) => { if (active) setBooks(data) })
      .catch(() => { if (active) setNotice('서버에 연결할 수 없습니다. 루트 디렉터리에서 json-server db.json --port 3000을 실행해 주세요.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  function go(next) { setPage(next); setNotice(''); window.scrollTo(0, 0) }
  function create() { setSelectedId(null); setForm(emptyForm); go('form') }
  function edit() { setForm({ title: selected.title, author: selected.author || '', content: selected.content, coverImageUrl: selected.coverImageUrl || '' }); go('form') }

  async function save(event) {
    event.preventDefault()
    const title = form.title.trim()
    const author = form.author.trim()
    const content = form.content.trim()
    if (!title || !content) { setNotice('제목과 내용을 입력해 주세요.'); return }
    const now = new Date().toISOString()
    const body = { title, author, content, coverImageUrl: form.coverImageUrl.trim(), updatedAt: now }
    try {
      const response = await fetch(selected ? API + '/' + selected.id : API, {
        method: selected ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected ? body : { ...body, createdAt: now }),
      })
      if (!response.ok) throw new Error()
      const saved = await response.json()
      setBooks((current) => selected
        ? current.map((book) => String(book.id) === String(selected.id) ? saved : book)
        : [saved, ...current])
      setSelectedId(saved.id)
      setPage('detail')
      setNotice(selected ? '도서를 수정했습니다.' : '도서를 등록했습니다.')
    } catch { setNotice('저장에 실패했습니다. 서버 연결을 확인해 주세요.') }
  }

  async function remove() {
    if (!selected || !window.confirm('「' + selected.title + '」 도서를 삭제할까요?')) return
    try {
      const response = await fetch(API + '/' + selected.id, { method: 'DELETE' })
      if (!response.ok) throw new Error()
      setBooks((current) => current.filter((book) => String(book.id) !== String(selected.id)))
      setSelectedId(null)
      setPage('list')
      setNotice('도서를 삭제했습니다.')
    } catch { setNotice('삭제에 실패했습니다. 서버 연결을 확인해 주세요.') }
  }

  return <div className="book-app">
    <header className="site-header"><div className="header-inner">
      <button className="brand" onClick={() => go('home')}>도서관리</button>
      <nav aria-label="주 메뉴">
        <button onClick={() => go('home')}>홈</button>
        <button onClick={() => go('list')}>도서 목록</button>
        <button className="new-book" onClick={create}>새 도서 등록</button>
      </nav>
    </div></header>
    <main className="page-content">
      {notice && <p className="notice" role="status">{notice}</p>}
      {page === 'home' && <section className="home">
        <h1>도서 관리 시스템에 오신 것을 환영합니다!</h1>
        <p>이 시스템을 사용하여 도서를 등록하고 관리할 수 있습니다.</p>
        <button className="button primary" onClick={() => go('list')}>도서 목록 보기</button>
      </section>}
      {page === 'list' && <section>
        <div className="list-heading"><div><h1>도서 목록</h1><p>등록한 도서를 확인하고 관리하세요.</p></div><button className="button primary" onClick={create}>+ 새 도서 등록</button></div>
        <label className="search"><span className="sr-only">도서 검색</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="제목이나 내용으로 검색" /></label>
        {loading ? <p>도서 목록을 불러오는 중입니다...</p> : filtered.length ? <div className="book-grid">{filtered.map((book) => <button className="book-card" key={book.id} onClick={() => { setSelectedId(book.id); go('detail') }}>
          <Cover book={book} /><span className="card-body"><strong>{book.title}</strong><span>{book.author && '저자: ' + book.author}</span><span>{book.content}</span><small>등록일 {date(book.createdAt)}</small></span>
        </button>)}</div> : <div className="empty"><h2>{search ? '검색 결과가 없습니다' : '등록된 도서가 없습니다'}</h2><p>새 도서를 등록해 보세요.</p></div>}
      </section>}
      {page === 'form' && <section className="form-page">
        <h1>{selected ? '도서 수정' : '새 도서 등록'}</h1>
        <form onSubmit={save}>
          <label htmlFor="title">제목</label>
          <input id="title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="도서 제목을 입력하세요" required />
          <label htmlFor="author">저자</label>
          <input id="author" value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} placeholder="저자를 입력하세요" />
          <label htmlFor="content">내용</label>
          <textarea id="content" value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} placeholder="도서의 내용을 입력하세요" rows="8" required />
          <label htmlFor="cover">표지 이미지 URL (선택)</label>
          <input id="cover" type="url" value={form.coverImageUrl} onChange={(event) => setForm({ ...form, coverImageUrl: event.target.value })} placeholder="https://example.com/cover.jpg" />
          <div className="form-actions"><button type="button" className="button light" onClick={() => go(selected ? 'detail' : 'list')}>취소</button><button className="button primary">저장</button></div>
        </form>
      </section>}
      {page === 'detail' && selected && <section className="detail">
        <div className="detail-heading"><h1>{selected.title}</h1><div><button className="button edit" onClick={edit}>수정</button><button className="button delete" onClick={remove}>삭제</button></div></div>
        <div className="detail-layout"><Cover book={selected} /><div className="detail-main">
          <div className="ai-panel"><h2>AI 표지 생성</h2><p>도서 내용에 어울리는 표지를 만들어 보세요.</p><button className="button light" onClick={() => setNotice('AI 표지 생성을 위해 OpenAI API와 서버를 연결해주세요.')}>AI 표지 생성</button></div>
          <div className="description"><h2>책 내용</h2>{selected.author && <p>저자: {selected.author}</p>}<p>{selected.content}</p></div>
          <div className="dates"><span>생성일: {date(selected.createdAt)}</span><span>수정일: {date(selected.updatedAt)}</span></div>
        </div></div>
        <div className="detail-footer"><button className="button muted" onClick={() => go('list')}>도서 목록으로 돌아가기</button></div>
      </section>}
    </main>
  </div>
}
export default App
