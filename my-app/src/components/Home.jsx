// 홈 화면
function Home({ onNavigate }) {
  return <section className="home">
    <h1>도서 관리 시스템에 오신 것을 환영합니다!</h1>
    <p>이 시스템을 사용하여 도서를 등록하고 관리할 수 있습니다.</p>
    <button className="button primary" onClick={() => onNavigate('list')}>도서 목록 보기</button>
  </section>
}

export default Home
