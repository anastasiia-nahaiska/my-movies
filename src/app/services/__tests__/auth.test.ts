import { http } from '@config/http';
import { memory } from '@config/memory';
import { rootStore } from '@store/root-store';
import { userToCreate } from '@services/__mocks__/auth';
import { AuthService } from '@services/auth/auth.service';
import { sessionSlice } from '@store/slices/session.slice';

describe('auth service', () => {
  const mockError = new Error();
  const mockToken = 'token';
  const usersUrl = '/users';
  const sessionsUrl = '/sessions';

  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();

    authService = new AuthService();
  });

  beforeAll(() => {
    jest.clearAllMocks();
    jest.spyOn(memory, 'setItem');
    jest.spyOn(memory, 'getItem');
    jest.spyOn(memory, 'clear');
    jest.spyOn(http, 'get');
    jest.spyOn(http, 'post');
    jest.spyOn(http, 'cleanHeaders');
    jest.spyOn(http, 'addBearerToken');
    jest.spyOn(rootStore, 'dispatch');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return user authorized info', () => {
    (memory.getItem as jest.Mock).mockReturnValueOnce(mockToken);

    authService = new AuthService();
    const isUserAuthorized = authService.isAuthorized;

    expect(isUserAuthorized).toBe(true);
  });

  describe('initialization', () => {
    it('should initialize with an access token from memory if available', () => {
      (memory.getItem as jest.Mock).mockReturnValueOnce(mockToken);

      authService = new AuthService();

      expect(memory.getItem).toHaveBeenCalledWith(AuthService.ACCESS_TOKEN_KEY);
      expect(http.addBearerToken).toHaveBeenCalledWith(mockToken);
    });

    it('should add Bearer token to http if token is exist in memory', () => {
      (memory.getItem as jest.Mock).mockReturnValueOnce(mockToken);

      authService = new AuthService();

      expect(http.addBearerToken).toHaveBeenCalledWith(mockToken);
    });
  });

  describe('signUp', () => {
    beforeAll(() => {
      (http.post as jest.Mock).mockResolvedValue({ data: { token: 'token' } });
    });

    it('should call http.post with correct params', async () => {
      await authService.signUp(userToCreate);

      expect(http.post).toHaveBeenCalledWith(usersUrl, userToCreate);
    });

    it('should set Bearer token to http', async () => {
      await authService.signUp(userToCreate);

      expect(http.addBearerToken).toHaveBeenCalledWith(mockToken);
    });

    it('should add token to memory', async () => {
      await authService.signUp(userToCreate);

      expect(memory.setItem).toHaveBeenCalledWith(AuthService.ACCESS_TOKEN_KEY, mockToken);
    });

    it('should start session', async () => {
      await authService.signUp(userToCreate);

      expect(rootStore.dispatch).toHaveBeenCalledWith(sessionSlice.actions.startSession());
    });

    it('should throw error on error in http.post', async () => {
      (http.post as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(authService.signUp(userToCreate)).rejects.toThrow();
    });

    it('should not initialize session and store token if no token in data returned', async () => {
      (http.post as jest.Mock).mockResolvedValueOnce({ data: { token: null } });

      await authService.signUp(userToCreate);

      expect(rootStore.dispatch).not.toHaveBeenCalled();
      expect(memory.setItem).not.toHaveBeenCalled();
      expect(http.addBearerToken).not.toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    const mockEmail = 'test-email@gmail.com';
    const mockPassword = 'password';

    beforeAll(() => {
      (http.post as jest.Mock).mockResolvedValue({ data: { token: 'token' } });
    });

    it('should call http.post with correct params', async () => {
      await authService.signIn(mockEmail, mockPassword);

      expect(http.post).toHaveBeenCalledWith(sessionsUrl, { email: mockEmail, password: mockPassword });
    });

    it('should set Bearer token to http', async () => {
      await authService.signIn(mockEmail, mockPassword);

      expect(http.addBearerToken).toHaveBeenCalledWith(mockToken);
    });

    it('should add token to memory', async () => {
      await authService.signIn(mockEmail, mockPassword);

      expect(memory.setItem).toHaveBeenCalledWith(AuthService.ACCESS_TOKEN_KEY, mockToken);
    });

    it('should start session', async () => {
      await authService.signIn(mockEmail, mockPassword);

      expect(rootStore.dispatch).toHaveBeenCalledWith(sessionSlice.actions.startSession());
    });

    it('should throw error on error in http.post', async () => {
      (http.post as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(authService.signIn(mockEmail, mockPassword)).rejects.toThrow();
    });

    it('should not initialize session and store token if no token in data returned', async () => {
      (http.post as jest.Mock).mockResolvedValueOnce({ data: { token: null } });

      await authService.signIn(mockEmail, mockPassword);

      expect(rootStore.dispatch).not.toHaveBeenCalled();
      expect(memory.setItem).not.toHaveBeenCalled();
      expect(http.addBearerToken).not.toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should clear all memory', () => {
      authService.signOut();

      expect(memory.clear).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should clear all http headers', () => {
      authService.signOut();

      expect(http.cleanHeaders).toHaveBeenCalled();
    });
  });
});
