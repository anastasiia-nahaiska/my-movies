export interface GetMoviesParams {
  actor?: string;
  title?: string;
  search?: string;
  sort?: SortMoviesBy;
  order?: Order;
  limit?: number;
  offset?: number;
}

export enum SortMoviesBy {
  Id = 'id',
  Title = 'title',
  Year = 'year',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
