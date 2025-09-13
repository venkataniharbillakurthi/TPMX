import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import msgLine from '../assests/msg line.svg';
import cycleGlobe from '../assests/CYCLE GLOBE 1.svg';
import DynamicImage from './DynamicImage';
import chatgptTech from '../assests/chatgpt-tech.jpg';
import perplexityTech from '../assests/perplexity-tech.png';
import veo3Tech from '../assests/veo3-tech.png';
import cursorTech from '../assests/cursor-tech.png';
import speedPeople from '../assests/speed-people.png';
import mrbeastPeople from '../assests/mrbeast-people.png';
import ranveerShowPeople from '../assests/the-ranveer-show-people.webp';
import instaMedia from '../assests/insta-media.jpg';
import facebookMedia from '../assests/facebook-media.jpg';
import xMedia from '../assests/x-media.jpg';
import rocket from '../assests/rocket.svg';
import './Services.css';

const ServiceCard = ({ emoji, title, description, index, dynamicImages }) => {
  const serviceTypes = ['tech', 'media', 'people'];
  const serviceType = serviceTypes[index % serviceTypes.length];
  
  return (
    <div 
      className={`service-card bg-white p-8 rounded-lg shadow-lg hover:shadow-xl ${serviceType}`}
    >
      <div className="flex items-start space-x-4 service-content">
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-4xl service-emoji">
          {dynamicImages ? (
            <DynamicImage images={dynamicImages} interval={2000} />
          ) : (
            <span className="inline-block">{emoji}</span>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-black font-poppins">
            {title}
          </h3>
          <p className="font-sans leading-relaxed text-black text-l">
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
    if (isInView && !hasAnimated) {
      // Start the rocket animation first; line reveal starts after rocket ends
      const rocketAnim = sectionRef.current?.querySelector('#rocketAnimServices');
      try {
        rocketAnim?.beginElement?.();
      } catch (e) {
        // no-op if not supported
      }
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
      className="relative px-4 pt-20 pb-32 overflow-hidden bg-white sm:px-6 lg:px-6"
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center w-full h-full"
        style={{
          marginTop: '120px',
          pointerEvents: 'none',
        }}
        variants={globeAnimation}
        initial="hidden"
        animate={isInView || hasAnimated ? "show" : "hidden"}
      >
        <div className="relative w-full h-full">
          {/* Inline SVG: yellow dotted curve revealed left-to-right (no rocket) */}
          <svg
            className="absolute transform -translate-x-1/2 left-1/2"
            style={{ top: 'calc(50% + 40px)', zIndex: 10 }}
            width="1415"
            height="210"
            viewBox="0 0 1415 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Reveal mask grows from left to right and also hides dots directly under the rocket */}
            <mask id="revealMaskServices">
              {/* White rect reveals path left-to-right */}
              <rect x="0" y="0" width="0" height="210" fill="white">
                <animate id="revealAnimServices" attributeName="width" from="0" to="1415" dur="10s" begin="rocketAnimServices.begin+0.2s" fill="freeze" />
              </rect>
              {/* Black circle punches a hole in the mask under the rocket to hide dots beneath it */}
              <g transform="translate(0,-12)">
                <circle r="18" fill="black">
                  <animateMotion begin="rocketAnimServices.begin" dur="10s" fill="freeze" rotate="auto">
                    <mpath href="#msgPathServices" />
                  </animateMotion>
                </circle>
              </g>
            </mask>

            {/* Dotted path (masked) */}
            <g mask="url(#revealMaskServices)">
              <path
                id="msgPathServices"
                d="M0.310373 3.12244C0.310373 3.12244 342.599 163.817 460.734 155.502C578.869 147.187 665.386 73.1958 796.823 62.4489C928.26 51.7019 1073 155.502 1167.1 161.336C1261.21 167.171 1382 127.5 1382 127.5"
                stroke="#A97C50"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="14 20"
                fill="none"
              />
            </g>

            {/* Rocket: larger size, slightly above path, with hover fly-out-and-back */}
            <g id="rocketFollower" transform="translate(0,-12)" style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
              <g transform="translate(-36,-36)">
                <image href={rocket} width="72" height="72" />
              </g>
              <animateMotion id="rocketAnimServices" begin="indefinite" dur="10s" fill="freeze" rotate="auto">
                <mpath href="#msgPathServices" />
              </animateMotion>
              {/* Hover: temporarily fly left and fade out, then return and fade in */}
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                values="0,0; 180,-120; 360,-180; 0,0" 
                keyTimes="0; 0.25; 0.6; 1" 
                dur="2s" 
                begin="rocketFollower.mouseover" 
                fill="remove" 
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0; 90; 90; 0"
                keyTimes="0; 0.25; 0.6; 1"
                dur="2s"
                begin="rocketFollower.mouseover"
                additive="sum"
                fill="remove"
              />
              <animate 
                attributeName="opacity" 
                values="1;1;0;0;1" 
                keyTimes="0;0.3;0.45;0.8;1" 
                dur="2.2s" 
                begin="rocketFollower.mouseover" 
                fill="remove" 
              />
            </g>
          </svg>
          
           <motion.div
            className="absolute transform -translate-y-1/2 top-1/2"
            style={{ left: 'calc(50% - 690px)',top: 'calc(50% - 210px)', zIndex: 5 }}
            animate={{
              y: [0, 10, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse'
            }}
          >
            <img 
              src={cycleGlobe} 
              alt="Cycle globe decoration" 
              className="w-full h-full"
            />
          </motion.div>
          
        </div>
      </motion.div>
      <div className="absolute inset-0 z-0 bg-white/20" />
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="grid items-start grid-cols-1 gap-12 lg:grid-cols-2"
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
                className="font-sans text-black"
                variants={item}
              >
                We stay plugged in so you don't have to. Tap into our brains and ride<br />
                the wave.
              </motion.p>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              className="space-y-4"
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