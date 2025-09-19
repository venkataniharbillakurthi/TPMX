import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import microsoftLogo from '../assests/microsoft-logo.png';
import amazonLogo from '../assests/amazon-logo.png';
import googleLogo from '../assests/google-logo.png';
import samsungLogo from '../assests/samsung-logo.jpg';
import teslaLogo from '../assests/tesla-logo.png';
import airbnbLogo from '../assests/airbnb-logo.png';
import uberLogo from '../assests/Uber-logo.png';
import youtubeLogo from '../assests/YouTube-logo.webp';
import spotifyLogo from '../assests/spotify-logo.jpg';
import sonyLogo from '../assests/sony-logo.gif';
import ideaIcon from "../assests/IDEA 2 ICON 1.svg";
import noise from '../assests/noise.svg';
import noiseHover from '../assests/noise_hover1.svg';
import LetsTalkModal from './LetsTalkModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const Clients = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const clients = [
    { name: 'MICROSOFT', logo: microsoftLogo },
    { name: 'AMAZON', logo: amazonLogo },
    { name: 'GOOGLE', logo: googleLogo },
    { name: 'SAMSUNG', logo: samsungLogo },
    { name: 'TESLA', logo: teslaLogo },
    { name: 'AIRBNB', logo: airbnbLogo },
    { name: 'UBER', logo: uberLogo },
    { name: 'YOUTUBE', logo: youtubeLogo },
    { name: 'SPOTIFY', logo: spotifyLogo },
    { name: 'SONY', logo: sonyLogo }
  ];

  const topRowClients = clients.slice(0, 5);
  const bottomRowClients = clients.slice(5);

  return (
    <>
      <section 
        id="clients" 
        ref={ref}
        className="relative pt-24 pb-12 -mt-20 overflow-hidden bg-white md:py-18 md:-mt-36"
      >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10"
      >

      {/* Background for Mobile */}
      <div className="absolute inset-0 lg:hidden z-[-1] flex justify-center items-center opacity-10">
        <img 
          src={ideaIcon} 
          alt="Creative Idea Background" 
          className="h-auto w-96"
        />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <h2 className="mb-4 text-5xl font-black leading-tight text-black md:text-5xl font-poppins">
            Brands We've Made Jump for Joy
          </h2>
        </motion.div>
        
        <div className="grid items-start grid-cols-1 gap-12 mt-6 lg:grid-cols-2">
          {/* Left Column - Client Logos */}
          <motion.div 
            className="w-full"
            variants={fadeInUp}
          >
            <p className="mt-16 mb-8 text-lg text-black font-satoshi">
              From scrappy start-ups to household names, our partners share one
              thing: a hunger to do things differently.
            </p>
            <motion.div variants={fadeInUp} className="overflow-hidden">
              {/* Top Row - Moving Right */}
              <div className="relative h-24 mb-8 overflow-hidden md:h-20 md:mb-6">
                <motion.div 
                  className="absolute top-0 left-0 flex h-full"
                  animate={{
                    x: ['0%', '-50%'],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {[...topRowClients, ...topRowClients].map((client, index) => (
                    <motion.div 
                      key={`${client.name}-${index}`} 
                      className="flex items-center h-full px-4 md:px-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name}
                        className="object-contain w-auto h-10 transition-all duration-300 md:h-12 filter grayscale hover:grayscale-0 hover:scale-110"
                        style={{ maxWidth: '120px' }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Row - Moving Left */}
              <div className="relative h-24 overflow-hidden md:h-20">
                <motion.div 
                  className="absolute top-0 left-0 flex h-full"
                  animate={{
                    x: ['-50%', '0%'],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {[...bottomRowClients, ...bottomRowClients].map((client, index) => (
                    <motion.div 
                      key={`${client.name}-${index}`} 
                      className="flex items-center h-full px-4 md:px-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name}
                        className="object-contain w-auto h-10 transition-all duration-300 md:h-12 filter grayscale hover:grayscale-0 hover:scale-110"
                        style={{ maxWidth: '120px' }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Image (Desktop Only) */}
          <motion.div 
            className="relative flex-col items-center hidden lg:flex -mt-15 ml-80"
            variants={fadeInUp}
          >
            <img 
              src={ideaIcon} 
              alt="Creative Idea" 
              className="z-10 w-full max-w-lg ml-12"
              style={{ width: '28rem', height: 'auto' }}
            />
          </motion.div>
        </div>

        {/* Noise image (Desktop only) */}
        <motion.div
          className="relative items-center justify-center hidden ml-48 -mt-4 lg:flex"
          variants={fadeInUp}
        >
          <div className="relative group">
            <img 
              src={noise} 
              alt="Noise texture" 
              className="h-64 ml-48 -mt-16 -mt-24 transition-opacity duration-300 w-74 group-hover:opacity-0"
            />
            <img 
              src={noiseHover} 
              alt="Noise texture hover" 
              className="absolute top-0 left-0 h-64 ml-48 -mt-16 -mt-24 transition-opacity duration-300 opacity-0 w-74 group-hover:opacity-100"
            />
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="px-4 mx-auto mt-12 md:-mt-10 max-w-7xl sm:px-6 lg:px-8"
          variants={fadeInUp}
        >
          <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column - Title */}
            <motion.div 
              className="mb-12 text-left md:mb-20"
              variants={itemVariants}
            >
              <motion.div 
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-1 text-lg font-satoshi text-[#e30e00] uppercase tracking-wider border-2 border-[#e30e00] rounded-full">
                  Get in touch
                </span>
                <br /><br />
              </motion.div>
              <h2 className="text-3xl font-black text-black md:text-4xl font-poppins">
                Ready to Make Some Noise?
              </h2>
            </motion.div>

            {/* Right Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              <p className="mb-8 text-xl leading-relaxed text-black font-satoshi">
                If you're itching to build the next big thing or reinvent
                the old thing we should talk. Slide into our inbox at
                <a href="mailto:tpmx.creative@gmail.com" className="ml-1 font-medium text-blue-500 hover:underline">tpmx.creative@gmail.com</a> or drop us a line below. We'll hit
                you back fast, because momentum matters.
              </p>
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-[#e30e00] hover:bg-[#c90d00] text-white px-12 py-4 text-lg font-satoshi font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 self-start"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Let's Talk
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </motion.div>
      </section>
      
<LetsTalkModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Clients;
