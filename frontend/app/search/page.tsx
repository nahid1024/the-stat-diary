import React from 'react'
import { getSearchResult } from '@/lib/strapi'
import Cards from '@/components/cards'


export default async function page({ searchParams }: { searchParams: Promise<{ query: string }> }) {
    const query = (await searchParams).query;
    const posts = await getSearchResult(query);

    return (
        <main className="min-h-screen text-gray-900">

            {/* Blog Section */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-6">{`Results for "${query}"`}</h1>
                {/* Cards */}
                <Cards OtherPosts={posts} />
            </section>
        </main>
    )
}
