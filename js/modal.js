// modal.js

// 모달 열기 함수
export const openModal = (movieElement) => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPoster = document.getElementById('modalPoster');
  const modalOverview = document.getElementById('modalOverview');
  const modalReleaseDate = document.getElementById('modalReleaseDate');
  const modalRating = document.getElementById('modalRating');

  // 모달에 영화 정보 채우기
  modalTitle.textContent = movieElement.dataset.movieTitle;
  modalPoster.src = `https://image.tmdb.org/t/p/w500${movieElement.dataset.moviePoster}`;
  modalOverview.textContent = movieElement.dataset.movieOverview;
  modalReleaseDate.textContent = `개봉일: ${movieElement.dataset.movieReleaseDate}`;
  modalRating.textContent = `평점: ${movieElement.dataset.movieRating} (${movieElement.dataset.movieVoteCount}명)`;

  // 모달 표시
  modal.style.display = 'flex';
};

// 모달 닫기 함수
export const closeModal = () => {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
};

// 모달 이벤트 리스너 설정 함수
export const setupModalListeners = () => {
  // 닫기 버튼 클릭 시 모달 닫기
  document.querySelector('.close_button').addEventListener('click', closeModal);

  // 배경 클릭 시 모달 닫기
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      closeModal();
    }
  });
};