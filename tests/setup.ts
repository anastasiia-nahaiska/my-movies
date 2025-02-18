jest.mock('@config/config', () => ({
  config: {
    API_URL: 'http://localhost:8000/api/v1',
  },
}));

jest.mock('@config/http', () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    addBearerToken: jest.fn(),
    addHeader: jest.fn(),
    cleanHeaders: jest.fn(),
  },
}));

jest.mock('@config/memory', () => ({
  memory: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
}));

jest.mock('@store/root-store', () => ({
  rootStore: {
    dispatch: jest.fn(),
  },
}));
