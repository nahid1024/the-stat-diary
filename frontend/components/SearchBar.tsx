"use client"
import React, { useState, useEffect } from 'react'
import { SearchIcon } from 'lucide-react'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchBarProps {
    className?: string
}

export default function SearchBar({ className }: SearchBarProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Local input state
    const [input, setInput] = useState(searchParams.get("query") || "")

    // Keep input in sync if URL changes externally
    useEffect(() => {
        setInput(searchParams.get("query") || "")
    }, [searchParams])

    // Debounce URL updates to avoid too many API calls
    useEffect(() => {
        const handler = setTimeout(() => {
            if (input && input !== searchParams.get("query")) {
                router.replace(`/search?query=${encodeURIComponent(input)}`)
            }
        }, 500)

        return () => clearTimeout(handler)
    }, [input, searchParams, router])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        router.push(`/search?query=${encodeURIComponent(input.trim())}`)
    }

    return (
        <form
            className={clsx("flex items-center bg-gray-100 rounded-full overflow-hidden", className)}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Search the blog"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 w-48 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-[#214E4E] text-white px-5 py-2 text-sm font-medium hover:bg-[#173838] transition"
            >
                <SearchIcon size={20} />
            </button>
        </form>
    )
}