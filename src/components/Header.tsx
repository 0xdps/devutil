import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm w-full">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-3">
                        <Logo className="w-8 h-8" />
                        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            devutil.xyz
                        </h1>
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <a
                            href="https://github.com/devendrapratap02/devutil"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    )
}
