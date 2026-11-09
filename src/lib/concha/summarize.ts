import "server-only";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Concha's writer: for sources that don't allow republishing, Claude reads the
 * original and writes up to three paragraphs in Sereya's own words. Runs only
 * when ANTHROPIC_API_KEY is set in Vercel; without it, posts keep the RSS
 * summary and the link.
 */

const MODEL = process.env.CONCHA_MODEL || "claude-haiku-5-5";

const SYSTEM = `You write for Sereya Tech, a trend research platform made in Brasil that reads technology, culture and the world outside the usual centres.

You get an article from another publication. Write a summary of it in your own words, in English, for readers who will not open the original.

- One to three paragraphs, each 2 to 4 sentences. Separate paragraphs with a blank line. No headings, no bullet points, no title.
- Say what the piece reports or argues: the main facts, who is involved, the numbers that matter, and why it matters.
- Stay faithful: no facts, opinions or conclusions that are not in the article. Do not add your own take.
- Rewrite, do not copy: no sentence taken from the article, and quote at most one short phrase in quotation marks, credited to whoever said it.
- Write "Brasil" with an S.
- If the text you got is not an article (a paywall notice, a cookie page, an error), reply with exactly SKIP.`;

let client: Anthropic | null = null;

export function canSummarize() {
  return !!process.env.ANTHROPIC_API_KEY;
}

export async function summarize(input: { title: string; source: string; text: string }): Promise<string | null> {
  if (!canSummarize()) return null;
  client ??= new Anthropic({ timeout: 40_000, maxRetries: 1 });
  const article = input.text.slice(0, 60_000);
  if (article.length < 400) return null;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    output_config: { effort: "low" },
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Publication: ${input.source}\nTitle: ${input.title}\n\n<article>\n${article}\n</article>`,
      },
    ],
  });
  if (response.stop_reason === "refusal" || response.stop_reason === "max_tokens") return null;

  const text = response.content
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();
  if (!text || text === "SKIP") return null;
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/^#+\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 3)
    .join("\n\n");
}
