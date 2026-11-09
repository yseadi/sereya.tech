import Link from "next/link";
import { requireOwner } from "@/lib/auth";
import { PostForm } from "../PostForm";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  await requireOwner();
  return (
    <div className="wrap narrow">
      <Link href="/studio" className="muted" style={{ fontSize: 15 }}>← Studio</Link>
      <h1 style={{ fontSize: 40, fontWeight: 500, margin: "12px 0 24px" }}>New signal</h1>
      <PostForm />
    </div>
  );
}
