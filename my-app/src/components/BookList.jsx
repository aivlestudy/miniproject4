import BookItem from './BookItem'

// 도서 목록 화면 (검색 + 카드 목록 + 로딩/빈 목록)
function BookList({ books, loading, search, onSearch, onSelect, onCreate }) {
  return <section>
    <div className="list-heading">
      <div><h1>도서 목록</h1><p>등록한 도서를 확인하고 관리하세요.</p></div>
      <button className="button primary" onClick={onCreate}>+ 새 도서 등록</button>
    </div>
    <label className="search">
      <span className="sr-only">도서 검색</span>
      <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="제목이나 내용으로 검색" />
    </label>
    {loading
      ? <p>도서 목록을 불러오는 중입니다...</p>
      : books.length
        ? <div className="book-grid">{books.map((book) => <BookItem key={book.id} book={book} onSelect={onSelect} />)}</div>
        : <div className="empty"><h2>{search ? '검색 결과가 없습니다' : '등록된 도서가 없습니다'}</h2><p>새 도서를 등록해 보세요.</p></div>}
  </section>
}

export default BookList
