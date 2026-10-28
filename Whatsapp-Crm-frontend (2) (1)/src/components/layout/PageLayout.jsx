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
        <div className="flex h-screen bg-[#F4FBF6] text-[#26382E] overflow-hidden relative selection:bg-[#86D9A9] selection:text-[#26382E]">
            {/* Ambient Soft Mint Glow in Background */}
            <div className="fixed top-0 right-1/4 w-[600px] h-[300px] bg-gradient-to-br from-[#86D9A9]/10 via-[#A7E8C2]/8 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-0 left-1/3 w-[500px] h-[300px] bg-gradient-to-tr from-[#DDF7E8]/30 via-[#EDF8F0]/20 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

            <Sidebar />
            
            <div className={cn(
                "flex-1 flex flex-col min-w-0 transition-all duration-500 relative z-10",
                sidebarCollapsed ? "md:ml-20" : "md:ml-64"
            )}>
                <Navbar />
                
                <main className={cn(
                    "flex-1 flex flex-col pt-20 overflow-hidden",
                    !isChatPage && "overflow-y-auto"
                )}>
                    {isChatPage ? (
                        <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-2 sm:p-4">
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
