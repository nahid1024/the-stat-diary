"use client";
import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);


  return (
    <header className="w-full border-b border-border bg-background">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <div className="text-xl font-bold text-primary">The Stat Diary</div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-foreground/80">
          <li className="hover:text-primary cursor-pointer">Featured</li>
          <li className="hover:text-primary cursor-pointer">The Stats Series</li>
          <li className="hover:text-primary cursor-pointer">Resources</li>
        </ul>

        {/* Subscribe Form - Desktop */}
        <Suspense fallback={null}>
          <SearchBar className="hidden lg:flex" />
        </Suspense>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden bg-card border-t border-border">
          <ul className="flex flex-col items-center gap-4 py-6 text-primary">
            <li className="cursor-pointer">
              Our Services
            </li>
            <li className="cursor-pointer">
              Case Studies
            </li>
            <li className="cursor-pointer">Pricing</li>
            <li className="ßcursor-pointer">About Us</li>
            {/* Subscribe Form - Mobile */}
            <Suspense fallback={null}>
              <SearchBar className="flex lg:hidden" />
            </Suspense>
          </ul>
        </div>
      )}
    </header>
  );
}
