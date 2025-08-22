import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import creativeHome from '../assests/CREATIVE HOME.svg';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  }
};

const Mission = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [controls, isInView]);

  const highlightWords = ['responsible', 'inclusive', 'fearless'];

  return (
    <section id="mission" className="pt-1 pb-1 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={container}
            className="lg:pr-22"
          >
            <motion.h2 
              className="text-1xl md:text-2xl mb-2   font-sans"
              style={{ color: '#e30e00' }}
              variants={item}
            >
              Why We Get Out of Bed
            </motion.h2>
            
            <motion.div className="mb-6" variants={item}>
              <motion.p 
                className="text-3xl font-medium leading-relaxed font-poppins"
                style={{ color: '#000000' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Because the future needs better brands.
              </motion.p>
              <div className="w-54 h-0.5 bg-gray-300 my-6"></div>
            </motion.div>
            
            <motion.p 
              className="text-lg leading-relaxed font-sans text-black"
              variants={item}
            >
              We're building tomorrow's brands to be responsible, inclusive, fearless. From eco‑friendly packaging to accessible digital products, we're here for big impact and long‑term love not throwaway trends.
            </motion.p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img 
              src={creativeHome} 
              alt="Creative Home" 
              className="max-w-full h-auto max-h-[500px] object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
