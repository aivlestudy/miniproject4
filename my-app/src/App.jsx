import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import BookDetail from './components/BookDetail'

const API = 'http://localhost:3000/books'

function App() {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState('home')
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [generatingId, setGeneratingId] = useState(null)
  const selected = books.find((book) => String(book.id) === String(selectedId))
  const filtered = books.filter((book) => (book.title + book.author + book.content).toLowerCase().includes(search.toLowerCase()))

  // 도서 목록 불러오기 (GET)
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

  // 화면 전환
  function go(next) { setPage(next); setNotice(''); window.scrollTo(0, 0) }
  function handleCreate() { setSelectedId(null); go('form') }
  function handleSelect(id) { setSelectedId(id); go('detail') }

  // 등록(POST) / 수정(PATCH)
  async function handleSave(form) {
    const title = form.title.trim()
    const author = form.author.trim()
    const content = form.content.trim()
    if (!title || !content) { setNotice('제목과 내용을 입력해 주세요.'); return }
    const now = new Date().toISOString()
    const body = { title, author, content, coverImageUrl: form.coverImageUrl.trim(), rating: Number(form.rating), category: form.category, updatedAt: now }
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

  // 삭제(DELETE)
  async function handleDelete() {
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

  async function handleGenerateCover(quality) {
    if (!selected || generatingId !== null) return
    const { id, title, author, content } = selected
    setGeneratingId(id)
    setNotice('')

    try {
      const response = await fetch('/api/generate-cover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.slice(0, 300),
          author: typeof author === 'string' ? author.trim().slice(0, 200) : '',
          content: content.slice(0, 3000),
          quality,
        }),
      })
      const image = await response.json().catch(() => null)
      if (!response.ok || !image?.b64_json) {
        throw new Error(image?.error ?? '표지 생성 응답을 읽을 수 없습니다.')
      }

      const coverImageUrl = `data:image/png;base64,${image.b64_json}`
      const saved = await fetch(`${API}/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverImageUrl }),
      }).catch(() => null)
      if (!saved?.ok) throw new Error('표지 저장에 실패했습니다. json-server 0.17.4 실행 상태를 확인해 주세요.')

      setBooks((current) => current.map((book) =>
        book.id === id ? { ...book, coverImageUrl } : book))
      setNotice('AI 표지를 저장했습니다.')
    } catch (error) {
      setNotice(error instanceof TypeError ? '표지 생성 서버에 연결할 수 없습니다.' : error.message)
    } finally {
      setGeneratingId(null)
    }
  }

  return <div className="book-app">
    <Header onNavigate={go} onCreate={handleCreate} />
    <main className="page-content">
      {notice && <p className="notice" role="status">{notice}</p>}
      {page === 'home' && <Home onNavigate={go} />}
      {page === 'list' && <BookList books={filtered} loading={loading} search={search} onSearch={setSearch} onSelect={handleSelect} onCreate={handleCreate} />}
      {page === 'form' && <BookForm book={selected} onSubmit={handleSave} onCancel={() => go(selected ? 'detail' : 'list')} />}
      {page === 'detail' && selected && <BookDetail book={selected} onEdit={() => go('form')} onDelete={handleDelete} onBack={() => go('list')} onGenerateCover={handleGenerateCover} coverBusy={generatingId !== null} generating={generatingId === selected.id} />}
    </main>
  </div>
}

export default App
