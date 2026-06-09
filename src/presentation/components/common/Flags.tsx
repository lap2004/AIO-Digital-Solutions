/** Compact flag icons (inline SVG, no external assets). */

export function FlagVN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Tiếng Việt">
      <rect width="30" height="20" fill="#DA251D" />
      <path
        fill="#FF0"
        d="M15 4l1.76 5.42h5.7l-4.61 3.35 1.76 5.41L15 14.83l-4.61 3.35 1.76-5.41-4.61-3.35h5.7z"
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
