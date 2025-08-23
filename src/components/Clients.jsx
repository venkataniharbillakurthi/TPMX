import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
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

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-3xl font-bold text-center mb-8 text-[#e30e00]">
          Let's Connect
        </h3>
        <form
          action="https://formsubmit.co/venkataniharbillakurthi@gmail.com"
          method="POST"
          className="space-y-6"
          onSubmit={() => {
            setTimeout(() => {
              onClose();
            }, 1000);
          }}
        >
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
          </div>

          {/* FormSubmit hidden fields */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={window.location.href} />
          <input type="hidden" name="_subject" value="New Contact Form Submission" />
          <input type="hidden" name="_template" value="table" />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#e30e00] hover:bg-[#e30e00] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Clients = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [showContactForm, setShowContactForm] = useState(false);

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

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section 
      id="clients" 
      ref={ref}
      className="relative pt-24 pb-12 md:py-18 overflow-hidden bg-white -mt-20 md:-mt-36"
    >

      {/* Background for Mobile */}
      <div className="absolute inset-0 lg:hidden z-[-1] flex justify-center items-center opacity-10">
        <img 
          src={ideaIcon} 
          alt="Creative Idea Background" 
          className="w-96 h-auto"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <h2 className="text-5xl md:text-5xl font-black leading-tight mb-4 text-black font-poppins">
            Brands We've Made Jump for Joy
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-6">
          {/* Left Column - Client Logos */}
          <motion.div 
            className="w-full"
            variants={fadeInUp}
          >
            <p className="text-lg text-black mb-8 font-satoshi mt-16">
              From scrappy start-ups to household names, our partners share one
              thing: a hunger to do things differently.
            </p>
            <motion.div variants={fadeInUp} className="overflow-hidden">
              {/* Top Row - Moving Right */}
              <div className="relative h-24 md:h-20 overflow-hidden mb-8 md:mb-6">
                <motion.div 
                  className="flex absolute top-0 left-0 h-full"
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
                      className="px-4 md:px-6 flex items-center h-full"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name}
                        className="h-10 md:h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                        style={{ maxWidth: '120px' }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Row - Moving Left */}
              <div className="relative h-24 md:h-20 overflow-hidden">
                <motion.div 
                  className="flex absolute top-0 left-0 h-full"
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
                      className="px-4 md:px-6 flex items-center h-full"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <img 
                        src={client.logo} 
                        alt={client.name}
                        className="h-10 md:h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
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
            className="hidden lg:flex flex-col items-center -mt-15 ml-80 relative"
            variants={fadeInUp}
          >
            <img 
              src={ideaIcon} 
              alt="Creative Idea" 
              className="w-full max-w-lg ml-12 z-10"
              style={{ width: '28rem', height: 'auto' }}
            />
          </motion.div>
        </div>

        {/* Noise image (Desktop only) */}
        <motion.div
          className="hidden lg:flex justify-center items-center -mt-4 ml-48 relative"
          variants={fadeInUp}
        >
          <img 
            src={noise} 
            alt="Noise texture" 
            className="w-74 h-64 -mt-16 ml-28 -mt-24"
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-12 md:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <motion.div 
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="inline-block px-2 py-1 text-lg font-satoshi text-[#e30e00] uppercase tracking-wider border-2 border-[#e30e00] rounded-full">
                  Get in touch
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black text-black font-poppins">
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
              <p className="text-xl text-black mb-8 leading-relaxed font-satoshi">
                If you're itching to build the next big thing or reinvent
                the old thing we should talk. Slide into our inbox at
                <a href="mailto:tpmx.creative@gmail.com" className="text-blue-500 hover:underline font-medium ml-1">tpmx.creative@gmail.com</a> or drop us a line below. We'll hit
                you back fast, because momentum matters.
              </p>
              <motion.button 
                onClick={() => setShowContactForm(true)}
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
        {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
      </div>
    </section>
  );
};

export default Clients;
