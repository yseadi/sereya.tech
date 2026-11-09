export type CategoryKey = "res" | "zei" | "bio" | "art" | "geo";
export type Format = "News" | "Essay" | "Report";
export type Plan = "free" | "member" | "founding";

export interface Profile {
  id: string;
  display_name: string;
  bio: string;
  role: "owner" | "member";
  categories: CategoryKey[];
  regions: string[];
  plan_interest: Plan | null;
  billing_interest: "month" | "year" | null;
  onboarded: boolean;
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
  category: CategoryKey;
  format: Format;
  tags: string[];
  status: "draft" | "published";
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
  author: { id: string; display_name: string; role: "owner" | "member" } | null;
  comment_likes: { user_id: string }[];
}
