let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// 메인 페이지에서 북마크 껐다 키기
export const toggleBookmark = (movieId) => {
  if (bookmarks.includes(movieId)) {
    bookmarks = bookmarks.filter(id => id !== movieId);
    alert('북마크가 제거되었습니다.');
  } else {
    bookmarks.push(movieId);
    alert('북마크가 추가되었습니다.');
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

// 북마크 페이지에서 북마크 삭제하기
export const removeBookmark = (movieId) => {
  bookmarks = bookmarks.filter(id => id !== movieId);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

// localStorage export용 선언
export const getBookmarks = () => bookmarks;