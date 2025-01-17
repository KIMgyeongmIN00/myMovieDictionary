import { bringApi, getPopularMoviesURL } from './api.js';
import { displayMovies } from './ui.js';
import { setupSearchListeners } from './search.js';
import { setupModalListeners } from './modal.js';
import { setupDarkmodeListener } from './darkmode.js';

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
  // 인기 영화 불러오기
  const data = await bringApi(getPopularMoviesURL());
  if (data && data.results) {
    displayMovies(data.results);
  }

  // 검색 이벤트 리스너 설정
  setupSearchListeners();

  // 모달 이벤트 리스너 설정
  setupModalListeners();

  // 다크모드 이벤트 리스너 설정
  setupDarkmodeListener();
});

// 페이지 새로고침
document.getElementById('clickToRefresh').addEventListener('click', () => {
  location.reload();
});