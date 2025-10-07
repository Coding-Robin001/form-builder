"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/auth"

type Session = typeof auth.$Infer.Session

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    ...(session ? [{ name: "Dashboard", href: "/auth-dashboard" }] : []),
    ...(session ? [] : [{ name: "Login", href: "/auth" }]),
  ]

  return (
    <header className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2">
          <span className="text-indigo-400">⚡</span>
          BetterAuth Starter <span className="text-indigo-400">for Next.js 15</span>
        </Link>

        
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          <ul className="hidden sm:flex gap-8">
            {navLinks.map((link, index) => {
              const active =
                pathname === link.href ||
                (pathname.startsWith(link.href) && link.href !== "/")

              return (
                <li key={index} className="relative">
                  <Link
                    href={link.href}
                    className={`relative transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-indigo-400 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left ${active ? "text-indigo-400 after:scale-x-100" : "text-gray-300 hover:text-indigo-300"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* GitHub Button */}
          <a
            href="https://github.com/Coding-Robin001/Next.js-15-Better-Auth-Starter"
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            className="hover:text-indigo-400 transition hidden sm:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12c0 5.304 3.438 9.799 8.207 11.387.6.111.793-.261.793-.579v-2.262c-3.338.727-4.042-1.416-4.042-1.416-.546-1.385-1.334-1.754-1.334-1.754-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.236 1.84 1.236 1.07 1.832 2.807 1.304 3.492.998.108-.775.418-1.305.762-1.606-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.124-.305-.535-1.533.117-3.194 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.006.403 2.29-1.552 3.297-1.23 3.297-1.23.654 1.661.243 2.889.119 3.194.77.84 1.233 1.911 1.233 3.221 0 4.61-2.806 5.624-5.478 5.922.43.37.823 1.103.823 2.223v3.293c0 .321.19.694.8.576C20.565 21.795 24 17.301 24 12 24 5.373 18.627 0 12 0z"
              />
            </svg>
          </a>

          {/* Avatar (if signed in) */}
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full border border-gray-700"
            />
          )}
        </div>

        {/* Mobile Menu Placeholder */}
        <button className="sm:hidden text-white text-2xl">☰</button>
      </nav>
    </header>
  )
}
