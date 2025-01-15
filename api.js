const baseURL = 'https://api.themoviedb.org/3';  // TMDB 홈페이지 URL
const popularMoviesURL = `${baseURL}/movie/popular?language=ko-KR`;  // TMDB API 

// TMDB API 요청 옵션
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmQxOTM0MTVmZjIxMDMwZTY2YjYxZjk4ZGM5OGI3YSIsIm5iZiI6MTczNjMxNDg2MC45MzI5OTk4LCJzdWIiOiI2NzdlMGZlYzg5ZmM1ZDk0NDI0ZTYxYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JEZRfg9bGHazCffBLtUkUie-mbdYEw3oNvBac9kkUIs'
  }
};

// API를 json으로 변환하여 데이터 가져오기
const bringApi = async (url) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) { 
      throw new Error(`fetch 요청중 에러가 발생 하였습니다. 에러 이유 - ${response.status}`);
    }
    const data = await response.json();
    const movies = data.results; 
    displayMovies(movies); // 영화 목록 표시 함수 호출
  } catch (error) {
    console.error('영화를 불러오는데 에러가 발생 하였습니다. 에러 상태 - ', error);
  }
};

// 영화 목록을 화면에 표시
const displayMovies = (movies) => {
  const moviesList = document.getElementById('movieslist');
  moviesList.innerHTML = '';

  if (movies.length === 0) {
    // 검색과 일치하는 영화가 없으면 메시지 표시
    moviesList.innerHTML = '<p class="no_search_result">검색 결과와 일치하는 영화가 없습니다. 다시 시도하세요.</p>';
    return;
  }

  // 불러올 수 있는 영화의 데이터가 있으면 카드 덩어리와 그 덩어리 안에 카드 하나하나 제작
  movies.forEach(movie => {
    const movieElement = document.createElement('section');
    movieElement.classList.add('movie');

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = `${movie.title}`;
    image.onerror = () => { // 이미지 로딩 실패 시 기본 이미지 제공
      image.src = 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220702%2Fourmid%2Fpngtree-loading-icon-template-load-vector-png-image_5675658.png&type=sc960_832'; // 기본 이미지
    };

    movieElement.appendChild(image);

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie_info');
    movieInfo.innerHTML = `
      <div class="movie_title">${movie.title}</div>
    `;

    movieElement.appendChild(movieInfo);
    moviesList.appendChild(movieElement);

    // 영화 카드 클릭 시 모달창 열기
    movieElement.addEventListener('click', () => {
      openModal(movie);
    });
  });
};

// 모달창 열기
const openModal = (movie) => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalPoster = document.getElementById('modal-poster');
  modalPoster.onerror = () => { // 이미지 로딩 실패 시 기본 이미지 제공
    modalPoster.src = 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220702%2Fourmid%2Fpngtree-loading-icon-template-load-vector-png-image_5675658.png&type=sc960_832'; // 기본 이미지
  };
  const modalOverview = document.getElementById('modal-overview');
  const modalReleaseDate = document.getElementById('modal-release-date');
  const modalRating = document.getElementById('modal-rating');

  // 모달창에 영화 정보 채우기
  modalTitle.textContent = movie.title;
  modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  modalOverview.textContent = movie.overview;
  modalReleaseDate.textContent = `개봉일: ${movie.release_date}`;
  modalRating.textContent = `평점: ${movie.vote_average} (${movie.vote_count}명)`;

  // 모달창 표시
  modal.style.display = 'flex';
};

// 모달창 닫기 함수
const closeModal = () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
};

// 모달창 닫기 버튼 이벤트리스너
document.querySelector('.close-button').addEventListener('click', closeModal);

// 배경 클릭 시 모달창 닫기
window.addEventListener('click', (event) => {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
});

// 검색 기능 추가
const searchMovies = async (query) => {
  const searchURL = `${baseURL}/search/movie?language=ko-KR&query=${encodeURIComponent(query)}`;
  await bringApi(searchURL);
};

// 웹페이지 로딩 시 인기 영화 불러오기
bringApi(popularMoviesURL);

// 키워드 입력 후 버튼 누를 시 검색 이벤트 활성화
document.getElementById('searchButton').addEventListener('click', () => {
  const keyword = document.getElementById('searchInput').value.trim();
  if (keyword) {
    searchMovies(keyword);
  }
});

// 키워드 입력 후 엔터키 입력 시 검색 이벤트 활성화
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const keyword = document.getElementById('searchInput').value.trim();
    if (keyword) {
      searchMovies(keyword);
    }
  }
});