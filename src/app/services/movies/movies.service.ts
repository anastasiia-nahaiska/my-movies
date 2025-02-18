import { http } from '@config/http';

import { GetMoviesParams } from './movies.types';
import { AddMovieRequest, MovieResponse, MovieSummaryFromApi } from './movies.dto';
import { Movie } from './movies.models';
import { Pagination } from '@app/types/pagination';

export class MovieService {
  public async getMovies(params: GetMoviesParams) {
    try {
      const res = await http.get<Pagination<MovieSummaryFromApi>>('/movies', { params: { ...params } });

      return res.data;
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  public async addMovie(params: AddMovieRequest) {
    try {
      const res = await http.post<MovieResponse>('/movies', { ...params });

      return res.data;
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  public async getMovie(movieId: string) {
    try {
      const res = await http.post<MovieResponse>(`/movies/${movieId}`);

      return Movie.buildItem(res.data.data);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
}
