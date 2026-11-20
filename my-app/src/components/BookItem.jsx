import BookCover from './BookCover'
import RatingStars from './RatingStars'
import formatDate from '../utils/formatDate'

// 목록의 도서 카드 1개
function BookItem({ book, onSelect }) {
  return <button className="book-card" onClick={() => onSelect(book.id)}>
    <BookCover book={book} />
    <span className="card-body">
      <span className="book-meta">{book.category && <em className="category">{book.category}</em>}<RatingStars rating={book.rating} /></span>
      <strong>{book.title}</strong>
      <span>{book.author && '저자: ' + book.author}</span>
      <span>{book.content}</span>
      <small>등록일 {formatDate(book.createdAt)}</small>
    </span>
  </button>
}

export default BookItem
