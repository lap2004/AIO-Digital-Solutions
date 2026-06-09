/** Compact flag icons (inline SVG, no external assets). */

export function FlagVN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Tiếng Việt">
      <rect width="30" height="20" fill="#DA251D" />
      <path
        fill="#FF0"
        d="M15,4 L16.35,8.15 L20.71,8.15 L17.18,10.71 L18.53,14.85 L15,12.29 L11.47,14.85 L12.82,10.71 L9.29,8.15 L13.65,8.15 Z"
      />
    </svg>
  );
}

export function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="English">
      <clipPath id="gb-clip">
        <rect width="30" height="20" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="30" height="20" fill="#012169" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="2" />
        <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
        <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.5" />
      </g>
    </svg>
  );
}
