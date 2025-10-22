interface ComingSoonProps {
  title: string
  description: string
  icon: string
  features?: string[]
}

export default function ComingSoon({ title, description, icon, features }: ComingSoonProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        <div className="text-8xl mb-6">{icon}</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {description}
        </p>
        
        <div className="inline-flex items-center px-6 py-3 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg">
          <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
            Coming Soon
          </span>
        </div>

        {features && features.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Planned Features
            </h2>
            <ul className="space-y-3 text-left max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            This feature is currently under development. Check back soon!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
