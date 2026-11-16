import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/** Subdomains that open the birthday invite (festa.sereya.tech and friends). */
const FESTA_SUBDOMAINS = ["festa", "aniver", "yas"];

export async function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const sub = host.split(".")[0];
  const onFestaHost = FESTA_SUBDOMAINS.includes(sub) && host.split(".").length > 2;
  const path = request.nextUrl.pathname;
  const onFestaPath = path === "/festa" || path.startsWith("/festa/");

  if (onFestaHost || onFestaPath) {
    // The root layout reads this header to drop the Sereya menu and footer.
    const headers = new Headers(request.headers);
    headers.set("x-festa", "1");
    if (onFestaHost && !onFestaPath && !path.startsWith("/api/")) {
      const url = request.nextUrl.clone();
      url.pathname = path === "/" ? "/festa" : `/festa${path}`;
      return NextResponse.rewrite(url, { request: { headers } });
    }
    if (path.startsWith("/festa/lista")) return updateSession(request, headers);
    return NextResponse.next({ request: { headers } });
  }
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sources/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
