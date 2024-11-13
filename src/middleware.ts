import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error("Middleware error:", error);
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/callback/auth (auth callback endpoints)
     * - public assets (images, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/callback/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
