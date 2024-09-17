// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-bold mb-2">CareerQuest</h4>
          <p className="text-gray-400">Empowering your career journey with insights and tools.</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
            Contact
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} CareerQuest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
