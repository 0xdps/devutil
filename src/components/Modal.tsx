import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Your Privacy Matters
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <span className="text-primary-600 dark:text-primary-400 font-semibold">devutil.xyz</span> is committed to protecting your privacy. All tools on this platform run entirely in your browser.
        </p>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          🔒 100% Client-Side Processing
        </h4>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
          <li>No data is sent to any server</li>
          <li>All conversions happen locally in your browser</li>
          <li>Your sensitive information never leaves your device</li>
          <li>No tracking or analytics on your data</li>
        </ul>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          📊 Analytics
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We may use privacy-respecting analytics to understand how users interact with the site (page views, feature usage), but never to track or store your actual data.
        </p>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          🍪 Cookies
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We use minimal cookies only for essential functionality like theme preferences. No third-party tracking cookies are used.
        </p>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          🔓 Open Source
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          This project is open source. You can review the code on{' '}
          <a
            href="https://github.com/devendrapratap02/devutil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            GitHub
          </a>{' '}
          to verify our privacy claims.
        </p>
      </div>
    </Modal>
  )
}

export function SupportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Support & Contribution">
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Help Make <span className="text-primary-600 dark:text-primary-400 font-semibold">devutil.xyz</span> Better
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <span className="text-primary-600 dark:text-primary-400 font-semibold">devutil.xyz</span> is an open-source project built with ❤️ for the developer community. Your support and contributions are welcome!
        </p>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          💻 Contribute Code
        </h4>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
          <li>Fork the repository on GitHub</li>
          <li>Add new tools or improve existing ones</li>
          <li>Fix bugs or enhance UI/UX</li>
          <li>Submit pull requests</li>
        </ul>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          🐛 Report Issues
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Found a bug or have a feature request? Open an issue on our{' '}
          <a
            href="https://github.com/devendrapratap02/devutil/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            GitHub Issues
          </a>{' '}
          page.
        </p>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          ⭐ Star on GitHub
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you find <span className="text-primary-600 dark:text-primary-400 font-semibold">devutil.xyz</span> useful, consider giving it a star on{' '}
          <a
            href="https://github.com/devendrapratap02/devutil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            GitHub
          </a>
          . It helps others discover the project!
        </p>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          💬 Spread the Word
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Share <span className="text-primary-600 dark:text-primary-400 font-semibold">devutil.xyz</span> with your colleagues and on social media to help more developers discover these free tools.
        </p>

        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
          📧 Contact
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          Have questions or suggestions? Reach out via{' '}
          <a
            href="https://github.com/devendrapratap02"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </Modal>
  )
}
