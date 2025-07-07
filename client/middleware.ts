import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_ROUTES = ["/", "/login", "/register", "/about"];

console.log("🚀 Middleware loaded");

export function middleware(request: NextRequest) {
  console.log("🔍 Middleware fired for:", request.nextUrl.pathname);

  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    console.log("🟢 Public route, continuing...");
    return NextResponse.next();
  }

  const token = request.cookies.get("syncspace_token")?.value;

  if (!token) {
    console.log("🚫 No token, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    console.log("✅ Valid token, allowing access");
    return NextResponse.next();
  } catch {
    console.log("❌ Invalid token, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}


export const config = {
  matcher: ["/:path*"], // Match everything for now
};
