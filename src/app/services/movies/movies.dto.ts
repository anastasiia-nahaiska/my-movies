import { VideoFormat } from '@app/types/video-format';
import { ResponseStatus } from '@app/types/statuses.types';

export interface MovieFromApi {
  id: number;
  title: string;
  year: number;
  format: string;
  createdAt: string;
  updatedAt: string;
  actors?: ActorFromApi[];
}

export type MovieSummary = Omit<MovieFromApi, 'actors'>;

export interface ActorFromApi {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MovieResponse {
  data: MovieFromApi;
  status: ResponseStatus;
}

export interface GetMovieResponse {
  data: MovieSummary[];
  meta: {
    total: number;
  };
  status: ResponseStatus;
}

export interface AddMovieRequest {
  title: string;
  year: number;
  actors: string[];
  format: VideoFormat;
}
