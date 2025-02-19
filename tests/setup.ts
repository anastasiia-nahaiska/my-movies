jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    })),
  };
});

jest.mock('react-native-mmkv');

jest.mock('@config/config', () => ({
  config: {
    API_URL: 'http://localhost:8000/api/v1',
  },
}));
