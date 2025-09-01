import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Parallax = ({ children, offset = 50, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

export const ParallaxBanner = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * (1 - speed)]);

  return (
    <div ref={ref} className={`relative h-screen overflow-hidden ${className}`}>
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
