"use client";

import { useState, useTransition } from "react";
import { LikeButton } from "@/components/LikeButton";
import { IconReply } from "@/components/Icons";
import { timeAgo } from "@/lib/format";
import type { CommentRow } from "@/lib/types";
import { addComment, deleteComment, editComment, toggleCommentLike } from "../actions";

type Ctx = { postId: string; slug: string; viewerId: string; isOwner: boolean };
type Node = CommentRow & { children: Node[] };

function buildTree(rows: CommentRow[]): Node[] {
  const byId = new Map<string, Node>();
  rows.forEach((r) => byId.set(r.id, { ...r, children: [] }));
  const roots: Node[] = [];
  byId.forEach((n) => {
    const parent = n.parent_id ? byId.get(n.parent_id) : undefined;
    if (parent) parent.children.push(n);
    else roots.push(n);
  });
  return roots;
}

function Composer({
  ctx,
  parentId,
  placeholder,
  initial = "",
  onDone,
  submitLabel = "Post",
  editId,
}: {
  ctx: Ctx;
  parentId: string | null;
  placeholder: string;
  initial?: string;
  onDone?: () => void;
  submitLabel?: string;
  editId?: string;
}) {
  const [text, setText] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        start(async () => {
          const res = editId
            ? await editComment(editId, ctx.slug, text)
            : await addComment(ctx.postId, ctx.slug, text, parentId);
          if (res.error) return setError(res.error);
          setText("");
          onDone?.();
        });
      }}
      style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}
    >
      <label className="sr-only" htmlFor={`c-${parentId ?? editId ?? "new"}`}>{placeholder}</label>
      <textarea
        id={`c-${parentId ?? editId ?? "new"}`}
        className="textarea"
        style={{ minHeight: parentId || editId ? 90 : 120 }}
        placeholder={placeholder}
        value={text}
        maxLength={4000}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className="error" role="alert">{error}</p>}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" className="btn small" disabled={pending || !text.trim()}>
          {pending ? "Posting…" : submitLabel}
        </button>
        {onDone && (
          <button type="button" className="btn quiet small" onClick={onDone}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function CommentItem({ node, ctx, depth }: { node: Node; ctx: Ctx; depth: number }) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pending, start] = useTransition();
  const mine = node.user_id === ctx.viewerId;
  const byOwner = node.author?.role === "owner";
  const liked = node.comment_likes.some((l) => l.user_id === ctx.viewerId);
  const name = node.author?.display_name || "Member";

  return (
    <div id={`c-${node.id}`}>
      <article className={`card comment${byOwner ? " by-owner" : ""}`} aria-label={`Comment by ${name}`}>
        <div className="head">
          <span className="avatar sm">{name.slice(0, 1).toUpperCase()}</span>
          <span className="name">{name}</span>
          {byOwner && <span className="pill owner-badge">Sereya</span>}
          <span className="muted">
            {timeAgo(node.created_at)}
            {node.edited_at ? " · edited" : ""}
          </span>
        </div>
        {editing ? (
          <Composer ctx={ctx} parentId={null} editId={node.id} initial={node.body} placeholder="Edit your comment" submitLabel="Save" onDone={() => setEditing(false)} />
        ) : (
          <p className="text">{node.body}</p>
        )}
        <div className="tools">
          <LikeButton small liked={liked} count={node.comment_likes.length} onToggle={(like) => toggleCommentLike(node.id, ctx.slug, like)} />
          <button type="button" className="btn quiet small" onClick={() => setReplying((v) => !v)}>
            <IconReply /> Reply
          </button>
          {mine && !editing && (
            <button type="button" className="btn quiet small" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
          {(mine || ctx.isOwner) && (
            <button
              type="button"
              className="btn quiet small"
              disabled={pending}
              onClick={() => {
                if (!window.confirm("Delete this comment and its replies?")) return;
                start(async () => {
                  await deleteComment(node.id, ctx.slug);
                });
              }}
            >
              {pending ? "Deleting…" : "Delete"}
            </button>
          )}
        </div>
        {replying && (
          <Composer ctx={ctx} parentId={node.id} placeholder={`Reply to ${name}`} submitLabel="Reply" onDone={() => setReplying(false)} />
        )}
      </article>
      {node.children.length > 0 && (
        <div className="replies" style={depth >= 3 ? { marginLeft: 0, paddingLeft: 12 } : undefined}>
          {node.children.map((child) => (
            <CommentItem key={child.id} node={child} ctx={ctx} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Comments({ rows, ...ctx }: Ctx & { rows: CommentRow[] }) {
  const tree = buildTree(rows);
  return (
    <section aria-labelledby="talk" style={{ marginTop: 48 }}>
      <h2 id="talk" style={{ fontSize: 28, fontWeight: 500 }}>
        Conversation <span className="muted" style={{ fontSize: 20 }}>{rows.length}</span>
      </h2>
      <div className="card" style={{ padding: 20, margin: "18px 0 24px" }}>
        <Composer ctx={ctx} parentId={null} placeholder="What does this signal make you think of?" />
      </div>
      <div className="thread">
        {tree.length === 0 && <p className="muted">No comments yet. Start the conversation.</p>}
        {tree.map((n) => (
          <CommentItem key={n.id} node={n} ctx={ctx} depth={0} />
        ))}
      </div>
    </section>
  );
}
