import axios, { AxiosError, HttpStatusCode } from 'axios';

import { Http } from '@config/http';
import { axiosInstanceMock, configMock, dataMock, endpointMock, errorMock, mockBaseUrl, responseMock, tokenMock } from '@config/__mocks__/http';

describe('', () => {
  let http: Http;

  beforeAll(() => {
    (axios.create as jest.Mock).mockReturnValue(axiosInstanceMock);
  });

  beforeEach(() => {
    http = new Http(mockBaseUrl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create axios instance with correct baseURL and headers', () => {
    expect(http['axiosInstance'].defaults.baseURL).toBe(mockBaseUrl);
    expect(http['axiosInstance'].defaults.headers).toEqual({});
  });

  it('should add Bearer token to headers', () => {
    http.addBearerToken(tokenMock);

    expect(http['headers']['Authorization']).toBe(`Bearer ${tokenMock}`);
  });

  it('should clean headers', () => {
    http.addBearerToken(tokenMock);
    http.cleanHeaders();

    expect(http['headers']).toEqual({});
  });

  it('should add header', () => {
    http.addHeader('Authorization', `Bearer ${tokenMock}`);

    expect(http['headers']['Authorization']).toBe(`Bearer ${tokenMock}`);
  });

  it('should call get from axios with correct params and return response', async () => {
    axiosInstanceMock.get.mockResolvedValue(responseMock);

    const response = await http.get(endpointMock);

    expect(axiosInstanceMock.get).toHaveBeenCalledWith(endpointMock, undefined);
    expect(response).toBe(responseMock);
  });

  it('should call post from axios with correct params and return response', async () => {
    axiosInstanceMock.post.mockResolvedValue(responseMock);

    const response = await http.post(endpointMock, dataMock, configMock);

    expect(axiosInstanceMock.post).toHaveBeenCalledWith(endpointMock, dataMock, configMock);
    expect(response).toBe(responseMock);
  });

  it('should call delete from axios with correct params and return response', async () => {
    axiosInstanceMock.delete.mockResolvedValue(responseMock);

    const response = await http.delete(endpointMock);

    expect(axiosInstanceMock.delete).toHaveBeenCalledWith(endpointMock, undefined);
    expect(response).toBe(responseMock);
  });

  it('should call patch from axios with correct params and return response', async () => {
    axiosInstanceMock.patch.mockResolvedValue(responseMock);

    const response = await http.patch(endpointMock, dataMock);

    expect(axiosInstanceMock.patch).toHaveBeenCalledWith(endpointMock, dataMock, undefined);
    expect(response).toBe(responseMock);
  });

  it('should handle unauthorized 401 error in interceptor', async () => {
    axiosInstanceMock.get.mockRejectedValue(errorMock);

    try {
      await http.get(endpointMock);
    } catch (error) {
      expect((error as AxiosError)?.response?.status).toBe(HttpStatusCode.Unauthorized);
    }
  });
});
