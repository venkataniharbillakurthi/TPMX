import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import './Hero.css';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section 
      id="about-us"
      ref={heroRef} 
      className="relative flex items-center justify-center overflow-hidden h-screen"
    >
      {/* Tagline Bubble */}
      <div className="absolute z-20 top-20 left-5 sm:top-24 sm:left-10">
        <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-400 rounded-full bg-opacity-10 backdrop-blur-sm">
          <span className="font-sans text-xs font-normal text-white">Get Success Together!</span>
        </div>
      </div>

      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: yBg }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto" 
          webkit-playsinline="true"
          poster="/fallback.jpg"   // <-- fallback image
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src="https://res.cloudinary.com/dhzhuobu2/video/upload/v1755885121/webvideo_hxmyjf.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-6xl px-6 mx-auto"
        style={{ y: yText }}
      >
        <h1 className="hero-title text-center">
          <span className="brand-tagline">
            Where brands are born at the intersection of
          </span>
          <span className="relative inline-flex flex-wrap justify-center gap-x-1 gap-y-1 brand-words">
            <span className="relative block text-white font-black px-4 py-2">
              Tech
            </span>
            <span className="self-center text-white mx-0.5">-</span>
            <span className="relative block text-white font-black px-4 py-2">
              People
            </span>
            <span className="self-center text-white mx-0.5">-</span>
            <span className="relative block text-white font-black px-4 py-2">
              Media
            </span>
          </span>
        </h1>
      </motion.div>
      
      {/* Scroll Down Button */}
      <div className="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2">
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
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
