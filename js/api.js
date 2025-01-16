const baseURL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmQxOTM0MTVmZjIxMDMwZTY2YjYxZjk4ZGM5OGI3YSIsIm5iZiI6MTczNjMxNDg2MC45MzI5OTk4LCJzdWIiOiI2NzdlMGZlYzg5ZmM1ZDk0NDI0ZTYxYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JEZRfg9bGHazCffBLtUkUie-mbdYEw3oNvBac9kkUIs'
  }
};

export const bringApi = async (url) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`fetch 요청중 에러가 발생 하였습니다. 에러 이유 - ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('영화를 불러오는데 에러가 발생 하였습니다. 에러 상태 - ', error);
    return null;
  }
};

export const getPopularMoviesURL = () => `${baseURL}/movie/popular?language=ko-KR`;
export const getSearchMoviesURL = (query) => `${baseURL}/search/movie?language=ko-KR&query=${encodeURIComponent(query)}`;
export const getMovieDetailsURL = (movieId) => `${baseURL}/movie/${movieId}?language=ko-KR`;