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
      className="relative py-20 md:py-32 overflow-visible bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            What We Do & How We Do It
          </h2>
        </motion.div>

        {/* Colored Bars Section */}
        <div className="flex flex-col md:flex-row justify-center gap-12 w-full">
          <div 
            className="h-[500px] w-full md:w-[500px] rounded-tl-[150px] shadow-2xl relative" 
            style={{ backgroundColor: '#940900' }}
          >
            <div className="pl-8 md:pl-16 pt-16 h-full flex flex-col">
              <div>
                <h3 className="font-poppins text-2xl md:text-3xl text-white">
                  Branding & Identity
                </h3>
                <p className="font-sans text-white text-lg mt-6 leading-relaxed">
                  Name it.<br />
                  Shape it.<br />
                  Launch it.
                </p>
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
            <div className="pl-8 md:pl-16 pt-16 h-full flex flex-col">
              <div>
                <h3 className="font-poppins text-2xl md:text-3xl text-white">
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
            <div className="pl-8 md:pl-16 pt-16 h-full flex flex-col">
              <div>
                <h3 className="font-poppins text-2xl md:text-3xl text-white">
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
          className="mt-72 relative py-20 overflow-visible bg-white"
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

          <div className="max-w-5xl mx-auto text-center mb-16">
            <motion.div 
              className="relative -top-24 flex justify-center mb-6"
              variants={fadeInUp}
            >
              <span className="text-2xl md:text-4xl font-bold font-poppins text-gray-900 px-6 md:px-8 py-3 rounded-full border-2 border-dashed border-orange-400 inline-block">
                Our Method
              </span>
            </motion.div>
          </div>

          {/* Desktop: Pencil + Overlay */}
          <motion.div 
            className="relative justify-center items-start -mt-40 hidden md:flex"
            variants={fadeInUp}
          >
            <img 
              src={PencilImage} 
              alt="Creative Process" 
              className="relative z-10 max-w-full h-auto max-h-[600px] -translate-y-24"
            />

            {/* Text overlays */}
            <div className="absolute z-20 w-full h-full top-0 left-0 pointer-events-none">
              <div className="relative w-full h-full">
                <div className="absolute" style={{ top: '15%', left: '59%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <span className="text-white font-bold font-satoshi text-lg md:text-2xl">Think Big</span>
                    <div className="absolute left-44 top-1/2 -translate-y-1/2 w-96">
                      <span className="text-black font-satoshi text-sm md:text-2xl text-left block">
                        Discover the opportunity and dream up the wow.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '29%', left: '41%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <div className="absolute right-48 -top-2 w-72">
                      <span className="text-black font-satoshi text-sm md:text-2xl text-right block">
                        Prototype, test and iterate with real users.
                      </span>
                    </div>
                    <span className="text-white font-bold font-satoshi text-lg md:text-2xl">Craft Smart</span>
                  </div>
                </div>
                <div className="absolute" style={{ top: '43%', left: '59%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <span className="text-white font-bold font-satoshi text-lg md:text-2xl">Make it real</span>
                    <div className="absolute left-48 top-1/2 -translate-y-1/2 w-72">
                      <span className="text-black font-satoshi text-sm md:text-2xl text-left block">
                        Discover the opportunity and dream up the wow.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '56%', left: '42%', transform: 'translateX(-50%)' }}>
                  <div className="relative">
                    <div className="absolute right-48 -top-2 w-64">
                      <span className="text-black font-satoshi text-sm md:text-2xl text-right block">
                        Distribute, optimise and scale until the world takes notice.
                      </span>
                    </div>
                    <span className="text-white font-bold font-satoshi text-lg md:text-2xl">Turn it up</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile: Stacked Steps (no pencil) */}
          <div className="flex flex-col items-center gap-8 md:hidden px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
              <h3 className="font-bold text-xl text-orange-600 mb-2">Think Big</h3>
              <p className="text-gray-700 text-base">
                Discover the opportunity and dream up the wow.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
              <h3 className="font-bold text-xl text-orange-600 mb-2">Craft Smart</h3>
              <p className="text-gray-700 text-base">
                Prototype, test and iterate with real users.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
              <h3 className="font-bold text-xl text-orange-600 mb-2">Make it real</h3>
              <p className="text-gray-700 text-base">
                Discover the opportunity and dream up the wow.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
              <h3 className="font-bold text-xl text-orange-600 mb-2">Turn it up</h3>
              <p className="text-gray-700 text-base">
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
