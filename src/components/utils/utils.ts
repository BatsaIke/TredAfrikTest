import axios, { AxiosInstance, AxiosResponse } from 'axios';

const accessToken = localStorage.getItem('accessToken');

const api: AxiosInstance = axios.create({
  baseURL: 'https://www.buzsquare.com/api/v1', 
});

const makeApiRequest = async <T>(
  method: string,
  endpoint: string,
  data?: any,
  headers?: any // Allow passing additional headers
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      method,
      url: endpoint,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...headers, // Spread additional headers
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}`, error.message);
    throw error;
  }
};

export default makeApiRequest;
