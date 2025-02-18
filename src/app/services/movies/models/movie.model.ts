import { MovieFromApi } from '../movies.dto';
import { MovieActor } from './movie-actor.model';

export class Movie implements MovieFromApi {
  public id: number;
  public title: string;
  public year: number;
  public format: string;
  public createdAt: string;
  public updatedAt: string;
  public actors?: MovieActor[];

  public constructor(id: number, title: string, year: number, format: string, createdAt: string, updatedAt: string, actors: MovieActor[] = []) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.format = format;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.actors = actors;
  }

  public static buildItem(movieFromApi: MovieFromApi) {
    const movieActors = movieFromApi.actors?.map(MovieActor.buildItem);

    return new Movie(
      movieFromApi.id,
      movieFromApi.title,
      movieFromApi.year,
      movieFromApi.format,
      movieFromApi.createdAt,
      movieFromApi.updatedAt,
      movieActors,
    );
  }
}
