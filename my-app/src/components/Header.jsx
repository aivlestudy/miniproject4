// 공통 헤더 + 네비게이션
function Header({ onNavigate, onCreate }) {
  return <header className="site-header"><div className="header-inner">
    <button className="brand" onClick={() => onNavigate('home')}>도서관리</button>
    <nav aria-label="주 메뉴">
      <button onClick={() => onNavigate('home')}>홈</button>
      <button onClick={() => onNavigate('list')}>도서 목록</button>
      <button className="new-book" onClick={onCreate}>새 도서 등록</button>
    </nav>
  </div></header>
}

export default Header
