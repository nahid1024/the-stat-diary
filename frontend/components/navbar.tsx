"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <div className="text-xl font-bold text-[#214E4E]">The Stat Diary</div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-gray-700">
          <li className="hover:text-[#214E4E] cursor-pointer">Featured</li>
          <li className="hover:text-[#214E4E] cursor-pointer">The Stats Series</li>
          <li className="hover:text-[#214E4E] cursor-pointer">Resources</li>
        </ul>

        {/* Subscribe Form - Desktop */}
        <form className="hidden lg:flex items-center bg-gray-100 rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 w-48 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#214E4E] text-white px-5 py-2 text-sm font-medium hover:bg-[#173838] transition"
          >
            Subscribe
          </button>
        </form>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#214E4E]">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-center gap-4 py-6 text-[#214E4E]">
            <li className="cursor-pointer">
              Our Services
            </li>
            <li className="cursor-pointer">
              Case Studies
            </li>
            <li className="cursor-pointer">Pricing</li>
            <li className="ßcursor-pointer">About Us</li>
            {/* Subscribe Form - Mobile */}
            <form className="flex items-center bg-gray-100 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 w-48 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#214E4E] text-white px-5 py-2 text-sm font-medium hover:bg-[#173838] transition"
              >
                Subscribe
              </button>
            </form>
          </ul>
        </div>
      )}
    </header>
  );
}
