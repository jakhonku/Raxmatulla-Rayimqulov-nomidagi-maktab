import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * /admin/* sahifalarini himoyalaydi. Login sahifasi bundan mustasno.
 * (Protects /admin/* routes; the login page is excluded.)
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login sahifasi va auth API ochiq
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
