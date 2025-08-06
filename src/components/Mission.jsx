import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

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

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  const title = "Why We Get Out of Bed".split(" ");
  const highlightWords = ['responsible', 'inclusive', 'fearless'];

  return (
    <section id="mission" className="py-32 bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={ref}
          className="text-center"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-gray-900 mb-12"
            variants={item}
          >
            {title.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3 last:mr-0"
                variants={wordAnimation}
                custom={i}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.div 
            className="mb-16"
            variants={item}
          >
            <motion.p 
              className="text-2xl md:text-3xl font-medium text-gray-800 max-w-3xl mx-auto leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Because the future needs better brands.
            </motion.p>
          </motion.div>
          
          <motion.p 
            className="mt-12 text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed"
            variants={item}
          >
            We're building tomorrow's brands to be {
              highlightWords.map((word, i) => (
                <React.Fragment key={i}>
                  <motion.span 
                    className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 1 + (i * 0.2),
                      type: 'spring',
                      stiffness: 300
                    }}
                  >
                    {word}
                  </motion.span>
                  {i < highlightWords.length - 1 ? ', ' : ' '}
                </React.Fragment>
              ))
            }From eco-friendly packaging to accessible digital products, we're here for big impact and long term love—not throwaway trends.
          </motion.p>
          
          <motion.div 
            className="mt-20 flex justify-center gap-8"
            variants={item}
          >
            {[ '💡', '🚀', '🌱'].map((emoji, index) => (
              <motion.div
                key={index}
                className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-3xl"
                initial={{ y: 0, scale: 1, rotate: 0 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.1, 
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ 
                  y: { 
                    repeat: Infinity, 
                    repeatType: 'reverse', 
                    duration: 2 + Math.random() * 2,
                    ease: 'easeInOut'
                  }
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
