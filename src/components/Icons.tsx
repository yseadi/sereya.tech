/* Thin-line icons. Each section's icon matches its header animation idea:
   bubbles for Home, sonar rings for Signals, speech for Community, spiral for Studio. */
type P = { size?: number };
const base = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true,
});

export const IconHome = ({ size = 20 }: P) => (
  <svg {...base(size)}><circle cx="9" cy="15" r="5" /><circle cx="17" cy="8" r="3" /><circle cx="18.5" cy="17.5" r="1.5" /></svg>
);
export const IconSignals = ({ size = 20 }: P) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="2" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" /></svg>
);
export const IconCommunity = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2v2.5L17 18h-4" /></svg>
);
export const IconStudio = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M12 12a1.5 1.5 0 1 1 1.5 1.5A3 3 0 1 1 16.5 10.5 4.5 4.5 0 1 1 12 6a6 6 0 1 1-6 6" /></svg>
);
export const IconHeart = ({ size = 18, filled = false }: P & { filled?: boolean }) => (
  <svg {...base(size)} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const IconReply = ({ size = 16 }: P) => (
  <svg {...base(size)}><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 6 6v4" /></svg>
);
export const IconComment = ({ size = 16 }: P) => (
  <svg {...base(size)}><path d="M4 5h16v11H9l-5 4z" /></svg>
);
export const IconGlossary = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" /><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19" /><circle cx="12" cy="10" r="2.5" /></svg>
);
