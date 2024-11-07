'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {useState} from 'react';

export default function NavBar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-300 to-blue-500 shadow-md">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-500 opacity-70"></div>
      <div className="relative z-10 flex items-center justify-between w-full">
        <Link href="/">
          <p className="text-2xl font-bold text-white">My App</p>
        </Link>

        <div className="flex items-center space-x-6 hidden md:flex">
          {session ? (
            <>
              <p className="text-lg text-white font-medium">Welcome, {session.user.name}</p>
              <button
                className="bg-white text-blue-600 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium text-md shadow-lg"
                onClick={() => signOut({ callbackUrl: "/" })} // Redirects to home on sign out
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              className="bg-white text-blue-600 py-2 px-6 rounded-md hover:bg-gray-100 transition-colors font-medium text-md shadow-lg"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md rounded-lg p-4 space-y-4">
          {session ? (
            <>
              <p className="text-lg text-gray-700 font-medium">Welcome, {session.user.name}</p>
              <button
                className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-500 transition-colors font-medium text-md"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-500 transition-colors font-medium text-md"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
