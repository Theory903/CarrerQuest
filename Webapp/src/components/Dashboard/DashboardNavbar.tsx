"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  LayoutGrid, 
  LineChart, 
  GraduationCap, 
  Users2, 
  Target, 
  GitBranch, 
  Brain 
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutGrid },
  { href: '/dashboard/skill-matrix', label: 'Skills', icon: LineChart },
  { href: '/dashboard/academic-performance', label: 'Academic', icon: GraduationCap },
  { href: '/dashboard/participation-levels', label: 'Participation', icon: Users2 },
  { href: '/dashboard/goal-progress', label: 'Goals', icon: Target },
  { href: '/dashboard/career-tree', label: 'Career Path', icon: GitBranch },
  { href: '/dashboard/personality-insights', label: 'Personality', icon: Brain },
];

const DashboardNavbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="mb-8">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-2 p-2 bg-slate-900/50 rounded-2xl border border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tablet Navigation */}
      <div className="hidden md:flex lg:hidden items-center gap-2 p-2 bg-slate-900/50 rounded-2xl border border-slate-800/60 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 flex-shrink-0 ${
                active
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 px-4 py-3 w-full bg-slate-900/50 rounded-xl border border-slate-800/60 text-slate-300"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
          <span className="font-medium">Dashboard Navigation</span>
        </button>

        <div
          className={`mt-2 overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-slate-900/80 rounded-xl border border-slate-800/60 p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
