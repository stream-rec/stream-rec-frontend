import {cookies} from "next/headers";
import {removeAccessToken, removeValidUntil} from "@/lib/data/auth/tokens";
import {redirect} from "@/i18n";

export const API_URL = process.env.API_URL || "http://localhost:12555/api";


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
  // add bearer token
  if (url !== "/auth/login" && url !== "/auth/recover") {
    const authToken = cookies().get("accessToken")?.value
    if (authToken) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${authToken}`
      }
    }
  }

  const response = await fetch(API_URL + url, options)
  // If the response status is 401 (Unauthorized), remove the access token
  if (response.status === 401) {
    await removeAccessToken()
    await removeValidUntil()
    // Redirect to the login page
    redirect("/auth/login")
  }
  return response
}