import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const popularTools = [
    { name: "JSON to CSV Transform", path: "/data-transform", icon: "🔄" },
    { name: "Base64 Encoder/Decoder", path: "/encoding", icon: "🔐" },
    { name: "JWT Decoder", path: "/jwt-decoder", icon: "🔑" },
    { name: "Text Utilities", path: "/text-utilities", icon: "📝" },
    { name: "Hash Generator", path: "/hash-verify", icon: "🔒" },
    { name: "QR Code Generator", path: "/qr-code", icon: "📱" },
  ];

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Developer Utilities Tool</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
        <link rel="canonical" href="https://devutil.codes/" />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-[120px] font-bold text-primary-600 dark:text-primary-400 leading-none animate-bounce">
              404
            </div>
            <div className="text-6xl mt-4 animate-pulse">🔍</div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you're looking for seems to have gone on vacation.
            Maybe it's exploring our other awesome tools?
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              🏠 Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              ← Go Back
            </button>
          </div>

          {/* Popular Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              🔥 Popular Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {popularTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-600 rounded-lg transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
            If you believe this is a mistake, please{" "}
            <a
              href="https://github.com/0xdps/devutil/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              report an issue
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
