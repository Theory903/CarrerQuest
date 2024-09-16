// src/components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          <Link href="/">CareerQuest</Link>
        </h1>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
            Dashboard
          </Link>
          <Link href="/students" className="text-gray-300 hover:text-white transition-colors duration-300">
            Students
          </Link>
          <Link href="/mentorships" className="text-gray-300 hover:text-white transition-colors duration-300">
            Mentorships
          </Link>
          <Link href="/careers" className="text-gray-300 hover:text-white transition-colors duration-300">
            Careers
          </Link>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block px-4 py-2 text-gray-300 hover:text-white">
          Dashboard
        </Link>
        <Link href="/students" className="block px-4 py-2 text-gray-300 hover:text-white">
          Students
        </Link>
        <Link href="/mentorships" className="block px-4 py-2 text-gray-300 hover:text-white">
          Mentorships
        </Link>
        <Link href="/careers" className="block px-4 py-2 text-gray-300 hover:text-white">
          Careers
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
