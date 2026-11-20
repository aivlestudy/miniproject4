// 표지 이미지 (없으면 제목으로 기본 표지 표시)
function BookCover({ book }) {
  return <div className="book-cover">{book.coverImageUrl
    ? <img src={book.coverImageUrl} alt={book.title + ' 표지'} />
    : <div className="cover-placeholder"><span>✦</span><strong>{book.title}</strong><small>BOOK COLLECTION</small></div>}
  </div>
}

export default BookCover
