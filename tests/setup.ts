jest.mock('@config/http', () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('@config/config', () => ({
  config: {
    API_URL: 'http://localhost:8000/api/v1',
  },
}));
