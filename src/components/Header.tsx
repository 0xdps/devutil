import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Logo from './Logo'
import { PrivacyModal, SupportModal } from './Modal'

interface HeaderProps {
    onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
    const [isSupportOpen, setIsSupportOpen] = useState(false)

    useEffect(() => {
        // Check query params on mount and when they change
        if (searchParams.get('modal') === 'privacy') {
            setIsPrivacyOpen(true)
        } else if (searchParams.get('modal') === 'support') {
            setIsSupportOpen(true)
        }
    }, [searchParams])

    const handlePrivacyClose = () => {
        setIsPrivacyOpen(false)
        // Remove query param when closing
        if (searchParams.get('modal') === 'privacy') {
            searchParams.delete('modal')
            setSearchParams(searchParams)
        }
    }

    const handleSupportClose = () => {
        setIsSupportOpen(false)
        // Remove query param when closing
        if (searchParams.get('modal') === 'support') {
            searchParams.delete('modal')
            setSearchParams(searchParams)
        }
    }

    const handlePrivacyOpen = () => {
        setIsPrivacyOpen(true)
        setSearchParams({ modal: 'privacy' })
    }

    const handleSupportOpen = () => {
        setIsSupportOpen(true)
        setSearchParams({ modal: 'support' })
    }

    return (
        <>
            <header className="bg-white dark:bg-gray-800 shadow-sm w-full sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
                <div className="pl-4 pr-4 sm:pr-6 lg:pr-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            {/* Hamburger menu button */}
                            <button
                                onClick={onMenuClick}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <Link to="/" className="flex items-center gap-2">
                                <Logo className="w-8 h-8" />
                                <h1 className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                                    Developer Utilities Tool
                                </h1>
                            </Link>
                        </div>

                        <nav className="flex items-center space-x-2 sm:space-x-4">
                            <button
                                onClick={handlePrivacyOpen}
                                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                Privacy
                            </button>
                            <button
                                onClick={handleSupportOpen}
                                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                Support
                            </button>
                            <a
                                href="https://github.com/0xdps/devutil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                GitHub
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            <PrivacyModal 
                isOpen={isPrivacyOpen} 
                onClose={handlePrivacyClose} 
            />
            <SupportModal 
                isOpen={isSupportOpen} 
                onClose={handleSupportClose} 
            />
        </>
    )
}
