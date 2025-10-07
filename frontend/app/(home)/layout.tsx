import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
