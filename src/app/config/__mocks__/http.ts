import { HttpStatusCode } from 'axios';

export const mockBaseUrl = 'http://localhost:8000/api/v1';

export const axiosInstanceMock = {
  defaults: { baseURL: mockBaseUrl, headers: {} },
  interceptors: {
    response: {
      use: jest.fn(),
      eject: jest.fn(),
      clear: jest.fn(),
    },
  },
  get: jest.fn(),
  put: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  HttpStatusCode: {
    Unauthorized: 401,
  },
};

export const tokenMock = 'token';

export const endpointMock = '/endpoint';

export const dataMock = { data: 'some data' };

export const configMock = { headers: { 'Content-Type': 'multipart/form-data' } };

export const responseMock = { data: dataMock, status: 200 };

export const errorMock = {
  response: { status: HttpStatusCode.Unauthorized },
  config: { _retry: false },
};
