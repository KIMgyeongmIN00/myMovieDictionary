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
      throw new Error(`fetch 요청중 에러가 발생 하였습니다. 에러 이유 - ${response.status}`);  // fetch 과정에서 에러가 발생하면 fetch 진행의 상태를 알려줍니다
    }
    const data = await response.json();
    const movies = data.results; 
    showMovies(movies);
  } catch (error) {
    console.error('영화를 불러오는데 에러가 발생 하였습니다. 에러 상태 - ', error);  // throw가 발생 시킨 new Error를 콘솔창에 반환합니다. 
  }
}

// 영화 목록을 화면에 표시
const showMovies = (movies) => {
  const moviesList = document.getElementById('movieslist');
  moviesList.innerHTML = '';

  if (movies.length === 0) {
    // 검색과 일치하는 영화가 없으면 메시지 표시
    moviesList.innerHTML = '<p class="noSearchResult">검색 결과와 일치하는 영화가 없습니다. 다시 시도하세요.</p>';
    return;

  } else { // 불러올 수 있는 영화의 데이터가 있으면 카드 덩어리와 그 덩어리 안에 카드 하나하나 제작
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
    });
  }
};


// 검색 기능 추가
const searchMovies = async (query) => {
  const searchURL = `${baseURL}/search/movie?language=ko-KR&query=${encodeURIComponent(query)}`;
  await bringApi(searchURL);
}

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

