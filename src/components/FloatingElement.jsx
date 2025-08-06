import { motion } from 'framer-motion';

const FloatingElement = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -15, 0],
      }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
