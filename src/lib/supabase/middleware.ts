import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Refreshes the auth cookie on every request so Server Components see a fresh session. */
export async function updateSession(request: NextRequest, headers?: Headers) {
  const next = () => (headers ? NextResponse.next({ request: { headers } }) : NextResponse.next({ request }));
  let response = next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          if (headers) cookiesToSet.forEach(({ name, value }) => setCookieHeader(headers, name, value));
          response = next();
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  await supabase.auth.getUser();
  return response;
}

/** Keeps a rewritten request's cookie header in step with refreshed auth cookies. */
function setCookieHeader(headers: Headers, name: string, value: string) {
  const parts = (headers.get("cookie") || "")
    .split(/;\s*/)
    .filter((c) => c && !c.startsWith(`${name}=`));
  parts.push(`${name}=${value}`);
  headers.set("cookie", parts.join("; "));
}
