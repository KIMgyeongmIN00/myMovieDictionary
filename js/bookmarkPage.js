import { bringApi, getMovieDetailsURL } from './api.js';
import { getBookmarks, removeBookmark } from './bookmark.js';
import { openModal, setupModalListeners } from './modal.js';

export const displayBookmarkedMovies = async () => {
  const bookmarkedMoviesList = document.getElementById('bookmarkedMoviesList');
  bookmarkedMoviesList.innerHTML = '';

  if (getBookmarks().length === 0) {
    bookmarkedMoviesList.innerHTML = '<p class="no_search_result">북마크된 영화가 없습니다.</p>';
    return;
  }

  for (const movieId of getBookmarks()) {
    const movieURL = getMovieDetailsURL(movieId);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmQxOTM0MTVmZjIxMDMwZTY2YjYxZjk4ZGM5OGI3YSIsIm5iZiI6MTczNjMxNDg2MC45MzI5OTk4LCJzdWIiOiI2NzdlMGZlYzg5ZmM1ZDk0NDI0ZTYxYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JEZRfg9bGHazCffBLtUkUie-mbdYEw3oNvBac9kkUIs'
      }
    };

    try {
      const response = await fetch(movieURL, options);
      if (!response.ok) {
        throw new Error(`영화 정보를 불러오는데 실패했습니다. 상태 코드: ${response.status}`);
      }
      const movie = await response.json();

      // 영화 카드 생성
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
      image.onerror = () => {
        image.src = 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220702%2Fourmid%2Fpngtree-loading-icon-template-load-vector-png-image_5675658.png&type=sc960_832';
      };

      movieElement.appendChild(image);

      const movieInfo = document.createElement('div');
      movieInfo.classList.add('movie_info');
      movieInfo.innerHTML = `
        <div class="movie_title">${movie.title}</div>
      `;

      // 북마크 제거 버튼 추가
      const removeBookmarkButton = document.createElement('button');
      removeBookmarkButton.classList.add('remove_bookmark_button');
      removeBookmarkButton.innerHTML = 'X';
      removeBookmarkButton.dataset.movieId = movie.id;

      // 모달창 오남용 중지
      removeBookmarkButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const movieId = e.target.dataset.movieId;
        removeBookmark(movieId);
        displayBookmarkedMovies(); // 북마크 목록 다시 렌더링
      });

      movieElement.appendChild(movieInfo);
      movieElement.appendChild(removeBookmarkButton);
      bookmarkedMoviesList.appendChild(movieElement);
    } catch (error) {
      console.error('영화 정보를 불러오는 중 오류가 발생했습니다:', error);
    }
  }

  // 북마크된 영화 카드 클릭 이벤트 위임 처리
  bookmarkedMoviesList.addEventListener('click', (event) => {
    const movieElement = event.target.closest('.movie');
    if (movieElement) {
      openModal(movieElement);
    }
  });
};

// 페이지 로드 시 북마크된 영화 표시 및 모달 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
  displayBookmarkedMovies();
  setupModalListeners(); // 모달 이벤트 리스너 설정
});