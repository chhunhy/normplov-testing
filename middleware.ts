import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAppSelector } from "./redux/hooks";
import { makeStore } from "./redux/store";
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // const url = request.url;

    // // Get language prefix from the URL
    // const urlSegments = new URL(url).pathname.split('/');
    // const languageInUrl = urlSegments[1]; // Language should be the second part of the URL

    // // If no language in the URL and cookie is missing, default to 'km'
    // const language = request.cookies.get('language');

    // if (!language) {
    //     // If no language is set, check if the URL contains a valid language prefix
    //     if (!languageInUrl || (languageInUrl !== 'en' && languageInUrl !== 'km')) {
    //         // If no valid language in URL, redirect to '/km' and set the cookie
    //         const res = NextResponse.redirect(new URL('/km', url));
    //         res.cookies.set('language', 'km', { path: '/' }); // Set default language in cookie
    //         return res;
    //     } else {
    //         // If valid language in URL, set it in the cookie
    //         const res = NextResponse.next();
    //         res.cookies.set('language', languageInUrl, { path: '/' });
    //         return res;
    //     }
    // }

    // Check if the URL is the root path and redirect to /km
    if (pathname === '/') {
        const response = NextResponse.redirect(new URL('/km', request.url));
        return response;
    }


  // Check for refresh token or any other condition if needed
  const refreshToken = request.cookies.get("normplov-refresh-token");

    if (!refreshToken) {
        console.log("No refresh token found, redirecting to login...");
        return NextResponse.redirect(new URL('/km/login', request.url));
    }

  console.log("Refresh token found, allowing request...");

  return NextResponse.next();
}

// Apply the middleware to the necessary routes
export const config = {
    matcher: ["/:lang/test/all", "/", "/:lang/test/personality", "/:lang/test/skill", "/:lang/test/learningStyle", "/:lang/test/value", "/:lang/test/interest", "/test-result/:path*", "/:lang/profile-about-user", "/:lang/profile-quiz-history", "/:lang/profile-draft", "/:lang/chat-with-ai"]
};
