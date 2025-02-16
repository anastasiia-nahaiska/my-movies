import { http } from '@config/http';

import { GetMovieResponse } from './movies.dto';
import { GetMoviesParams } from './movies.types';

export class MovieService {
  public async getMovies(params: GetMoviesParams) {
    try {
      const res = await http.get<GetMovieResponse>('/movies', { params: { ...params } });

      return res;
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
}
