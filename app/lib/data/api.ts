export const API_URL = 'http://localhost:12555/api';

export const fetchApi = async (url: string, options?: RequestInit) => {
  return fetch(API_URL + url, options)
}