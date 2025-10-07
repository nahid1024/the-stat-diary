import React from 'react'
import CategoryFilter from '@/components/CategoryFilter';
import Cards from '@/components/cards';
import { getPosts } from '@/lib/strapi';

export default async function page({ params }: { params: Promise<{ name: string }> }) {
    const name = (await params).name;
    const posts = await getPosts("category", name);
    return (
        <>
            <main className="min-h-screen text-gray-900">

                {/* Blog Section */}
                <section className="max-w-6xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold mb-6">{`All posts in "${name}" category`}</h1>

                    {/* Categories */}
                    <CategoryFilter />

                    {/* Cards */}
                    <Cards OtherPosts={posts} />

                </section>
            </main>
        </>
    )
}
