"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const DashboardNavbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/skill-matrix', label: 'Skill Matrix' },
    { href: '/dashboard/academic-performance', label: 'Academic Performance' },
    { href: '/dashboard/participation-levels', label: 'Participation Levels' },
    { href: '/dashboard/goal-progress', label: 'Goal Progress' },
    { href: '/dashboard/career-tree', label: 'Career Path' },
    { href: '/dashboard/personality-insights', label: 'Personality Insights' },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <ul className={`md:flex md:space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          {navItems.map(({ href, label }) => (
            <li key={href} className="mb-2 md:mb-0">
              <Link
                href={href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
