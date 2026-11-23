import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import Header from './components/Header'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import BookDetail from './components/BookDetail'

const API = 'http://localhost:3000/books'

// json-server 요청 공통 처리 (JSON으로 보내고, 실패하면 에러)
async function request(url, method = 'GET', data) {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  })
  if (!response.ok) throw new Error(`${method} ${url} 실패 (${response.status})`)
  return response.json()
}

function App() {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState('list')
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('전체')
  const [sort, setSort] = useState('newest')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [generatingId, setGeneratingId] = useState(null)
  const selected = books.find((book) => String(book.id) === String(selectedId))
  // 검색어로 거르기 → 카테고리로 거르기
  const searched = books.filter((book) => (book.title + book.author + book.content).toLowerCase().includes(search.toLowerCase()))
  const filtered = searched.filter((book) => category === '전체' || book.category === category)
  // 정렬 (원본을 바꾸지 않도록 복사본을 정렬)
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'oldest') return (a.createdAt || '').localeCompare(b.createdAt || '')
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'title') return a.title.localeCompare(b.title, 'ko')
    return (b.createdAt || '').localeCompare(a.createdAt || '') // 최신순
  })

  // 도서 목록 불러오기 (GET /books) — 처음 화면이 뜰 때 한 번
  useEffect(() => {
    let active = true // 화면이 사라진 뒤 늦게 온 응답은 무시
    async function loadBooks() {
      try {
        const data = await request(API)
        if (active) setBooks(data)
      } catch {
        if (active) setError('서버에 연결할 수 없습니다. 루트 디렉터리에서 json-server db.json --port 3000을 실행해 주세요.')
      } finally {
        if (active) setLoading(false)
      }
    }
    loadBooks()
    return () => { active = false }
  }, [])

  // 도서 1권 불러오기 (GET /books/:id) — 선택한 도서가 바뀔 때마다 최신 정보로 교체
  useEffect(() => {
    if (selectedId === null) return
    let active = true
    async function loadBookDetail(bookId) {
      try {
        // 1. json-server에서 도서 정보 가져오기 (GET)
        const book = await request(`${API}/${bookId}`)
        // 2. 가져온 도서 정보를 화면 상태에 저장
        if (active) setBooks((current) => current.map((item) => String(item.id) === String(book.id) ? book : item))
      } catch {
        if (active) setNotice('도서 정보를 불러오지 못했습니다.')
      }
    }
    loadBookDetail(selectedId)
    return () => { active = false }
  }, [selectedId])

  // 화면 전환
  function go(next) { setPage(next); setNotice(''); window.scrollTo(0, 0) }
  function handleCreate() { setSelectedId(null); go('form') }
  function handleSelect(id) { setSelectedId(id); go('detail') }

  // 등록(POST) / 수정(PATCH)
  // 입력 검사는 BookForm에서 끝난 상태
  async function handleSave(form) {
    const now = new Date().toISOString()
    const values = { title: form.title.trim(), author: form.author.trim(), content: form.content.trim(), rating: Number(form.rating), category: form.category }
    try {
      let saved
      if (selected) {
        // 수정: 바뀐 필드만 보내기 (PATCH)
        const changes = { updatedAt: now }
        for (const key in values) {
          if (values[key] !== selected[key]) changes[key] = values[key]
        }
        saved = await request(`${API}/${selected.id}`, 'PATCH', changes)
        setBooks((current) => current.map((book) => String(book.id) === String(saved.id) ? saved : book))
      } else {
        // 등록: 새 도서 필드 전체 보내기 (POST)
        saved = await request(API, 'POST', { ...values, coverImageUrl: '', createdAt: now, updatedAt: now })
        setBooks((current) => [saved, ...current])
      }
      setSelectedId(null)
      go('list')
      setNotice(selected ? '도서를 수정했습니다.' : '도서를 등록했습니다.')
    } catch { setNotice('저장에 실패했습니다. 서버 연결을 확인해 주세요.') }
  }

  // 삭제(DELETE) — 삭제 확인은 BookDetail의 Dialog에서
  async function handleDelete() {
    if (!selected) return
    try {
      await request(`${API}/${selected.id}`, 'DELETE')
      setBooks((current) => current.filter((book) => String(book.id) !== String(selected.id)))
      setSelectedId(null)
      go('list')
      setNotice('도서를 삭제했습니다.')
    } catch { setNotice('삭제에 실패했습니다. 서버 연결을 확인해 주세요.') }
  }

  // AI 표지 생성 (1·2단계는 Vite 서버의 server/generateCover.js가 처리 — API 키를 브라우저에 노출하지 않기 위해)
  async function handleGenerateCover(quality) {
    if (!selected || generatingId !== null) return
    const { id, title, author, content } = selected
    setGeneratingId(id)
    setNotice('')

    try {
      // 1. 도서 제목과 내용으로 프롬프트 구성 → 서버에 도서 정보 전달
      // 2. OpenAI로 표지 이미지 생성 요청 (POST) → 서버가 b64_json만 돌려줌
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

      // 3. 응답의 b64_json을 Data URL로 변환
      const coverImageUrl = `data:image/png;base64,${image.b64_json}`

      // 4. 변환한 Data URL을 json-server에 저장 (PATCH, coverImageUrl만)
      await request(`${API}/${id}`, 'PATCH', { coverImageUrl }).catch(() => {
        throw new Error('표지 저장에 실패했습니다. json-server 0.17.4 실행 상태를 확인해 주세요.')
      })

      // 5. 화면 상태 업데이트
      setBooks((current) => current.map((book) =>
        book.id === id ? { ...book, coverImageUrl } : book))
      setNotice('AI 표지를 저장했습니다.')
    } catch (error) {
      setNotice(error instanceof TypeError ? '표지 생성 서버에 연결할 수 없습니다.' : error.message)
    } finally {
      setGeneratingId(null)
    }
  }

  return <>
    <Header page={page} onNavigate={go} />
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      {page === 'list' && <BookList books={sorted} searchedBooks={searched} loading={loading} error={error} search={search} onSearch={setSearch} category={category} onCategory={setCategory} sort={sort} onSort={setSort} onSelect={handleSelect} onCreate={handleCreate} />}
      {page === 'form' && <BookForm book={selected} onSubmit={handleSave} onCancel={() => go(selected ? 'detail' : 'list')} />}
      {page === 'detail' && selected && <BookDetail book={selected} onEdit={() => go('form')} onDelete={handleDelete} onGenerateCover={handleGenerateCover} coverBusy={generatingId !== null} generating={generatingId === selected.id} />}
    </Container>
    {/* 알림 메시지 (아래쪽에 잠깐 떴다 사라짐) */}
    <Snackbar
      open={!!notice} message={notice} autoHideDuration={4000}
      onClose={(event, reason) => { if (reason !== 'clickaway') setNotice('') }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  </>
}

export default App
