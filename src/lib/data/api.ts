"use server"
import { API_URL, jsonHeaders } from "@/src/lib/data/definitions"
import { redirect } from "@/src/i18n/routing"
import { auth } from "@/auth"
import { getLocale } from "next-intl/server"

const handleError = async (code: string, message: string) => {
	const locale = await getLocale()
	redirect({
		href: `/error?code=${code}&message=${encodeURIComponent(message)}`,
		locale: locale,
	})
}

export const fetchApi = async (url: string, options?: RequestInit): Promise<Response> => {
	const session = await auth()

	// Set default headers
	if (!options) {
		options = {
			headers: jsonHeaders,
		}
	} else {
		options.headers = {
			...jsonHeaders,
			...options.headers,
		}
	}

	// Add auth token if user is logged in
	if (session && session.user) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${session.user.token}`,
		}
	}

	const response = await fetch(API_URL + url, options)

	// Handle unauthorized access
	if (response.status === 401) {
		const locale = await getLocale()
		redirect({
			href: "/logout",
			locale: locale,
		})
	}

	// Handle service unavailable
	if (response.status === 503 || response.status === 504) {
		// console.error("Service unavailable")
		await handleError(response.status.toString(), response.statusText)
	}

	// Handle server errors (500+)
	if (response.status >= 500) {
		// console.error("Server error:", response.status, response.statusText)
		await handleError("server_error", "server_error")
	}

	return response
}
