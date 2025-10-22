export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="20" fill="#0ea5e9" />
      <path
        d="M30 35 L30 65 L45 50 L30 35 Z"
        fill="white"
      />
      <path
        d="M70 35 L70 65 L55 50 L70 35 Z"
        fill="white"
      />
      <rect x="42" y="47" width="16" height="6" rx="3" fill="white" />
    </svg>
  )
}
