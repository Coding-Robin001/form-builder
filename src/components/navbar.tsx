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
    // { name: "Home", href: "/" },
    { name: "form-page", href: "/form-home" },
    ...(session ? [{ name: "auth-Dashboard", href: "/auth-dashboard" }] : []),
    ...(session ? [] : [{ name: "Login", href: "/auth" }]),
  ]

  return (

    <header
      className="w-full flex items-center justify-between  bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-md border-emerald-900 p-5 shadow-md backdrop-blur-lg"
    >
      <nav className="container mx-auto border-b-1 border-gray-500 flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-orange-400 text-transparent bg-clip-text drop-shadow-sm">
            PageForm
          </h1>
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

          <div className="flex items-center gap-4">
            <button 
            className="bg-emerald-800/40 p-2 cursor-pointer rounded-lg hover:bg-emerald-700/50 transition">
              ⚙️
            </button>
            <button 
            className="bg-emerald-800/40 p-2 cursor-pointer rounded-lg hover:bg-emerald-700/50 transition">
              🌙
            </button>
          </div>

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
