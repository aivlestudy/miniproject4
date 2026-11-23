// AIVLE 서재 마크 (펼친 책 + AI 반짝임)
function Logo({ size = 28 }) {
  return <svg width={size} height={size} viewBox="2.5 1 19 19" aria-hidden="true">
    <path d="M3 5.5c3-1.2 6-1.2 9 .8v13c-3-2-6-2-9-.8z" fill="#1b2a4a" />
    <path d="M21 5.5c-3-1.2-6-1.2-9 .8v13c3-2 6-2 9-.8z" fill="#3d5a99" />
    <path d="M17.5 1.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z" fill="#e8a33d" />
  </svg>
}

export default Logo
