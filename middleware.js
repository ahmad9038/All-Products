import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    // Redirect to '/adminLogin' if authToken is not present
    return NextResponse.redirect(new URL("/adminLogin", request.url));
  } else {
    // Redirect to '/meranameadminha' if authToken is present
    return NextResponse.next();
  }
}

export const config = {
  // Define the routes that this middleware should apply to
  matcher: [
    "/meranameadminha",
    "/api/deleteProduct",
    "/api/createProduct",
    "/api/updateProduct",
  ],
};
