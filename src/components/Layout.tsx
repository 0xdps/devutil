import { ReactNode, useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Open sidebar by default on desktop after hydration
    useEffect(() => {
        const checkScreenSize = () => {
            // Check if window is available (client-side only)
            if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                setIsSidebarOpen(true)
            }
        }
        
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col min-h-0">
                    <main className="flex-1 p-4 md:p-6 overflow-auto">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
