import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import VideoBackground from '../assests/webvideo.mp4';
import './Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
  const heroRef = useRef(null);

  return (
    <section 
      id="about-us"
      ref={heroRef} 
      className="relative flex items-center justify-center overflow-hidden"
      style={{ 
        height: '80vh',
        marginTop: '10vh',
        minHeight: 'auto'
      }}
    >
      {/* Trusted By Section */}
      <div className="absolute z-20 top-12 left-10">
        <div className="inline-flex items-center px-5 py-2 bg-white border border-gray-400 rounded-full bg-opacity-10 backdrop-blur-sm">
          <span className="font-sans text-xs font-normal text-white">Get Success Together!</span>
        </div>
      </div>
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src={VideoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-6xl px-6 mx-auto mt-16 md:mt-2">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-center md:text-6xl lg:text-7xl">
          <span 
            className="block text-xl font-medium text-white transition-opacity duration-300 font-poppins brand-tagline md:text-2xl lg:text-3xl"
            style={{ marginBottom: '0.5rem' }}
          >
            Where brands are born at the intersection of
          </span>
          <span className="relative inline-flex flex-wrap justify-center gap-x-1 gap-y-1 brand-words" style={{ marginTop: '0.25rem' }}>
            <span className="relative block px-4 py-2 text-2xl font-black text-white rounded-lg font-poppins md:text-3xl lg:text-4xl">
              Tech
            </span>
            <span className="self-center text-white font-poppins mx-0.5">-</span>
            <span className="relative block px-4 py-2 text-2xl font-black text-white rounded-lg font-poppins md:text-3xl lg:text-4xl">
              People
            </span>
            <span className="self-center text-white font-poppins mx-0.5">-</span>
            <span className="relative block px-4 py-2 text-2xl font-black text-white rounded-lg font-poppins md:text-3xl lg:text-4xl">
              MEDIA
            </span>
          </span>
        </h1>
      </div>
      
      <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2">
        <motion.button 
          onClick={() => {
            const odenSection = document.getElementById('oden');
            if (odenSection) {
              odenSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }}
          className="p-2 text-white transition-colors duration-200 rounded-full hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Scroll to Oden section"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 0 }}
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;