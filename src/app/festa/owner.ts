import "server-only";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/auth";

/** The answers list is Yasmim's only. Login lives on the main site, so visitors are sent there. */
export async function requireFestaOwner() {
  const viewer = await getViewer();
  if (!viewer.user || viewer.profile?.role !== "owner") {
    const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://sereya.tech").replace(/\/$/, "");
    redirect(`${site}/login?next=${encodeURIComponent("/festa/lista")}`);
  }
  return { ...viewer, user: viewer.user!, profile: viewer.profile! };
}
