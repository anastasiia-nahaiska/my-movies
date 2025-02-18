import { VideoFormat } from '@app/types/video-format';
import { AddMovieRequest, MovieFromApi } from '@services/movies/movies.dto';

export const movieToAdd: AddMovieRequest = {
  title: 'Test',
  year: 2023,
  actors: ['James Smith, Robert De Niro'],
  format: VideoFormat.DVD,
};

export const movieFromApi: MovieFromApi = {
  id: 123,
  title: 'Test',
  year: 2023,
  format: VideoFormat.DVD,
  createdAt: '2021-06-29T10:46:59.000Z',
  updatedAt: '2021-06-29T10:46:59.000Z',
  actors: [
    {
      id: 7,
      name: 'Humphrey Bogart',
      createdAt: '2021-06-29T10:51:46.000Z',
      updatedAt: '2021-06-29T10:51:46.000Z',
    },
    {
      id: 8,
      name: 'Ingrid Bergman',
      createdAt: '2021-06-29T10:51:46.000Z',
      updatedAt: '2021-06-29T10:51:46.000Z',
    },
  ],
};
