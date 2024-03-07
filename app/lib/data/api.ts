import {revalidateTag} from "next/cache";

export const API_URL = 'http://localhost:12555/api';


const jsonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*'
};

export const fetchApi = async (url: string, options?: RequestInit) => {
  if (!options) {
    options = {
      headers: jsonHeaders
    }
  } else {
    options.headers = {
      ...jsonHeaders,
      ...options.headers
    }
  }
  return fetch(API_URL + url, options)
}


export const revalidateCacheTag = async (tag: string) => {
  revalidateTag(tag)
}