'use server'
import {cookies} from "next/headers";
import {API_URL, jsonHeaders} from "@/lib/data/definitions";
import {redirect} from "next/navigation";


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
    // Redirect to logout api
    redirect("/api/logout")
  }
  return response
}