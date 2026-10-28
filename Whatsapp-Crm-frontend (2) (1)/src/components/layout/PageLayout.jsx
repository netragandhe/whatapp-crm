import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import useAppStore from '../../store/useStore'
import { cn } from '../../lib/utils'
import { useLocation } from 'react-router-dom'

const PageLayout = ({ children }) => {
    const { sidebarCollapsed } = useAppStore()
    const location = useLocation()
    const isChatPage = location.pathname.includes('/inbox')

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
            <Sidebar />
            
            <div className={cn(
                "flex-1 flex flex-col min-w-0 transition-all duration-500",
                sidebarCollapsed ? "md:ml-20" : "md:ml-64"
            )}>
                <Navbar />
                
                <main className={cn(
                    "flex-1 flex flex-col pt-16 overflow-hidden",
                    !isChatPage && "overflow-y-auto"
                )}>
                    {isChatPage ? (
                        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            {children}
                        </div>
                    ) : (
                        <div className="max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
                            {children}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default PageLayout
