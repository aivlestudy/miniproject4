import BookCover from './BookCover'
import formatDate from '../utils/formatDate'

// 목록의 도서 카드 1개
function BookItem({ book, onSelect }) {
  return <button className="book-card" onClick={() => onSelect(book.id)}>
    <BookCover book={book} />
    <span className="card-body">
      <strong>{book.title}</strong>
      <span>{book.author && '저자: ' + book.author}</span>
      <span>{book.content}</span>
      <small>등록일 {formatDate(book.createdAt)}</small>
    </span>
  </button>
}

export default BookItem
