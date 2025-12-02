import { ReactNode, useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
    children: ReactNode
}

const SIDEBAR_STORAGE_KEY = 'devutil-sidebar-open'

export default function Layout({ children }: LayoutProps) {
    // Load persisted sidebar state or default based on screen size
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window === 'undefined') return false
        
        // Check localStorage first
        const persisted = localStorage.getItem(SIDEBAR_STORAGE_KEY)
        if (persisted !== null) {
            return persisted === 'true'
        }
        
        // Default: open on desktop, closed on mobile
        return window.innerWidth >= 768
    })

    // Force dark mode and persist sidebar state changes
    useEffect(() => {
        // Force dark mode
        document.documentElement.classList.add('dark')
    }, [])

    // Persist sidebar state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isSidebarOpen))
    }, [isSidebarOpen])

    return (
        <div className="h-screen bg-dark-bg flex flex-col overflow-hidden">
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col min-h-0">
                    <main className="flex-1 py-4 md:py-6 px-2 md:px-4 overflow-auto">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
