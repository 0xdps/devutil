import { useEffect, useRef, useState } from 'react'

type Option<T extends string> = {
  value: T
  label: string
  icon?: string
}

interface CustomSelectProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: Option<T>[]
  placeholder?: string
}

export default function CustomSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder = 'Select...',
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = options.find((opt) => opt.value === value)

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-4 py-2.5 border border-dark-border rounded-lg bg-dark-card text-white flex items-center justify-between shadow-sm hover:border-primary-500/60 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-colors"
      >
        <span className="flex items-center gap-2">
          {current?.icon && <span className="text-lg">{current.icon}</span>}
          <span className="text-sm">{current?.label ?? placeholder}</span>
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-dark-card border border-dark-border rounded-lg shadow-soft-xl max-h-64 overflow-y-auto animate-slide-down">
          {options.map((opt) => {
            const isActive = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-400 border-l-2 border-primary-500'
                    : 'text-gray-300 hover:bg-dark-100 hover:text-white'
                }`}
              >
                {opt.icon && <span className="text-lg">{opt.icon}</span>}
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
