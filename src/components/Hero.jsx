import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="overflow-hidden relative w-full h-screen bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r via-transparent animate-pulse from-blue-500/20 to-blue-500/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-xl animate-bounce bg-blue-500/10"></div>
            <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full blur-2xl delay-1000 animate-pulse bg-blue-500/5"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-blue-500/10 animate-spin-slow"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        ref={videoRef}
        className="relative z-10 flex flex-col justify-center items-center px-8 h-full text-center opacity-0 transform translate-y-8"
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="px-6 py-3 text-4xl font-black tracking-widest text-white border-2 border-white">
            TPMX
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-6xl font-black tracking-tight leading-none text-white md:text-8xl">
          WE BUILD<br />
          <span className="text-blue-500">BRAND SYSTEMS</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-xl font-light leading-relaxed text-white/80 md:text-2xl">
          Technology. People. Media. The complete blueprint for brand success.
        </p>

        {/* CTA Button */}
        <button className="px-8 py-4 mt-12 text-lg font-semibold text-white bg-blue-500 transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-2xl group">
          <span className="transition-all duration-300 group-hover:tracking-wider">VIEW OUR WORK</span>
        </button>
      </div>


    </section>
  );
};

export default Hero;