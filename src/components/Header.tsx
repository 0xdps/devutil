import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Logo from './Logo'
import { PrivacyModal, SupportModal } from './Modal'

export default function Header() {
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
                            <button
                                onClick={handlePrivacyOpen}
                                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                Privacy
                            </button>
                            <button
                                onClick={handleSupportOpen}
                                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                Support
                            </button>
                            <a
                                href="https://github.com/devendrapratap02/devutil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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
