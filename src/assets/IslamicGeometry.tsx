export function IslamicGeometryBackdrop({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="text-primary" cx="400" cy="400" r="350" stroke="currentColor" strokeWidth="2" />
      <circle className="text-primary" cx="400" cy="400" r="240" stroke="currentColor" strokeWidth="1.5" />
      <rect
        className="text-primary"
        height="300"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(45 400 400)"
        width="300"
        x="250"
        y="250"
      />
      <rect
        className="text-primary"
        height="300"
        stroke="currentColor"
        strokeWidth="1.5"
        width="300"
        x="250"
        y="250"
      />
      <path
        className="text-primary"
        d="M400 50 L400 750 M50 400 L750 400"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function IslamicGeometryAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
      <circle cx="50" cy="50" fill="none" r="28" stroke="currentColor" strokeWidth="2" />
      <path d="M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

