import { requireMember } from "@/lib/auth";
import { logOut } from "../auth/actions";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { user, profile } = await requireMember("/settings");
  return (
    <div className="wrap narrow">
      <p className="eyebrow">Settings</p>
      <h1 style={{ fontSize: 44, fontWeight: 500, margin: "6px 0 24px" }}>Your Sereya</h1>
      <SettingsForm
        email={user.email ?? ""}
        name={profile.display_name}
        bio={profile.bio}
        categories={profile.categories}
        regions={profile.regions}
        role={profile.role}
      />
      <form action={logOut} style={{ marginTop: 24 }}>
        <button type="submit" className="btn ghost">Log out</button>
      </form>
    </div>
  );
}
