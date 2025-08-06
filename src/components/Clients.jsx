import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

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
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const ClientLogo = ({ name, index }) => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-yellow-500 to-yellow-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600'
  ];
  
  const colorIndex = index % colors.length;
  
  return (
    <motion.div
      className="flex-shrink-0 mx-4 px-8 py-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -5 }}
    >
      <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${colors[colorIndex]} group-hover:opacity-90 transition-opacity`}>
        {name}
      </span>
    </motion.div>
  );
};

const Clients = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [showContactForm, setShowContactForm] = useState(false);

  const clients = [
    'APPLE', 'GOOGLE', 'MICROSOFT', 'NETFLIX', 'SPOTIFY', 'AIRBNB', 
    'UBER', 'TESLA', 'NIKE', 'ADIDAS', 'SAMSUNG', 'SONY',
    'AMAZON', 'META', 'TWITTER', 'INSTAGRAM', 'YOUTUBE', 'TIKTOK'
  ];

  const topRowClients = clients.slice(0, 9);
  const bottomRowClients = clients.slice(9);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section 
      id="clients" 
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-yellow-50 via-white to-yellow-100"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-500"
            variants={fadeInUp}
          >
            Brands We've Made Jump for Joy
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            From scrappy start ups to household names, our partners share one thing: a hunger to do things differently.
          </motion.p>
        </motion.div>
        
        {/* Case Study Snapshots */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-24"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">From Idea to Icon in 6 Weeks</h3>
            <p className="text-gray-600 mb-6 relative z-10">How we helped a new brand find its voice and visual identity in record time.</p>
            <span className="inline-block bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-100 group-hover:bg-blue-100 transition-colors duration-300">
              Branding
            </span>
          </motion.div>
          
          <motion.div 
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">Reinventing a Classic for Gen Z</h3>
            <p className="text-gray-600 mb-6 relative z-10">Breathing new life into a heritage brand for the next generation of consumers.</p>
            <span className="inline-block bg-purple-50 text-purple-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-purple-100 group-hover:bg-purple-100 transition-colors duration-300">
              Rebranding
            </span>
          </motion.div>
        </motion.div>

        {/* Client Logos Carousel */}
        <motion.div 
          className="mb-24"
          variants={fadeInUp}
        >
          <div className="overflow-hidden">
            {/* Top Row - Moving Right */}
            <div className="flex animate-marquee-right mb-8">
              {[...topRowClients, ...topRowClients].map((client, index) => (
                <ClientLogo key={index} name={client} index={index} />
              ))}
            </div>

            {/* Bottom Row - Moving Left */}
            <div className="flex animate-marquee-left">
              {[...bottomRowClients, ...bottomRowClients].map((client, index) => (
                <ClientLogo key={index} name={client} index={index + 9} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-24 max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          <motion.h3 
            className="text-4xl md:text-5xl font-black text-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Make Some Noise?
          </motion.h3>
          <motion.p 
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            If you're itching to build the next big thing—or reinvent the old thing—we should talk. 
            Slide into our inbox at <a href="mailto:contact@tpmx.com" className="text-blue-500 hover:underline font-medium">contact@tpmx.com</a> or drop us a line below. 
            We'll hit you back fast, because momentum matters.
          </motion.p>
          <motion.button 
            onClick={() => setShowContactForm(true)}
            className="relative overflow-hidden group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
              LET'S TALK
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;