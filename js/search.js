import { bringApi, getSearchMoviesURL } from './api.js';
import { displayMovies } from './ui.js';

// 검색기능 고도화
export const searchMovies = async (query) => {
  const processedQuery = query.toLowerCase().replace(/\s+/g, '');
  const searchURL = getSearchMoviesURL(query);
  const searchedMovies = await bringApi(searchURL);

  if (searchedMovies && searchedMovies.results) {
    const filteredResults = searchedMovies.results.filter(movie => {
      const movieTitle = movie.title.toLowerCase().replace(/\s+/g, '');
      return movieTitle.includes(processedQuery);
    });
    displayMovies(filteredResults);
  }
};

// 검색 기능 export용 함수
export const setupSearchListeners = () => {
  document.getElementById('searchButton').addEventListener('click', () => {
    const keyword = document.getElementById('searchInput').value.trim();
    if (keyword) {
      searchMovies(keyword);
    } else {
      alert("검색어를 입력해주세요!");
    }
  });

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
};