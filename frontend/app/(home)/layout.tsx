import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Head from 'next/dist/shared/lib/head'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Home | The Stat Diary</title>
                <meta name="description" content="Welcome to the blog" />
            </Head>
            <div>
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    )
}

