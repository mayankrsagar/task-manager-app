import React from 'react';

import Link from 'next/link';

export default function Navbar() {


  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Task Manager
            </Link>
          </div>


        
        </div>
      </div>
    </nav>
  );
}
