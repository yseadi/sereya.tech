export type CategoryKey = "res" | "zei" | "bio" | "art" | "geo";
export type Format = "News" | "Essay" | "Report";

export interface Profile {
  id: string;
  display_name: string;
  bio: string;
  role: "owner" | "member";
  categories: CategoryKey[];
  regions: string[];
  onboarded: boolean;
  avatar_url: string;
  created_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  dek: string;
  take: string;
  source_name: string;
  source_url: string;
  byline: string;
  image_url: string;
  pdf_url?: string;
  pdf_size?: number;
  category: CategoryKey;
  format: Format;
  tags: string[];
  status: "draft" | "published" | "caught" | "skipped";
  origin: "studio" | "concha";
  fit: number | null;
  matched: string[];
  caught_at: string | null;
  body: string;
  credit: string;
  is_pearl: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostWithCounts extends Post {
  post_likes: { count: number }[];
  comments: { count: number }[];
}

export interface CommentRow {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  body: string;
  created_at: string;
  edited_at: string | null;
  author: { id: string; display_name: string; role: "owner" | "member"; avatar_url?: string } | null;
  comment_likes: { user_id: string }[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  aliases: string[];
  definition: string;
  category: CategoryKey | null;
  image_url: string;
  published: boolean;
  updated_at: string;
}
