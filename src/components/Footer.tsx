import { useState, useEffect } from 'react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024) // Default year for SSR

  // Set actual year after hydration
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-dark-card border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-gray-400 text-center">
          © {currentYear} <span className="text-primary-400 font-semibold">Developer Utilities Tool</span> — All rights reserved. Powered by{' '}
          <a
            href="https://0xdps.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            0xdps
          </a>
        </p>
      </div>
    </footer>
  )
}
