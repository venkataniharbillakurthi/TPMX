import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import noise from '../assests/noise.svg';
import ideaIcon from '../assests/IDEA 2 ICON 1.svg';

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

const JoinForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
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
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-gray-700/50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          Join Our Mission
        </h3>
        <p className="text-gray-400 mb-6">Tell us how you'd like to be involved</p>
        
        <form
          action="https://formsubmit.co/venkataniharbillakurthi@gmail.com"
          method="POST"
          className="space-y-4"
          onSubmit={() => setTimeout(onClose, 1000)}
        >
          <input type="hidden" name="_subject" value="New Mission Application" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={window.location.href} />
          <input type="hidden" name="_template" value="table" />
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
              How would you like to contribute?
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="marketer">Marketer</option>
              <option value="investor">Investor</option>
              <option value="partner">Partner</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Share your thoughts and how you'd like to contribute..."
              required
            ></textarea>
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
          >
            Submit Application
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Manifesto = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section 
      id="manifesto" 
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={noise} 
          alt="Noise texture" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div 
            className="text-left"
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Brands We've Made Jump for Joy
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
              variants={fadeInUp}
            >
              From scrappy start‑ups to household names, our partners share one
              thing: a hunger to do things differently.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg font-semibold rounded-full shadow-lg transform transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10">Join Our Mission</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
            
            <AnimatePresence>
              {showForm && <JoinForm onClose={() => setShowForm(false)} />}
            </AnimatePresence>
          </motion.div>
          
          {/* Right side - Image */}
          <motion.div 
            className="relative flex justify-center items-center"
            variants={fadeInUp}
          >
            <div className="relative z-10">
              <img 
                src={ideaIcon} 
                alt="Idea Icon" 
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64">
              <img 
                src={noise} 
                alt="Noise texture" 
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;