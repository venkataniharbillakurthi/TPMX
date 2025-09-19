import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BookDemoModal from './BookDemoModal';
import logo from "../components/Final Logo.svg";
 // Save the image as tpmx-logo.png in src/assests

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (item.id === 'blog') {
      navigate('/blog');
      return;
    }

    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate(`/#${item.id}`, { replace: true });
      // Scroll to section after a small delay to allow the page to load
      setTimeout(() => {
        const target = document.getElementById(item.id);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll to the section
      const target = document.getElementById(item.id);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-screen overflow-x-hidden bg-white">
      <nav className="w-full" style={{ fontFamily: 'Satoshi, sans-serif', color: '#000000' }}>
        <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full h-14 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src={logo} 
                alt="TPMX Logo" 
                className="w-auto h-8 md:h-10"
                style={{ maxHeight: '40px' }}
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="items-center hidden ml-10 space-x-1 md:flex">
            {[
              { name: 'Welcome Hub', id: 'about-us', emoji: '👋', isLink: false },
              { name: 'What We Do', id: 'services', emoji: '🎯', isLink: false },
              { name: 'Our Why', id: 'mission', emoji: '💡', isLink: false },
              { name: 'How We Work', id: 'process', emoji: '🔄', isLink: false },
              { name: 'Partners', id: 'clients', emoji: '🤝', isLink: false },
              { name: 'Blog', id: 'blog', emoji: '✍️', isLink: true }
            ].map((item, index) => (
              <div className="relative flex items-center justify-center group" key={index}>
                <a
                  href={item.isLink ? `/${item.id}` : `#${item.id}`}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group-hover:scale-110 min-w-[100px] text-center ${
                    (location.pathname === '/blog' && item.id === 'blog') ? 'text-red-600' : 'text-black'
                  }`}
                  onClick={(e) => handleNavClick(e, item)}
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
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden fixed top-14 left-0 right-0 h-screen bg-white shadow-lg z-[9999] overflow-y-auto`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {[
            { name: 'Welcome Hub', id: 'about-us', emoji: '👋', isLink: false },
            { name: 'What We Do', id: 'services', emoji: '🎯', isLink: false },
            { name: 'Our Why', id: 'mission', emoji: '💡', isLink: false },
            { name: 'How We Work', id: 'process', emoji: '🔄', isLink: false },
            { name: 'Partners', id: 'clients', emoji: '🤝', isLink: false },
            { name: 'Blog', id: 'blog', emoji: '✍️', isLink: true }
          ].map((item) => (
            <a
              key={item.id}
              href={item.isLink ? `/${item.id}` : `#${item.id}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                (location.pathname === '/blog' && item.id === 'blog') ? 'text-red-600' : 'text-gray-700'
              } hover:bg-gray-100`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(e, item);
              }}
            >
              <div className="flex items-center">
                <span className="mr-2 text-xl">{item.emoji}</span>
                <span>{item.name}</span>
              </div>
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              setIsModalOpen(true);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-[#e30e00] hover:bg-[#c50e00] mt-2"
          >
            Book a Call
          </button>
        </div>
      </div>
    </nav>
    <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </div>
  );
};

export default Navbar;
