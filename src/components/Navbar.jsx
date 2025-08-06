import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              className="text-2xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
            >
              TPMX
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {[
                { name: 'Welcome Hub', href: '#about-us', emoji: '👋' },
                { name: 'What We Do', href: '#services', emoji: '🎯' },
                { name: 'Our Why', href: '#mission', emoji: '💡' },
                { name: 'How We Work', href: '#process', emoji: '🔄' },
                { name: 'Our Belief', href: '#manifesto', emoji: '✨' },
                { name: 'Partners', href: '#clients', emoji: '🤝' }
              ].map((item) => (
                <div className="relative group">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative px-1 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-200 group"
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100`} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {[
            { name: 'Welcome Hub', href: '#about-us', emoji: '👋' },
            { name: 'What We Do', href: '#services', emoji: '🎯' },
            { name: 'Our Why', href: '#mission', emoji: '💡' },
            { name: 'How We Work', href: '#process', emoji: '🔄' },
            { name: 'Our Belief', href: '#manifesto', emoji: '✨' },
            { name: 'Partners', href: '#clients', emoji: '🤝' }
          ].map((item) => (
            <div className="relative group">
              <div className="absolute left-4 top-0 transform -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl">{item.emoji}</span>
              </div>
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-yellow-600 rounded-md transition-colors"
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false); // Close mobile menu after clicking
                  }
                }}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
