// 별점 표시 (예: 4 → ★★★★☆)
function RatingStars({ rating }) {
  if (!rating) return null
  return <span className="rating" aria-label={'별점 ' + rating + '점'}>{'★'.repeat(rating) + '☆'.repeat(5 - rating)}</span>
}

export default RatingStars
