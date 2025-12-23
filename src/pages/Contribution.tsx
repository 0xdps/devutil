import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { toolsMetadata } from "../config/seoConfig";

const contributionWays = [
  {
    icon: "🐛",
    title: "Report Bugs",
    description:
      "Found a bug? Open an issue on GitHub with details about the problem, steps to reproduce, and your environment.",
  },
  {
    icon: "💡",
    title: "Suggest Features",
    description:
      "Have an idea for a new tool or improvement? We'd love to hear it! Open a feature request on GitHub.",
  },
  {
    icon: "🔧",
    title: "Submit Pull Requests",
    description:
      "Fix bugs, add features, or improve documentation. All contributions are welcome!",
  },
  {
    icon: "📝",
    title: "Improve Documentation",
    description:
      "Help make our docs clearer and more comprehensive. Good documentation helps everyone.",
  },
  {
    icon: "🎨",
    title: "Design & UX",
    description:
      "Suggest UI/UX improvements or contribute design assets to make the tools more user-friendly.",
  },
  {
    icon: "🌍",
    title: "Spread the Word",
    description:
      "Star the repo, share with friends, or write about it. Help others discover these tools!",
  },
];

const steps = [
  {
    step: 1,
    title: "Fork the Repository",
    description: "Start by forking the repository to your GitHub account.",
    code: "git clone https://github.com/0xdps/devutil-tools.git",
  },
  {
    step: 2,
    title: "Create a Branch",
    description: "Create a new branch for your feature or bug fix.",
    code: "git checkout -b feature/your-feature-name",
  },
  {
    step: 3,
    title: "Make Changes",
    description:
      "Make your changes and commit them with clear, descriptive messages.",
    code: 'git commit -m "Add: description of your changes"',
  },
  {
    step: 4,
    title: "Push & Create PR",
    description: "Push your changes and create a pull request for review.",
    code: "git push origin feature/your-feature-name",
  },
];

const guidelines = [
  "Follow the existing code style and conventions",
  "Write clear, descriptive commit messages",
  "Test your changes thoroughly before submitting",
  "Update documentation if needed",
  "Keep pull requests focused on a single feature or fix",
  "Be respectful and constructive in discussions",
];

export default function Contribution() {
  const meta = toolsMetadata.contribution || {
    title: "Contribute | Developer Utilities Tool",
    description:
      "Learn how to contribute to Developer Utilities Tool. Join our community and help make these tools better for everyone.",
    keywords: [
      "contribute",
      "open source",
      "github",
      "developer tools",
      "community",
    ],
    canonical: "/contribute",
    toolName: "Contribution Guide",
    toolDescription: "Guide to contributing to Developer Utilities Tool",
  };

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={meta.canonical}
        type="website"
        toolName={meta.toolName}
        toolDescription={meta.toolDescription}
      />
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contribute to Developer Utilities
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Help us build better tools for the developer community
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/0xdps/devutil-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
            <a
              href="https://github.com/0xdps/devutil-tools/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Report an Issue
            </a>
          </div>
        </div>

        {/* Ways to Contribute */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Ways to Contribute
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributionWays.map((way) => (
              <div
                key={way.title}
                className="p-5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
              >
                <span className="text-3xl mb-3 block">{way.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {way.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {way.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Getting Started
          </h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-500 text-white font-bold rounded-full mr-4">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {item.description}
                  </p>
                  <code className="block px-3 py-2 bg-gray-100 dark:bg-gray-900 text-sm text-primary-400 rounded font-mono overflow-x-auto">
                    {item.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contribution Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Contribution Guidelines
          </h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <ul className="space-y-3">
              {guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {guideline}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "React", icon: "⚛️" },
              { name: "TypeScript", icon: "📘" },
              { name: "Vite", icon: "⚡" },
              { name: "Tailwind CSS", icon: "🎨" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
              >
                <span className="text-2xl mb-2 block">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-lg border border-primary-500/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Contribute?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your contributions help make Developer Utilities Tool better for
            everyone!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/0xdps/devutil-tools/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
            >
              Fork Repository
            </a>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
            >
              Explore Tools
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
