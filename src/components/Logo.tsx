export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#080d24" />
          <stop offset="100%" stopColor="#0d1b3e" />
        </linearGradient>
        <linearGradient id="logo-accent" x1="100" y1="256" x2="420" y2="256" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <linearGradient id="logo-shine" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#logo-bg)" />
      <rect width="512" height="80" rx="112" fill="url(#logo-shine)" />
      <circle cx="138" cy="163" r="20" fill="#ff5f57" />
      <circle cx="210" cy="163" r="20" fill="#febc2e" />
      <circle cx="282" cy="163" r="20" fill="#28c840" />
      <rect x="60" y="198" width="392" height="1.5" fill="#1e3660" opacity="0.9" />
      <path
        d="M112 265 L188 326 L112 387"
        stroke="url(#logo-accent)"
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="214" y="358" width="88" height="24" rx="12" fill="url(#logo-accent)" />
    </svg>
  )
}
