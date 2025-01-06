import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the URL is the root path and redirect to /km
    if (pathname === '/') {
        //console.log("Redirecting to /km...");
        return NextResponse.redirect(new URL('/km', request.url));
    }

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
    matcher: ["/test/all","/", "/test/personality", "/test/skill", "/test/learningStyle", "/test/value", "/test/interest", "/test-result/:path*", "/profile-about-user", "/profile-quiz-history", "/profile-draft", "/chat-with-ai"]
};
