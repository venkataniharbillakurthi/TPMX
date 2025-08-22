import React, { useState, useEffect } from 'react';
import BookDemoModal from './BookDemoModal';
import TPMXLogo from '../assests/logo.png'; // Save the image as tpmx-logo.png in src/assests

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load Satoshi font
    const link = document.createElement('link');
    link.href = 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Apply font to body or html element
    document.documentElement.style.setProperty('--font-sans', 'Satoshi, sans-serif');
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm font-sans" style={{ fontFamily: 'Satoshi, sans-serif', color: '#000000' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home">
              <img 
                src={TPMXLogo} 
                alt="TPMX Logo" 
                className="w-auto h-10"
                style={{ maxHeight: '40px' }}
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="items-center hidden ml-10 space-x-8 md:flex">
            {[
              { name: 'Welcome Hub', id: 'about-us' },
              { name: 'What We Do', id: 'services' },
              { name: 'Our Why', id: 'mission' },
              { name: 'How We Work', id: 'process' },
              { name: 'Partners', id: 'clients' }
            ].map((item, index) => (
              <div className="relative group" key={index}>
                <div className="absolute transition-opacity duration-300 transform -translate-x-1/2 opacity-0 -top-8 left-1/2 group-hover:opacity-100">
                  <span className="text-xl">{['👋', '🎯', '💡', '🔄', '🤝'][index]}</span>
                </div>
                <a
                  href={`#${item.id}`}
                  className="relative px-1 py-2 text-sm font-medium text-black transition-colors duration-200 hover:text-yellow-600 group"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      // Close mobile menu if open
                      setIsOpen(false);
                      // Scroll to section
                      target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
            ))}
            {/* Book a Call Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-6 px-5 py-2 rounded-lg bg-[#e30e00] text-white font-semibold hover:bg-[#c50e00] transition-colors duration-200"
            >
              Book a Call
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 transition-colors rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
              aria-expanded={isOpen}
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

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {[
            { name: 'Welcome Hub', href: '#about-us', emoji: '👋' },
            { name: 'What We Do', href: '#services', emoji: '🎯' },
            { name: 'Our Why', href: '#mission', emoji: '💡' },
            { name: 'How We Work', href: '#process', emoji: '🔄' },
            { name: 'Partners', href: '#clients', emoji: '🤝' }
          ].map((item, index) => (
            <div key={index} className="px-3 py-2 text-base font-medium rounded-md">
              <a
                href={item.href}
                className="flex items-center text-gray-700 hover:text-yellow-600"
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-2">{item.emoji}</span>
                {item.name}
              </a>
            </div>
          ))}
          
          {/* Book a Call Button for mobile */}
          <div className="px-3 pt-2 pb-3">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 rounded-lg bg-[#e30e00] text-white font-semibold hover:bg-[#c50e00] transition-colors duration-200"
            >
              Book a Call
            </button>
          </div>
        </div>
      </div>
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
