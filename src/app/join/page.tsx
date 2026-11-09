import { redirect } from "next/navigation";
import { firstName, getViewer } from "@/lib/auth";
import { JoinFlow } from "./JoinFlow";

export const metadata = { title: "Join" };

export default async function JoinPage() {
  const { user, profile } = await getViewer();
  if (user && profile?.onboarded) redirect("/");
  return (
    <div className="wrap">
      <JoinFlow
        signedIn={!!user}
        name={firstName(profile)}
        inviteRequired={Boolean(process.env.INVITE_CODE?.trim())}
        initialCategories={profile?.categories ?? []}
        initialRegions={profile?.regions ?? []}
      />
    </div>
  );
}
