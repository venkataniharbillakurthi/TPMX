import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import upIcon from '../assests/UP_ICON.svg';
import footerImage from '../assests/WHITE_TMPX_LOGO@300x.png';
import './SocialIcons.css';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import FallingText from './FallingText';
import Toast from './Toast';

const socialLinks = [
  { 
    icon: <FaFacebookF className="icon" />, 
    url: '#',
    name: 'Facebook',
    isActive: false
  },
  { 
    icon: <FaXTwitter className="icon" />, 
    url: '#',
    name: 'X (Twitter)',
    isActive: false
  },
  { 
    icon: <FaLinkedinIn className="icon" />, 
    url: '#',
    name: 'LinkedIn',
    isActive: false
  },
  { 
    icon: <FaInstagram className="icon" />, 
    url: 'https://www.instagram.com/_tpm_x',
    name: 'Instagram',
    isActive: true
  }
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const showToast = (message) => {
    setToast({ show: true, message });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    if (isInView) {
      controls.start("visible");
    }
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [controls, isInView]);

  return (
    <footer className="w-full mt-1" ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Background image section */}
        <motion.div 
          className="w-full h-[320px] bg-black rounded-tl-[60px] rounded-tr-[60px] overflow-hidden flex items-center justify-center p-8"
          variants={itemVariants}
        >
          <img 
            src={footerImage} 
            alt="TPMX Logo" 
            className="object-contain w-auto h-full"
            style={{ maxWidth: '100%' }}
          />
        </motion.div>
        
        <motion.div 
          className="relative w-full pt-2 pb-4 bg-black"
          variants={itemVariants}
        >
          <div className="w-full h-px mb-4 bg-white/20"></div>
          
          <div className="container max-w-3xl px-4 mx-auto mb-8 text-center">
            <div className="text-base leading-relaxed text-white/80 font-satoshi">
              <div className="flex items-center justify-center h-24">
                <FallingText
                  text="TPMX is a digital innovation agency where People, Tech, and Media converge to build brands that last. We craft impactful branding, seamless digital experiences, and result-driven media strategies."
                  highlightWords={["TPMX", "People", "Tech", "Media", "brands", "branding", "digital experiences", "media strategies"]}
                  highlightClass="highlighted"
                  trigger="hover"
                  backgroundColor="transparent"
                  wireframes={false}
                  gravity={0.3}
                  fontSize="1rem"
                  mouseConstraintStiffness={0.6}
                />
              </div>
            </div>
          </div>

          <div className="container px-4 mx-auto">
            <motion.div 
              className="flex flex-col items-center justify-between gap-4 md:flex-row"
              variants={itemVariants}
            >
              <ul className="flex justify-center social-list">
                {socialLinks.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative block group"
                      aria-label={item.name}
                      onClick={(e) => {
                        if (!item.isActive) {
                          e.preventDefault();
                          showToast(`${item.name} coming soon!`);
                        }
                      }}
                    >
                      {item.icon}
                      {!item.isActive && (
                        <span className="absolute px-2 py-1 text-xs text-white transition-opacity -translate-x-1/2 bg-black rounded opacity-0 pointer-events-none -top-8 left-1/2 whitespace-nowrap group-hover:opacity-100">
                          Coming Soon
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="text-sm text-white/70 font-satoshi">
                &copy; {new Date().getFullYear()} TPMX. All Rights Reserved
              </div>
            </motion.div>
          </div>
          
          {/* Scroll to Top Button */}
          {isVisible && (
            <div className="fixed z-50 bottom-4 right-12 sm:bottom-8 sm:right-16">
              <button
                onClick={scrollToTop}
                className="flex items-center justify-center w-12 h-12 p-3 transition-all duration-300 border rounded-full bg-black/80 hover:bg-black border-white/20"
                aria-label="Scroll to top"
              >
                <img 
                  src={upIcon} 
                  alt="" 
                  className="w-5 h-5"
                />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={closeToast} 
      />
    </footer>
  );
};

export default Footer;
