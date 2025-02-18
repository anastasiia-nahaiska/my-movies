import { ResponseStatus } from './statuses.types';

export interface Pagination<T> {
  data: T[];
  meta: {
    total: number;
  };
  status: ResponseStatus;
}
