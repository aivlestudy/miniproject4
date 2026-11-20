// 날짜 문자열을 한국식 날짜로 표시 (값이 없으면 '-')
export default function formatDate(value) {
  return value ? new Date(value).toLocaleDateString('ko-KR') : '-'
}
