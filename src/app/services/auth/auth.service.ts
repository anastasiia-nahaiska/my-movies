import { http } from '@config/http';
import { memory } from '@config/memory';
import { rootStore } from '@store/root-store';
import { sessionSlice } from '@store/slices/session.slice';

import { CreateUserRequest, SessionResponse } from './auth.dto';

export class AuthService {
  public static readonly ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

  private accessToken: string | null = null;

  public get isAuthorized() {
    return Boolean(this.accessToken);
  }

  public constructor() {
    this.initAccessTokenFromMemory();
  }

  public async signUp(params: CreateUserRequest) {
    try {
      const res = await http.post<SessionResponse>('/users', { ...params });

      if (res.data.token) {
        this.initializeSessionWithAccessToken(res.data.token);
      }
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  public async signIn(email: string, password: string) {
    try {
      const res = await http.post<SessionResponse>('/sessions', { email, password });

      if (res.data.token) {
        this.initializeSessionWithAccessToken(res.data.token);
      }
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  public signOut() {
    this.accessToken = null;

    memory.clear();
    http.cleanHeaders();
  }

  private initializeSessionWithAccessToken(accessToken: string) {
    rootStore.dispatch(sessionSlice.actions.startSession());
    this.initializeAccessToken(accessToken);
  }

  private initializeAccessToken(accessToken: string) {
    http.addBearerToken(accessToken);
    this.saveAccessTokenToMemory(accessToken);

    this.accessToken = accessToken;
  }

  private initAccessTokenFromMemory() {
    const accessToken = this.getAccessTokenFromMemory();

    if (accessToken) {
      http.addBearerToken(accessToken);
      this.accessToken = accessToken;
    }
  }

  private getAccessTokenFromMemory() {
    return memory.getItem<string>(AuthService.ACCESS_TOKEN_KEY);
  }

  private saveAccessTokenToMemory(accessToken: string) {
    return memory.setItem<string>(AuthService.ACCESS_TOKEN_KEY, accessToken);
  }
}
