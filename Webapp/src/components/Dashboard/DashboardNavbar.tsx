"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/skill-matrix', label: 'Skill Matrix' },
  { href: '/dashboard/academic-performance', label: 'Academic Performance' },
  { href: '/dashboard/participation-levels', label: 'Participation Levels' },
  { href: '/dashboard/goal-progress', label: 'Goal Progress' },
  { href: '/dashboard/career-tree', label: 'Career Path' },
  { href: '/dashboard/personality-insights', label: 'Personality Insights' },
];

interface NavLinkProps extends NavItem {
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick }) => (
  <li>
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
      onClick={onClick}
    >
      {label}
    </Link>
  </li>
);

const DashboardNavbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </ul>
          </div>
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} onClick={() => setMobileMenuOpen(false)} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;