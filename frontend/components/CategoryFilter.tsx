"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/strapi";
import Link from "next/link";
import { usePathname } from "next/navigation"; // allows reading the current route in client components

// Default Strapi URL with a fallback for local development. Prefer using
// an environment variable in production to allow different hosts.
//const STRAPI_URL = process.env.STRAPI_BASE_URL;

// Minimal shape for category objects returned by `getCategories()`.
type CategoryFilterProps = {
    name: string;
    slug: string;
};

/**
 * CategoryFilter
 *
 * Client component that fetches available categories from Strapi and
 * renders a set of pill buttons for filtering posts by category.
 *
 * Behavior and notes:
 * - Fetches categories on mount using `getCategories()` from `lib/strapi`.
 * - Uses `usePathname()` to determine which category is currently active
 *   based on the URL (e.g. `/category/<slug>`). When at `/` the active
 *   category is set to "All".
 * - Renders each category as a `Link` wrapping a `button` so navigation
 *   is client-side and accessible.
 * - The category named "All" is treated specially and linked to `/`.
 */
export default function CategoryFilter() {
    const pathname = usePathname(); // current URL path (client-side)

    // Tracks the active category name or slug. Defaults to "All" for the home page.
    const [active, setActive] = useState<string>("All");

    // Local state for categories fetched from the API.
    const [categories, setCategories] = useState<CategoryFilterProps[]>([]);

    // Fetch categories once when the component mounts.
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                // Keep the error handling minimal in the UI; log for debugging.
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Update the active category when the pathname changes.
    // Expected path format for category pages: /category/<slug>
    useEffect(() => {
        if (pathname === "/") {
            setActive("All");
        } else {
            // Split the path and attempt to read the category slug.
            const parts = pathname.split("/");
            if (parts[1] === "category" && parts[2]) {
                // Use the slug (parts[2]) as the active identifier. This
                // lines up with how links are generated below.
                setActive(parts[2]);
            }
        }
    }, [pathname]);


    return (
        <div className="w-full bg-primary rounded-4xl p-2 flex flex-wrap gap-3 mb-10">
            {[...categories]
                // Ensure "All" appears first in the list so it's easy to find.
                .sort((a, b) => (a.name === "All" ? -1 : b.name === "All" ? 1 : 0))
                .map((cat) => (
                    // Each category is a Link to the appropriate route. We use
                    // the category name for the button label and slug for the URL.
                    <Link
                        href={cat.name === "All" ? "/" : `/category/${cat.name}`}
                        key={cat.name}
                    >
                        <button
                            // Button styling toggles based on whether the category
                            // is the active one. We check both the slug and name to
                            // be resilient to different active-value strategies.
                            className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${active === cat.slug || decodeURIComponent(active) === cat.name
                                ? "bg-background text-foreground"
                                : "text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                }`}
                        >
                            {cat.name}
                        </button>
                    </Link>
                ))}
        </div>
    );
}