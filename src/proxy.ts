import createMiddleware from "next-intl/middleware"
import { localePrefix, routing } from "@/src/i18n/routing"
import { auth } from "@/auth"
import { BASE_PATH } from "./lib/routes"

const publicPages = ["/", "/login", "/error"]

const intlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales: routing.locales,
	localePrefix: localePrefix,
	// Used when no locale matches
	defaultLocale: "en",
})

export default auth(req => {
	const publicPathnameRegex = RegExp(
		`^(/(${routing.locales.join("|")}))?(${publicPages.flatMap(p => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
		"i"
	)

	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

	// for public pages, pass through intlMiddleware
	if (isPublicPage || req.auth) {
		return intlMiddleware(req)
	}

	// user is not logged in, redirect to login page
	// we modify the pathname to the login page, and pass through intlMiddleware, so that the locale is preserved
	console.log("authentication required for page:", req.nextUrl.pathname)
	req.nextUrl.pathname = BASE_PATH + "/login"
	return intlMiddleware(req)
})

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
}
