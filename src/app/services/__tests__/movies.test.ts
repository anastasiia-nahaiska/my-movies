import { http } from '@config/http';
import { movieToAdd, movie } from '@services/__mocks__/movies';
import { MovieService } from '@services/movies/movies.service';

describe('movies service', () => {
  const error = new Error();
  const moviesUrl = '/movies';
  const moviesService = new MovieService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    const requestParams = {};

    beforeAll(() => {
      (http.get as jest.Mock).mockResolvedValue({ data: [] });
    });

    it('getMovies should call get http method with correct params', async () => {
      await moviesService.getMovies(requestParams);

      expect(http.get).toHaveBeenCalledWith(moviesUrl, { params: requestParams });
    });

    it('getMovies should throw error on error in http.get', async () => {
      (http.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(moviesService.getMovies(requestParams)).rejects.toThrow();
    });
  });

  describe('getMovie', () => {
    const movieId = 123;

    beforeAll(() => {
      (http.get as jest.Mock).mockResolvedValue({ data: { data: movie } });
    });

    it('getMovie should call get http method with correct params', async () => {
      await moviesService.getMovie(movieId);

      expect(http.get).toHaveBeenCalledWith(`${moviesUrl}/${movieId}`);
    });

    it('getMovie should throw error on error in http.get', async () => {
      (http.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(moviesService.getMovie(movieId)).rejects.toThrow();
    });
  });

  describe('addMovie', () => {
    beforeAll(() => {
      (http.post as jest.Mock).mockResolvedValue({ data: [] });
    });

    it('addMovie should call post http method with correct params', async () => {
      await moviesService.addMovie(movieToAdd);

      expect(http.post).toHaveBeenCalledWith(moviesUrl, movieToAdd);
    });

    it('addMovie should throw error on error in http.post', async () => {
      (http.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(moviesService.addMovie(movieToAdd)).rejects.toThrow();
    });
  });
});
