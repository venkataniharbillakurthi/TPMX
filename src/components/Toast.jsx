import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-6 right-6 bg-black text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 border border-red-600"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-sm">{message}</span>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 text-gray-300 hover:text-white transition-colors flex-shrink-0"
            aria-label="Close notification"
          >
            <FaTimes className="w-4 h-4" />
          </button>
          
          {/* Progress bar */}
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-red-600"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
