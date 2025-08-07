import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TechImage from '../Tech.svg';
import PeopleImage from '../People.svg';
import MediaImage from '../Media.svg';
import HeroBackground from '../Hero_Background_1.svg';
import './Hero.css';

const images = [
  { src: TechImage, alt: 'Tech', label: 'TECH' },
  { src: PeopleImage, alt: 'People', label: 'PEOPLE' },
  { src: MediaImage, alt: 'Media', label: 'MEDIA' }
];

const CARD_SIZE = 280;  // Increased from 240
const GAP = 140;        // Increased from 130 to spread images further apart
const ARC_RADIUS = 220;  // Increased from 200 to widen the arc
const CONTAINER_WIDTH = 900;  // Increased from 800 to accommodate wider spacing
const CENTER_Y = 400;    // Increased from 360 to move images down
const LIFT = 30;

const arcPositions = [
  { angle: Math.PI * 5/6, xShift: -GAP, yLift: -LIFT, rotate: -18, z: 1, scale: 0.9, opacity: 0.7 }, // left
  { angle: Math.PI / 2, xShift: 0, yLift: -20, rotate: 0, z: 2, scale: 1.3, opacity: 1 }, // center (larger and higher)
  { angle: Math.PI / 6, xShift: GAP, yLift: -LIFT, rotate: 18, z: 1, scale: 0.9, opacity: 0.7 } // right
];

const getCardLayout = (arcIdx) => {
  const pos = arcPositions[arcIdx];
  let x = CONTAINER_WIDTH / 2 + ARC_RADIUS * Math.cos(pos.angle) - CARD_SIZE / 2 + pos.xShift;
  let y = CENTER_Y - ARC_RADIUS * Math.sin(pos.angle) - CARD_SIZE / 2 + pos.yLift;
  return {
    x,
    y,
    z: pos.z,
    scale: pos.scale,
    rotate: pos.rotate,
  };
};

const Hero = () => {
  const [carousel, setCarousel] = useState([0, 1, 2]); // logical order of images
  const [centerImage, setCenterImage] = useState(1); // Track which image is in the center (1 is the middle index)
  const [animating, setAnimating] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const animatingRef = useRef(false);
  const scrollCountRef = useRef(0);
  const scrollTimeout = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    animatingRef.current = animating;
  }, [animating]);

  useEffect(() => {
    scrollCountRef.current = scrollCount;
  }, [scrollCount]);

  const handleWheel = (e) => {
    if (scrollCountRef.current < 3) {
      e.preventDefault();
      if (!animatingRef.current) {
        setAnimating(true);
        animatingRef.current = true;
        
        if (e.deltaY > 0) {
          // Scrolling down - move to next image
          setCarousel((prev) => {
            const newCarousel = [...prev];
            const first = newCarousel.shift();
            newCarousel.push(first);
            // The new center is at index 1 (middle position)
            setCenterImage(newCarousel[1]);
            return newCarousel;
          });
        } else if (e.deltaY < 0) {
          // Scrolling up - move to previous image
          setCarousel((prev) => {
            const newCarousel = [...prev];
            const last = newCarousel.pop();
            newCarousel.unshift(last);
            // The new center is at index 1 (middle position)
            setCenterImage(newCarousel[1]);
            return newCarousel;
          });
        }
        
        setScrollCount((count) => count + 1);
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setAnimating(false);
          animatingRef.current = false;
        }, 600);
      }
    }
  };

  useEffect(() => {
    const node = heroRef.current;
    if (node) {
      node.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (node) {
        node.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => setScrollCount(0);
    const handleMouseEnter = () => setScrollCount(0);
    const node = heroRef.current;
    if (node) {
      node.addEventListener('mouseleave', handleMouseLeave);
      node.addEventListener('mouseenter', handleMouseEnter);
    }
    return () => {
      if (node) {
        node.removeEventListener('mouseleave', handleMouseLeave);
        node.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative flex flex-col items-center justify-center overflow-hidden" 
      style={{ 
        height: '90vh', 
        marginTop: '10vh',
        backgroundImage: `url(${HeroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Tagline */}
      <div className="mt-12 md:mt-20 text-center">
        <div className="text-lg md:text-4xl font-montserrat tracking-wide mb-4 text-black">
          WHERE BRANDS ARE BORN AT THE INTERSECTION OF
        </div>
        <div className="text-3xl md:text-5xl font-black font-montserrat text-black mb-10 tracking-widest uppercase text-center">
          {images.map((img, idx) => (
            <span 
              key={img.alt}
              style={{
                color: centerImage === idx ? '#e30e00' : 'black',
                fontWeight: centerImage === idx ? 'bold' : 'normal',
                transition: 'all 0.3s ease-in-out'
              }}
              className="transition-colors duration-300"
            >
              {img.label}
              {idx < images.length - 1 && <span className="mx-0">.</span>}
            </span>
          ))}
        </div>
      </div>
      {/* Animated Cards with Framer Motion */}
      <div className="relative flex items-center justify-center w-full mt-4" style={{ height: '440px', maxWidth: '1000px' }}>
        {images.map((img, idx) => {
          // Find the arc position for this image in the current carousel order
          const arcIdx = carousel.indexOf(idx);
          const layout = getCardLayout(arcIdx);
          return (
            <motion.div
              key={idx}
              className="absolute shadow-lg rounded-2xl bg-gray-200 overflow-hidden"
              animate={{
                left: `calc(50% - ${CONTAINER_WIDTH / 2 - layout.x}px)` ,
                top: layout.y,
                scale: layout.scale,
                rotate: layout.rotate,
                zIndex: layout.z,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                width: `${CARD_SIZE}px`,
                height: `${CARD_SIZE}px`,
                zIndex: layout.z,
                boxShadow: layout.z === 2 ? '0 8px 32px rgba(0,0,0,0.18)' : '0 4px 16px rgba(0,0,0,0.10)'
              }}
            >
              <motion.div 
                className="w-full h-full relative"
                style={{ opacity: layout.opacity }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;