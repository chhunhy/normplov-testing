import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAppSelector } from "./redux/hooks";
import { makeStore } from "./redux/store";
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();
  //const locale = useParams()

  // Check if the URL is the root path and redirect to /km
  //if (pathname === "/") {
    //console.log("Redirecting to /km...");
   // return NextResponse.redirect(new URL("/km", request.url));
  //}

  const supportedLocales = ["km", "en"];
  const defaultLocale = "km"; // Default locale

  // Retrieve locale from the path
  const localeFromPath = pathname.split("/")[1];

  // Check if the locale is missing or invalid
  if (!supportedLocales.includes(localeFromPath)) {
    // Retrieve locale from cookies or use default
    const localeFromCookie =
      request.cookies.get("locale")?.value || defaultLocale;

    // Redirect to the correct locale
    url.pathname = `/${localeFromCookie}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Save the locale to cookies for future requests
  const response = NextResponse.next();
  response.cookies.set("locale", localeFromPath, { path: "/" });

  // Check for refresh token or any other condition if needed
  const refreshToken = request.cookies.get("normplov-refresh-token");

  if (!refreshToken) {
    console.log("No refresh token found, redirecting to login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Refresh token found, allowing request...");

  return NextResponse.next();
}

// Apply the middleware to the necessary routes
export const config = {
  matcher: [
    "/",
    "/test/all",
    "/test/personality",
    "/test/skill",
    "/test/learningStyle",
    "/test/value",
    "/test/interest",
    "/test-result/:path*",
    "/profile-about-user",
    "/profile-quiz-history",
    "/profile-draft",
    "/chat-with-ai",
  ],
};
