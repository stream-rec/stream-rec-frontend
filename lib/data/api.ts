'use server'
import {API_URL, jsonHeaders} from "@/lib/data/definitions";
import {getServerSession} from "next-auth";
import {redirect} from "@/i18n";

export const fetchApi = async (url: string, options?: RequestInit) => {
  const session = await getServerSession()
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
      Authorization: `Bearer ${session.user.email}`
    }
  const response = await fetch(API_URL + url, options)
// If the response status is 401 (Unauthorized), remove the access token
  if (response.status === 401) {
    console.error("Unauthorized, logging out")
    redirect("/logout")
  }
  return response
}