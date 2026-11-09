import { Pearl } from "@/components/Pearl";

/** Shown while the next page loads: the pearl floats and bubbles rise. */
const BUBBLES = [
  [8, 14, 7], [18, 8, 5.5], [27, 20, 8.5], [39, 10, 6], [48, 16, 7.5],
  [58, 7, 5], [66, 22, 9], [75, 12, 6.5], [84, 18, 8], [92, 9, 5.8],
];

export default function Loading() {
  return (
    <div className="wrap">
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="bubbles" aria-hidden="true">
          {BUBBLES.map(([left, size, dur], i) => (
            <i key={i} style={{ left: `${left}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${(i * 0.37) % 3}s` }} />
          ))}
        </div>
        <Pearl size={160} />
        <p>
          Diving for pearls<span>.</span><span>.</span><span>.</span>
        </p>
      </div>
    </div>
  );
}
