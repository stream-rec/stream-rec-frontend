"use server";
import { API_URL, jsonHeaders } from "@/src/lib/data/definitions";
import { redirect } from "@/src/i18n/routing";
import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

const handleError = async (code: string, message: string) => {
  const locale = await getLocale();
  redirect({
    href: `/error?code=${code}&message=${encodeURIComponent(message)}`,
    locale: locale,
  });
}

export const fetchApi = async (url: string, options?: RequestInit): Promise<Response> => {
  const session = await auth();

  // Set default headers
  if (!options) {
    options = {
      headers: jsonHeaders,
    };
  } else {
    options.headers = {
      ...jsonHeaders,
      ...options.headers,
    };
  }

  // Add auth token if user is logged in
  if (session && session.user) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${session.user.token}`,
    };
  }

  try {
    const response = await fetch(API_URL + url, options);

    // Handle unauthorized access
    if (response.status === 401) {
      console.error("Unauthorized, logging out");
      const locale = await getLocale();
      redirect({
        href: "/logout",
        locale: locale,
      });
    }

    // Handle server errors (500+)
    if (response.status >= 500) {
      console.error("Server error:", response.status, response.statusText);
      await handleError(response.status.toString(), response.statusText);
    }

    // Handle service unavailable
    if (response.status === 503 || response.status === 504) {
      console.error("Service unavailable");
      await handleError('503', 'service_unavailable');
    }

    return response;
  } catch (error) {
    // Handle network errors
    console.error("Network error:", error);
    await handleError('network_error', (error as Error).message || 'failed_to_connect');
    // This line will never be reached due to redirect, but TypeScript needs it
    throw error;
  }
};
