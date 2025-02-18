jest.mock('react-native-mmkv');

jest.mock('@config/config', () => ({
  config: {
    API_URL: 'http://localhost:8000/api/v1',
  },
}));

jest.mock('@store/root-store', () => ({
  rootStore: {
    dispatch: jest.fn(),
  },
}));
