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
      <div className="relative flex flex-col items-center w-full max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto relative"
          style={{ paddingBottom: '100%' }} // 1:1 aspect ratio
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            webkit-playsinline="true"
            className="absolute inset-0 w-full h-full object-contain"
          >
            <source src="https://res.cloudinary.com/dhzhuobu2/video/upload/v1755885121/webvideo_hxmyjf.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
