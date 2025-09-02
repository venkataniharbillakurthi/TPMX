import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// Video is in the public directory

const Loading = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoading(false);
          onLoadingComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-80 h-80 md:w-96 md:h-96 relative"
        >
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=dhzhuobu2&public_id=logo_mklbsw&player[controls]=false&autoplay=true&muted=true&loop=true"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            className="w-full h-full object-contain"
            title="Loading Animation"
            style={{ pointerEvents: 'none' }}
          ></iframe>
        </motion.div>
        
        {/* Loading bar container */}
        <div className="w-48 h-1 mt-6 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-orange-400"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Loading percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 text-sm font-medium text-center text-gray-500"
        >
          {progress}%
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
