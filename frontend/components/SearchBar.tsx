"use client"
import React, { useState, useEffect, useRef } from 'react'
import { SearchIcon } from 'lucide-react'
import clsx from 'clsx'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface SearchBarProps {
    className?: string
}

export default function SearchBar({ className }: SearchBarProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    // Track the input so we can restore focus after route changes.
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Local input state
    const [input, setInput] = useState(searchParams.get("query") || "")

    // Keep input in sync if URL changes externally
    useEffect(() => {
        setInput(searchParams.get("query") || "")
    }, [searchParams])

    // Preserve focus when navigating to the search results page so the cursor doesn't reset.
    useEffect(() => {
        if (pathname !== "/search") return
        const inputEl = inputRef.current
        if (!inputEl) return

        inputEl.focus()
        const valueLength = inputEl.value.length
        inputEl.setSelectionRange(valueLength, valueLength)
    }, [pathname, searchParams])

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
            className={clsx("flex items-center bg-muted rounded-full overflow-hidden", className)}
            onSubmit={handleSubmit}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Search the blog"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="px-4 py-2 text-sm bg-muted text-foreground/80 w-48 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition"
            >
                <SearchIcon size={20} />
            </button>
        </form>
    )
}
