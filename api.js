// 영화 검색 클릭 시 페이지 새로고침
document.getElementById('clickToRefresh').addEventListener('click', () => {
  location.reload();
});

const baseURL = 'https://api.themoviedb.org/3';  // TMDB 홈페이지 URL
const popularMoviesURL = `${baseURL}/movie/popular?language=ko-KR`;  // TMDB API 접근 URL

// TMDB API 요청 옵션과 요청 키 암호화
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
    displayMovies(data.results); // 영화 목록 표시 함수 호출
  } catch (error) {
    console.error('영화를 불러오는데 에러가 발생 하였습니다. 에러 상태 - ', error);
  }
};

// 영화 목록을 화면에 표시
const displayMovies = (movies) => {
  const moviesList = document.getElementById('moviesList');
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
    movieElement.dataset.movieId = movie.id;
    movieElement.dataset.movieTitle = movie.title;
    movieElement.dataset.moviePoster = movie.poster_path;
    movieElement.dataset.movieOverview = movie.overview;
    movieElement.dataset.movieReleaseDate = movie.release_date;
    movieElement.dataset.movieRating = movie.vote_average;
    movieElement.dataset.movieVoteCount = movie.vote_count;

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
  });
};

// 모달창 여는 함수
const openModal = (movieElement) => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPoster = document.getElementById('modalPoster');
  modalPoster.onerror = () => { // 이미지 로딩 실패 시 기본 이미지 제공
    modalPoster.src = 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220702%2Fourmid%2Fpngtree-loading-icon-template-load-vector-png-image_5675658.png&type=sc960_832'; // 기본 이미지
  };
  const modalOverview = document.getElementById('modalOverview');
  const modalReleaseDate = document.getElementById('modalReleaseDate');
  const modalRating = document.getElementById('modalRating');

  // 모달창에 영화 정보 채우기
  modalTitle.textContent = movieElement.dataset.movieTitle;
  modalPoster.src = `https://image.tmdb.org/t/p/w500${movieElement.dataset.moviePoster}`;
  modalOverview.textContent = movieElement.dataset.movieOverview;
  modalReleaseDate.textContent = `개봉일: ${movieElement.dataset.movieReleaseDate}`;
  modalRating.textContent = `평점: ${movieElement.dataset.movieRating} (${movieElement.dataset.movieVoteCount}명)`;

  // 모달창 표시
  modal.style.display = 'flex';
};

// 모달창 닫기 함수
const closeModal = () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
};

// 모달창 닫기 버튼 이벤트리스너
document.querySelector('.close_button').addEventListener('click', closeModal);

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

// 검색어 입력 후 검색 버튼 눌러 검색
document.getElementById('searchButton').addEventListener('click', () => {
  const keyword = document.getElementById('searchInput').value.trim();
  if (keyword) {
    searchMovies(keyword);
  } else {
    alert("검색어를 입력해주세요!");
  }
});

// 검색어 입력 후 엔터키 눌러 검색
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const keyword = document.getElementById('searchInput').value.trim();
    if (keyword) {
      searchMovies(keyword);
    } else {
      alert("검색어를 입력해주세요!");
    }
  }
});

// 영화 카드 클릭 이벤트 위임 처리
document.getElementById('moviesList').addEventListener('click', (event) => {
  const movieElement = event.target.closest('.movie');
  if (movieElement) {
    openModal(movieElement);
  }
});