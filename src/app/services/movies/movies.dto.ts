import { ResponseStatus } from '@app/types/statuses.types';

export interface MovieFromApi {
  id: number;
  title: string;
  year: string;
  format: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMovieResponse {
  data?: MovieFromApi[];
  meta?: {
    total: number;
  };
  status?: ResponseStatus;
}
