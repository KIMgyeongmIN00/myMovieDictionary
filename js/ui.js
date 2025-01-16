import { getBookmarks, toggleBookmark } from './bookmark.js';
import { openModal } from './modal.js';

// 영화 카드 표시하기
export const displayMovies = (movies) => {
  const moviesList = document.getElementById('moviesList');
  moviesList.innerHTML = '';

  if (movies.length === 0) {
    moviesList.innerHTML = '<p class="no_search_result">검색 결과와 일치하는 영화가 없습니다. 다시 시도하세요.</p>';
    return;
  }

  // 영화 카드 생성하기
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
    image.onerror = () => {
      image.src = 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220702%2Fourmid%2Fpngtree-loading-icon-template-load-vector-png-image_5675658.png&type=sc960_832';
    };

    movieElement.appendChild(image);

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie_info');
    movieInfo.innerHTML = `
      <div class="movie_title">${movie.title}</div>
    `;

    const bookmarkButton = document.createElement('button');
    bookmarkButton.classList.add('bookmark_button');
    if (getBookmarks().includes(movie.id.toString())) {
      bookmarkButton.classList.add('bookmarked');
    }
    bookmarkButton.innerHTML = '북마크';
    bookmarkButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(movie.id.toString());
      bookmarkButton.classList.toggle('bookmarked');
    });

    movieElement.appendChild(movieInfo);
    movieElement.appendChild(bookmarkButton);
    moviesList.appendChild(movieElement);
  });

  // 영화 카드 클릭 이벤트 위임 처리
  moviesList.addEventListener('click', (event) => {
    const movieElement = event.target.closest('.movie');
    if (movieElement) {
      openModal(movieElement);
    }
  });
};