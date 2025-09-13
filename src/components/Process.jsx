import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Ellipse3 from '../assests/Ellipse.svg';
import PencilImage from '../assests/PENCIL.svg';
import DigitalUX from '../assests/digital_UX.svg';
import MediaMagicGirl from '../assests/MEDIA_MAGIC_GIRL.svg';
import BrandingIdentity from '../assests/branding_and_identity.svg';

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

const Process = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '1');
            setActiveStep(stepIndex);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px' }
    );

    const stepElements = document.querySelectorAll('.process-step');
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="process" 
      ref={sectionRef} 
      className="relative py-20 overflow-visible bg-white md:py-32"
    >
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-black md:text-5xl">
            What We Do & How We Do It
          </h2>
        </motion.div>

        {/* Colored Bars Section */}
        <div className="flex flex-col justify-center w-full gap-12 md:flex-row">
          <div 
            className="h-[500px] w-full md:w-[500px] rounded-tl-[150px] shadow-2xl relative" 
            style={{ backgroundColor: '#940900' }}
          >
            <div className="flex flex-col h-full pt-16 pl-8 md:pl-16">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white font-poppins md:text-3xl">
                  Branding & Identity
                </h3>
                <motion.div 
                  className="relative pl-2 mt-2 border-l border-white/10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  variants={staggerContainer}
                >
                  {[
                    { text: 'Name it.', delay: 0.1 },
                    { text: 'Shape it.', delay: 0.2 },
                    { text: 'Launch it.', delay: 0.3 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative group py-0.5 pl-4 -ml-2 rounded-r-lg hover:bg-white/5 transition-colors duration-200 cursor-default"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            duration: 0.5, 
                            delay: item.delay,
                            ease: [0.16, 1, 0.3, 1]
                          } 
                        }
                      }}
                      whileHover={{ 
                        x: 6,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-0 group-hover:scale-100" />
                      <div className="absolute text-xl transition-all duration-200 transform translate-x-3 -translate-y-1/2 opacity-0 right-3 top-1/2 group-hover:opacity-100 group-hover:translate-x-0">
                        {item.emoji}
                      </div>
                      <span className="relative inline-block text-xl font-medium tracking-wide text-white md:text-2xl font-poppins">
                        <span className="relative z-10 flex items-center">
                          <span className="mr-2 text-sm transition-colors duration-200 text-white/40 group-hover:text-white">
                            0{index + 1}
                          </span>
                          <span>
                            {item.text}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-white to-white/0 group-hover:w-full transition-all duration-500 ease-out" />
                          </span>
                        </span>
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
                <p className="font-sans text-white text-base md:text-lg mt-2 leading-relaxed max-w-[90%]">
                  From logo systems to tone of voice, we give your brand a soul and a suit of armour.
                </p>
              </div>
              <motion.div 
                className="mt-auto -mb-8 -mr-16 overflow-visible origin-bottom-right"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <img 
                  src={BrandingIdentity} 
                  alt="Branding and Identity" 
                  className="w-full max-w-[240px] md:max-w-[340px]"
                />
              </motion.div>
            </div>
          </div>

          <div 
            className="h-[500px] w-full md:w-[500px] rounded-tl-[150px] shadow-2xl relative" 
            style={{ backgroundColor: '#080071' }}
          >
            <div className="flex flex-col h-full pt-16 pl-8 md:pl-16">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white font-poppins md:text-3xl">
                  Digital Experiences
                </h3>
                <p className="font-sans text-white text-base md:text-lg mt-8 leading-relaxed max-w-[90%]">
                  Websites, apps, AR filters—if it lives on a screen, we design and build it to be fast, beautiful and user-obsessed.
                </p>
              </div>
              <motion.div 
                className="mt-16 -mb-8 -mr-16 overflow-visible origin-bottom-right"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <img 
                  src={DigitalUX} 
                  alt="Digital Experiences" 
                  className="w-full max-w-[200px] md:max-w-[290px] translate-y-4"
                />
              </motion.div>
            </div>
          </div>

          <div 
            className="h-[500px] w-full md:w-[500px] rounded-tl-[150px] shadow-2xl relative" 
            style={{ backgroundColor: '#680982' }}
          >
            <div className="flex flex-col h-full pt-16 pl-8 md:pl-16">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white font-poppins md:text-3xl">
                  Media Magic
                </h3>
                <p className="font-sans text-white text-base md:text-lg mt-8 leading-relaxed max-w-[90%]">
                  Campaigns, content, influencers, SEO and paid media. We turn ideas into scroll stopping stories and measurable results.
                </p>
              </div>
              <motion.div 
                className="mt-12 -mb-8 -mr-16 overflow-visible origin-bottom-right"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <img 
                  src={MediaMagicGirl} 
                  alt="Media Magic" 
                  className="w-full max-w-[180px] md:max-w-[230px] translate-x-8"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Our Method Section */}
        <motion.div 
          className="relative py-20 overflow-visible bg-white mt-72"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          style={{ isolation: 'isolate' }}
        >
          {/* Circle Image (always visible) */}
          <img 
            src={Ellipse3} 
            alt="Background Circle" 
            className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] h-auto opacity-60 -z-10"
          />

          <div className="max-w-5xl mx-auto mb-16 text-center">
            <motion.div 
              className="relative flex justify-center mb-6 -top-24"
              variants={fadeInUp}
            >
              <span className="inline-block px-6 py-3 text-2xl font-bold text-gray-900 border-2 border-orange-400 border-dashed rounded-full md:text-4xl font-poppins md:px-8">
                Our Method
              </span>
            </motion.div>
          </div>

          {/* Desktop: Pencil + Overlay */}
          <motion.div 
            className="relative items-start justify-center hidden -mt-40 md:flex"
            variants={fadeInUp}
          >
            <img 
              src={PencilImage} 
              alt="Creative Process" 
              className="relative z-10 max-w-full h-auto max-h-[600px] -translate-y-24"
            />

            {/* Text overlays */}
            <div className="absolute top-0 left-0 z-20 w-full h-full pointer-events-none">
              <div className="relative w-full h-full">
                <div className="absolute" style={{ top: '15%', left: '59%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <span className="text-lg font-bold text-white font-satoshi md:text-2xl">Think Big</span>
                    <div className="absolute -translate-y-1/2 left-44 top-1/2 w-96">
                      <span className="block text-sm text-left text-black font-satoshi md:text-2xl">
                        Discover the opportunity and dream up the wow.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '29%', left: '41%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <div className="absolute right-48 -top-2 w-72">
                      <span className="block text-sm text-right text-black font-satoshi md:text-2xl">
                        Prototype, test and iterate with real users.
                      </span>
                    </div>
                    <span className="text-lg font-bold text-white font-satoshi md:text-2xl">Craft Smart</span>
                  </div>
                </div>
                <div className="absolute" style={{ top: '43%', left: '59%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <span className="text-lg font-bold text-white font-satoshi md:text-2xl">Make it real</span>
                    <div className="absolute -translate-y-1/2 left-48 top-1/2 w-72">
                      <span className="block text-sm text-left text-black font-satoshi md:text-2xl">
                        Discover the opportunity and dream up the wow.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '56%', left: '42%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <div className="absolute w-64 right-48 -top-2">
                      <span className="block text-sm text-right text-black font-satoshi md:text-2xl">
                        Distribute, optimise and scale until the world takes notice.
                      </span>
                    </div>
                    <span className="text-lg font-bold text-white font-satoshi md:text-2xl">Turn it up</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile: Stacked Steps (no pencil) */}
          <div className="flex flex-col items-center gap-8 px-4 md:hidden">
            <div className="w-full max-w-sm p-6 text-center bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-xl font-bold text-orange-600">Think Big</h3>
              <p className="text-base text-gray-700">
                Discover the opportunity and dream up the wow.
              </p>
            </div>
            <div className="w-full max-w-sm p-6 text-center bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-xl font-bold text-orange-600">Craft Smart</h3>
              <p className="text-base text-gray-700">
                Prototype, test and iterate with real users.
              </p>
            </div>
            <div className="w-full max-w-sm p-6 text-center bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-xl font-bold text-orange-600">Make it real</h3>
              <p className="text-base text-gray-700">
                Discover the opportunity and dream up the wow.
              </p>
            </div>
            <div className="w-full max-w-sm p-6 text-center bg-white shadow-lg rounded-xl">
              <h3 className="mb-2 text-xl font-bold text-orange-600">Turn it up</h3>
              <p className="text-base text-gray-700">
                Distribute, optimise and scale until the world takes notice.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
