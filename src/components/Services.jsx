import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import backgroundImage from '../assests/background_2.svg';
import DynamicImage from './DynamicImage';
import chatgptTech from '../assests/chatgpt-tech.jpg';
import perplexityTech from '../assests/perplexity-tech.png';
import veo3Tech from '../assests/veo3-tech.jpg';
import cursorTech from '../assests/cursor-tech.png';
import speedPeople from '../assests/speed-people.webp';
import mrbeastPeople from '../assests/mrbeast-people.jpg';
import ranveerShowPeople from '../assests/the-ranveer-show-people.webp';
import instaMedia from '../assests/insta-media.jpg';
import facebookMedia from '../assests/facebook-media.jpg';
import xMedia from '../assests/x-media.jpg';

const ServiceCard = ({ emoji, title, description, index, dynamicImages }) => {
  const borderColors = ['#940900', '#080071', '#680082'];
  const borderColor = borderColors[index % borderColors.length];
  
  return (
    <div 
      className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
    >
      <div 
        className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: borderColor }}
      ></div>
      <div className="flex items-start space-x-4">
        <div className="text-4xl w-12 h-12 flex-shrink-0">
          {dynamicImages ? (
            <DynamicImage images={dynamicImages} interval={2000} />
          ) : (
            emoji
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-black font-poppins">
            {title}
          </h3>
          <p className="text-black leading-relaxed font-sans text-l">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const globeAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  const services = [
    {
      emoji: '🤖',
      title: 'Tech',
      description: 'AI-powered content, immersive AR, and smart automations we\'re already on what\'s next to deliver efficiency, convenience, and impact.',
      dynamicImages: [chatgptTech, perplexityTech, veo3Tech, cursorTech]
    },
    {
      emoji: '👥',
      title: 'People',
      description: 'Communities over consumers. Authenticity over ads. Diversity over sameness.',
      dynamicImages: [speedPeople, mrbeastPeople, ranveerShowPeople]
    },
    {
      emoji: '📺',
      title: 'Media',
      description: 'Live streams, shoppable reels, creator collabs—media is the new marketplace.',
      dynamicImages: [instaMedia, facebookMedia, xMedia]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative pt-32 pb-64 px-4 sm:px-6 lg:px-4 bg-white overflow-hidden"
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          marginTop: '140px',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        variants={globeAnimation}
        initial="hidden"
        animate={isInView || hasAnimated ? "show" : "hidden"}
      />
      <div className="absolute inset-0 bg-white/20 z-0" />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            variants={container}
            initial="hidden"
            animate={isInView || hasAnimated ? "show" : "hidden"}
          >
            {/* Left Column */}
            <motion.div 
              className="space-y-3"
              variants={item}
            >
              <motion.h2 
                className="text-xl font-sans font-bold text-[#e30e00] mb-1"
                variants={item}
              >
                The World We Play In
              </motion.h2>
              <motion.p 
                className="text-4xl text-black font-poppins"
                variants={item}
              >
                What's buzzing right now?
              </motion.p>
              <motion.p 
                className="text-black font-sans"
                variants={item}
              >
                We stay plugged in so you don't have to. Tap into our brains and ride<br />
                the wave.
              </motion.p>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              className="space-y-1"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={item}
                >
                  <ServiceCard
                    index={index}
                    emoji={service.emoji}
                    title={service.title}
                    description={service.description}
                    dynamicImages={service.dynamicImages}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;