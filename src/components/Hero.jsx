import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import TechImage from '../Tech.svg';
import PeopleImage from '../people.svg';
import MediaImage from '../Media.svg';
import VideoBackground from '../0_Animation_Connected_4096x2160.mp4';
import './Hero.css';

// Add Google Fonts link in your index.html or _document.js file

const Hero = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [activeWord, setActiveWord] = useState(null);
  const heroRef = useRef(null);
  
  const handleWordHover = (image, word) => {
    setHoveredImage(image);
    setActiveWord(word);
  };
  
  const handleMouseLeave = () => {
    setHoveredImage(null);
    setActiveWord(null);
  };
  
  const isWordVisible = (word) => {
    return !activeWord || activeWord === word;
  };
  
  return (
    <section 
      ref={heroRef}
      id="about-us"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ 
        height: '90vh',
        marginTop: '10vh', // 20vh for navbar
        minHeight: 'auto' // Remove min-h-screen
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VideoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Hover Image Overlay */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${hoveredImage ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: hoveredImage ? `url(${hoveredImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 max-w-6xl mx-auto mt-16 md:mt-28">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight tracking-tight">
          <span 
            className="brand-tagline block text-white font-bold mb-4 md:mb-6 transition-opacity duration-300"
            style={{ opacity: !activeWord ? 1 : 0 }}
          >
            Where brands are born — at the intersection of
          </span>
          <span 
            className="block text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 md:mb-8 transition-opacity duration-300"
            style={{ opacity: !activeWord ? 1 : 0 }}
          >
        
          </span>
          <span className="relative inline-flex flex-wrap justify-center gap-x-2 gap-y-4 brand-words">
            <div className="relative group">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-3xl">👥</span>
              </div>
              <span 
                className="relative px-4 py-2 cursor-pointer group transition-all duration-300 rounded-lg block"
                onMouseEnter={() => handleWordHover(PeopleImage, 'people')}
                onMouseLeave={handleMouseLeave}
                style={{ opacity: isWordVisible('people') ? 1 : 0, transition: 'opacity 0.3s' }}
              >
                <span className="relative z-10 font-black text-[#FFFF00] group-hover:text-[#FFFF00] transition-colors duration-300 font-montserrat">
                  People
                </span>
                <span className="absolute inset-0 bg-yellow-100 group-hover:bg-[#6F0085] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></span>
              </span>
            </div>
            <span className="self-center text-white font-montserrat" style={{ opacity: isWordVisible('people') && isWordVisible('tech') ? 1 : 0, transition: 'opacity 0.3s' }}> - </span>
            <div className="relative group">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-3xl">💻</span>
              </div>
              <span 
                className="relative px-4 py-2 cursor-pointer group transition-all duration-300 rounded-lg block"
                onMouseEnter={() => handleWordHover(TechImage, 'tech')}
                onMouseLeave={handleMouseLeave}
                style={{ opacity: isWordVisible('tech') ? 1 : 0, transition: 'opacity 0.3s' }}
              >
                <span className="relative z-10 font-black text-[#FFFF00] group-hover:text-[#FFFF00] transition-colors duration-300 font-montserrat">
                  Tech
                </span>
                <span className="absolute inset-0 bg-yellow-100 group-hover:bg-[#102667] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></span>
              </span>
            </div>
            <span className="self-center text-white font-montserrat" style={{ opacity: isWordVisible('tech') && isWordVisible('media') ? 1 : 0, transition: 'opacity 0.3s' }}> - </span>
            <div className="relative group">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-3xl">🎥</span>
              </div>
              <span 
                className="relative px-4 py-2 cursor-pointer group transition-all duration-300 rounded-lg block"
                onMouseEnter={() => handleWordHover(MediaImage, 'media')}
                onMouseLeave={handleMouseLeave}
                style={{ opacity: isWordVisible('media') ? 1 : 0, transition: 'opacity 0.3s' }}
              >
                <span className="relative z-10 font-black text-[#FFFF00] group-hover:text-[#FFFF00] transition-colors duration-300 font-montserrat">
                  Media
                </span>
                <span className="absolute inset-0 bg-yellow-100 group-hover:bg-[#c62c2a] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></span>
              </span>
            </div>
          </span>
        </h1>
      </div>
      
      <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-900" />
      </div>
    </section>
  );
};

export default Hero;