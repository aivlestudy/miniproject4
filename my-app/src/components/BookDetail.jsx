import BookCover from './BookCover'
import RatingStars from './RatingStars'
import formatDate from '../utils/formatDate'

// 도서 상세 화면 (수정/삭제 + AI 표지 생성 영역)
function BookDetail({ book, onEdit, onDelete, onBack, onGenerateCover, coverBusy, generating }) {
  return <section className="detail">
    <div className="detail-heading">
      <h1>{book.title}</h1>
      <div>
        <button className="button edit" onClick={onEdit} disabled={generating}>수정</button>
        <button className="button delete" onClick={onDelete} disabled={generating}>삭제</button>
      </div>
    </div>
    <div className="detail-layout">
      <BookCover book={book} />
      <div className="detail-main">
        <div className="ai-panel">
          <h2>AI 표지 생성</h2>
          <p>도서 내용에 어울리는 표지를 만들어 보세요.</p>
          <form onSubmit={(event) => {
            event.preventDefault()
            onGenerateCover(new FormData(event.currentTarget).get('quality'))
          }}>
            <label>
              이미지 품질{' '}
              <select name="quality" defaultValue="medium" disabled={coverBusy}>
                <option value="low">LOW</option>
                <option value="medium">MEDIUM</option>
                <option value="high">HIGH</option>
              </select>
            </label>{' '}
            <button className="button light" disabled={coverBusy}>
              {generating ? '생성 중…' : 'AI 표지 생성'}
            </button>
          </form>
        </div>
        <div className="description">
          <h2>책 내용</h2>
          <p className="book-meta">{book.category && <em className="category">{book.category}</em>}<RatingStars rating={book.rating} /></p>
          {book.author && <p>저자: {book.author}</p>}
          <p>{book.content}</p>
        </div>
        <div className="dates">
          <span>생성일: {formatDate(book.createdAt)}</span>
          <span>수정일: {formatDate(book.updatedAt)}</span>
        </div>
      </div>
    </div>
    <div className="detail-footer"><button className="button muted" onClick={onBack}>도서 목록으로 돌아가기</button></div>
  </section>
}

export default BookDetail
