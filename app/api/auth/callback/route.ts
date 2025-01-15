// import { serialize } from "cookie";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { code } = await req.json();
//     console.log("Callback API Request:", { code });

//     if (!code) {
//       return NextResponse.json({ message: "No code provided" }, { status: 400 });
//     }

//     const externalApiUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/google`;
//     console.log("External API URL:", externalApiUrl);

//     // Send the code to the external API
//     const response = await fetch(externalApiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ code }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("External API Error:", errorData);
//       return NextResponse.json(
//         { message: errorData.detail || "Failed to authenticate" },
//         { status: response.status }
//       );
//     }

//     const responseData = await response.json();
//     console.log("External API Response Data:", responseData);

//     // Extract tokens and user information
//     const { payload } = responseData;
//     console.log("pal",responseData)
//     const { user } = payload || {};
//     const { access_token, refresh_token, token_type, ...userDetails } = user || {};

//     if (!access_token || !refresh_token) {
//       return NextResponse.json(
//         { message: "Invalid token response from the external API" },
//         { status: 500 }
//       );
//     }

//     console.log("Tokens and User Data:", { access_token, refresh_token, userDetails });

//     // Set the refresh token in an HTTP-only cookie
//     const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
//     const serializedCookie = serialize(cookieName, refresh_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       sameSite: "lax",
//     });

//     // Return access token and user details in the response
//     return NextResponse.json(
//       {
//         accessToken: access_token,
//         user: userDetails,
//         tokenType: token_type,
//         message: responseData.message || "Authentication successful",
//       },
//       {
//         status: 200,
//         headers: {
//           "Set-Cookie": serializedCookie,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Callback API Error:", error);
//     return NextResponse.json(
//       { message: error instanceof Error ? error.message : "Unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }

import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ message: "No code provided" }, { status: 400 });
    }

    const externalApiUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/auth/google`;

    // Send the code to the external API
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to authenticate" },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    // Extract tokens and user information
    const { payload } = responseData;
    const { access_token, refresh_token, token_type } = payload;

    if (!access_token || !refresh_token) {
      return NextResponse.json(
        { message: "Invalid token response from the external API" },
        { status: 500 }
      );
    }

    // Set the refresh token in an HTTP-only cookie
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const serializedCookie = serialize(cookieName, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    // Return access token and user details in the response
    return NextResponse.json(
      {
        accessToken: access_token,
        tokenType: token_type,
        message: responseData.message || "Authentication successful",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": serializedCookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
}

