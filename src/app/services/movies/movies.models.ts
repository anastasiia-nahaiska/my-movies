import { ActorFromApi, MovieFromApi } from './movies.dto';

export class Movie implements MovieFromApi {
  public id: number;
  public title: string;
  public year: number;
  public format: string;
  public createdAt: string;
  public updatedAt: string;
  public actors?: ActorFromApi[];

  public constructor(id: number, title: string, year: number, format: string, createdAt: string, updatedAt: string, actors: ActorFromApi[] = []) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.format = format;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.actors = actors;
  }

  public static buildItem(movieFromApi: MovieFromApi) {
    return new Movie(
      movieFromApi.id,
      movieFromApi.title,
      movieFromApi.year,
      movieFromApi.format,
      movieFromApi.createdAt,
      movieFromApi.updatedAt,
      movieFromApi.actors,
    );
  }
}

export class MovieActor implements ActorFromApi {
  public id: number;
  public name: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: number, name: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static buildItemFromName(name: string) {
    const today = new Date().toISOString();

    return new MovieActor(Math.random(), name, today, today);
  }
}
