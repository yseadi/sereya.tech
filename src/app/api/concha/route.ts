import { NextResponse, type NextRequest } from "next/server";
import { runConcha } from "@/lib/concha/run";

// Vercel calls this every morning (see vercel.json) with the CRON_SECRET it keeps.
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  }
  const summary = await runConcha("schedule");
  return NextResponse.json(summary);
}
