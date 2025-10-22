export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} <span className="text-primary-600 dark:text-primary-400 font-semibold">devutil.xyz</span> — All rights reserved. Powered by{' '}
          <a
            href="https://devendrapratap.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Devendra Pratap Singh
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
