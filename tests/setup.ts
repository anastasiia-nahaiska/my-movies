jest.mock('axios', () => {
  const actualStatus = jest.requireActual('axios');

  return {
    ...actualStatus,
    create: jest.fn().mockImplementation(() => ({
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
      defaults: {
        baseURL: 'http://localhost:8000/api/v1',
        headers: {},
      },
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
    })),
  };
});

jest.mock('react-native-mmkv');

jest.mock('@config/config', () => ({
  config: {
    API_URL: 'http://localhost:8000/api/v1',
  },
}));
