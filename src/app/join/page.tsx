import { redirect } from "next/navigation";
import { firstName, getViewer } from "@/lib/auth";
import { JoinFlow } from "./JoinFlow";

export const metadata = { title: "Join" };

type Props = { searchParams: Promise<{ next?: string; from?: string }> };

export default async function JoinPage({ searchParams }: Props) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" && /^\/(?!\/)/.test(sp.next) ? sp.next : "";
  const { supabase, user, profile } = await getViewer();
  if (user && profile?.onboarded) redirect(next || "/");
  let cluster: { slug: string; name: string } | null = null;
  if (typeof sp.from === "string" && /^[a-z0-9][a-z0-9-]{2,90}$/.test(sp.from)) {
    const { data } = await supabase.rpc("cluster_by_slug", { p_slug: sp.from });
    if (data) cluster = { slug: data.slug, name: data.name };
  }
  return (
    <div className="wrap">
      <JoinFlow
        signedIn={!!user}
        name={firstName(profile)}
        inviteRequired={Boolean(process.env.INVITE_CODE?.trim()) && !cluster}
        next={next}
        cluster={cluster}
        initialCategories={profile?.categories ?? []}
        initialRegions={profile?.regions ?? []}
      />
    </div>
  );
}
