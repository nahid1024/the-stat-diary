"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";


export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setLoading(false);
        toast.success(data.message);
        if (res.ok) setEmail("");
    };

    return (
        <><div>
            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
            <form className="flex bg-white rounded-full overflow-hidden" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 text-sm text-gray-700 w-full focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-[#173838] text-white px-5 py-2 text-sm cursor-pointer font-medium hover:bg-[#0f2727] transition"
                >
                    {loading ? (
                        // simple spinner
                        <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
                    ) : (
                        "Subscribe"
                    )}
                </button>
            </form>
        </div>
        </>
    );
}



