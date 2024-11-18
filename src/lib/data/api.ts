'use server'
import {API_URL, jsonHeaders} from "@/src/lib/data/definitions";
import {redirect} from "@/src/i18n/routing";
import {auth} from "@/src/providers/auth";

export const fetchApi = async (url: string, options?: RequestInit) => {
  const session = await auth()
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
  if (session && session.user)
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${session.user.jwt}`
    }
  const response = await fetch(API_URL + url, options)
// If the response status is 401 (Unauthorized), remove the access token
  if (response.status === 401) {
    console.error("Unauthorized, logging out")
    redirect({
      href: "/logout",
      locale: "en"
    })
  }
  return response
}