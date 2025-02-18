import { ActorFromApi } from '../movies.dto';

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

  public static buildItem(actorFromApi: ActorFromApi) {
    return new MovieActor(actorFromApi.id, actorFromApi.name, actorFromApi.createdAt, actorFromApi.updatedAt);
  }
}
