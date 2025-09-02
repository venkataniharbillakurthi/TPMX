import React, { useState, useEffect } from 'react';
import BookDemoModal from './BookDemoModal';
import logo from "../components/Final Logo.svg";
 // Save the image as tpmx-logo.png in src/assests

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
    <nav className="fixed top-0 left-0 z-50 w-full font-sans bg-white border-b border-gray-100 shadow-sm" style={{ fontFamily: 'Satoshi, sans-serif', color: '#000000' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home">
              <img 
                src={logo} 
                alt="TPMX Logo" 
                className="w-auto h-8 md:h-10"
                style={{ maxHeight: '40px' }}
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="items-center hidden ml-10 space-x-1 md:flex">
            {[
              { name: 'Welcome Hub', id: 'about-us', emoji: '👋' },
              { name: 'What We Do', id: 'services', emoji: '🎯' },
              { name: 'Our Why', id: 'mission', emoji: '💡' },
              { name: 'How We Work', id: 'process', emoji: '🔄' },
              { name: 'Partners', id: 'clients', emoji: '🤝' }
            ].map((item, index) => (
              <div className="relative flex items-center justify-center group" key={index}>
                <a
                  href={`#${item.id}`}
                  className="relative px-4 py-2 text-sm font-medium text-black transition-all duration-300 group-hover:scale-110 min-w-[100px] text-center"
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
                  <span className="inline-flex items-center justify-center w-full h-full text-base transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                    {item.name}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center text-3xl transition-all duration-300 transform scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100">
                    {item.emoji}
                  </span>
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
          <div className="flex items-center md:hidden">
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

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-1`}>
        <div className="px-2 pt-1 pb-2 space-y-0.5">
          {[
            { name: 'Welcome Hub', id: 'about-us', emoji: '👋' },
            { name: 'What We Do', id: 'services', emoji: '🎯' },
            { name: 'Our Why', id: 'mission', emoji: '💡' },
            { name: 'How We Work', id: 'process', emoji: '🔄' },
            { name: 'Partners', id: 'clients', emoji: '🤝' }
          ].map((item, index) => (
            <div key={index} className="px-3 py-2 text-base font-medium rounded-md">
              <a
                href={`#${item.id}`}
                className="flex items-center text-gray-700 hover:text-yellow-600"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
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
