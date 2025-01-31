import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ message: "No authorization code provided" }, { status: 400 });
    }

    const externalApiUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/google`;
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(
        { message: errorResponse.message || "External API error" },
        { status: response.status }
      );
    }

    const { access_token, refresh_token } = (await response.json()).payload;

    if (!access_token || !refresh_token) {
      return NextResponse.json({ message: "Invalid token response" }, { status: 500 });
    }

    // Set refresh token as a cookie
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "normplov-refresh-token";
    const serializedCookie = serialize(cookieName, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json(
      { accessToken: access_token },
      {
        headers: { "Set-Cookie": serializedCookie }, // Do not set Authorization header here
      }
    );
  } catch (error) {
    console.error("Unexpected error in auth callback:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
