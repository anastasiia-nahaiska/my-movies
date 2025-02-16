import { Http } from '@config/http';
import { Memory } from '@config/memory';
import { injector } from '@config/injector';

import { CreateUserRequest, SessionResponse } from './auth.dto';

export class AuthService {
  private readonly accessTokenKey = 'ACCESS_TOKEN';

  private readonly http = injector.get(Http);
  private readonly memory = injector.get(Memory);

  private accessToken: string | null = null;

  public get isAuthorized() {
    return Boolean(this.accessToken);
  }

  public constructor() {
    this.initAccessTokenFromMemory();
  }

  public async signUp(params: CreateUserRequest) {
    try {
      const res = await this.http.post<SessionResponse>('/users', { ...params });

      if (res.data.token) {
        this.initializeAccessToken(res.data.token);
      }
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  public async signIn(email: string, password: string) {
    try {
      const res = await this.http.post<SessionResponse>('/sessions', { email, password });

      this.initializeAccessToken(res.data.token);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  public signOut() {
    this.accessToken = null;

    this.memory.clear();
    this.http.cleanHeaders();
  }

  private initializeAccessToken(accessToken: string) {
    this.http.addBearerToken(accessToken);
    this.saveAccessTokenToMemory(accessToken);

    this.accessToken = accessToken;
  }

  private initAccessTokenFromMemory() {
    const accessToken = this.getAccessTokenFromMemory();

    if (accessToken) {
      this.http.addBearerToken(accessToken);
      this.accessToken = accessToken;
    }
  }

  private getAccessTokenFromMemory() {
    return this.memory.getItem<string>(this.accessTokenKey);
  }

  private saveAccessTokenToMemory(accessToken: string) {
    return this.memory.setItem<string>(this.accessTokenKey, accessToken);
  }
}
