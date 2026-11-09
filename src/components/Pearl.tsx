/** The thin-line 3D pearl with orbiting rings, from the approved "Good morning" band. */
export function Pearl({ size = 200 }: { size?: number }) {
  return (
    <svg className="pearl" width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="pearl-fill" cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#f5f3fa" />
          <stop offset="0.75" stopColor="#e2daf2" />
          <stop offset="1" stopColor="#d6e8f5" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="46" fill="url(#pearl-fill)" stroke="#8c7fb0" strokeWidth="0.8" />
      <ellipse cx="100" cy="100" rx="46" ry="14" fill="none" stroke="#8c7fb0" strokeWidth="0.5" opacity="0.5" />
      <ellipse cx="100" cy="100" rx="14" ry="46" fill="none" stroke="#8c7fb0" strokeWidth="0.5" opacity="0.5" />
      <ellipse cx="86" cy="84" rx="12" ry="7" fill="#ffffff" opacity="0.9" transform="rotate(-30 86 84)" />
      <g className="orbit">
        <ellipse cx="100" cy="100" rx="88" ry="26" fill="none" stroke="#5b4a9e" strokeWidth="0.7" opacity="0.55" transform="rotate(-18 100 100)" />
        <circle cx="185" cy="80" r="3" fill="#b9a5ee" />
      </g>
      <g className="orbit b">
        <ellipse cx="100" cy="100" rx="78" ry="34" fill="none" stroke="#7fc9b5" strokeWidth="0.7" opacity="0.6" transform="rotate(32 100 100)" />
        <circle cx="34" cy="62" r="2.5" fill="#7fc9b5" />
      </g>
      <g className="orbit c">
        <ellipse cx="100" cy="100" rx="94" ry="18" fill="none" stroke="#e39aaa" strokeWidth="0.6" opacity="0.55" transform="rotate(70 100 100)" />
        <circle cx="128" cy="190" r="2.5" fill="#e39aaa" />
      </g>
    </svg>
  );
}
