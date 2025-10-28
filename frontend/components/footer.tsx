import NewsLetterForm from "./NewsLetterForm";

// components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-[#214E4E] text-white">
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand / About */}
                <div>
                    <h2 className="text-xl font-bold mb-3">The Stats Diary</h2>
                    <p className="text-sm text-gray-200">
                        Exploring data, statistics, and insights — simplified for everyone.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-200 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <NewsLetterForm />
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-600 mt-8 py-4 text-center text-sm text-gray-300">
                © {new Date().getFullYear()} The Stats Diary. All rights reserved.
            </div>
        </footer>
    );
}