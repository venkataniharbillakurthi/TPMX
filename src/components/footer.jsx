import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import upIcon from '../assests/UP_ICON.svg';
import footerImage from '../assests/WHITE_TMPX_LOGO@300x.png';
import './SocialIcons.css';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const socialLinks = [
  { icon: <FaFacebookF className="icon" />, url: 'https://www.facebook.com/profile.php?id=61578970899760' },
  { icon: <FaTwitter className="icon" />, url: 'https://twitter.com' },
  { icon: <FaLinkedinIn className="icon" />, url: 'https://linkedin.com' },
  { icon: <FaInstagram className="icon" />, url: 'https://www.instagram.com/_tpm_x' }
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
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
            className="h-full w-auto object-contain"
            style={{ maxWidth: '100%' }}
          />
        </motion.div>
        
        <motion.div 
          className="w-full bg-black pt-2 pb-4 relative"
          variants={itemVariants}
        >
          <div className="w-full h-px bg-white/20 mb-4"></div>
          
          <div className="container mx-auto text-center max-w-3xl px-4 mb-8">
            <p className="text-white/80 font-satoshi text-base leading-relaxed">
              TPMX is a digital innovation agency where People, Tech, and Media converge to build brands that last. We craft impactful branding, seamless digital experiences, and result-driven media strategies.
            </p>
          </div>

          <div className="container mx-auto px-4">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center gap-4"
              variants={itemVariants}
            >
              <ul className="social-list flex justify-center">
                {socialLinks.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`${item.url.includes('facebook') ? 'Facebook' : 
                        item.url.includes('twitter') ? 'Twitter' : 
                        item.url.includes('linkedin') ? 'LinkedIn' : 'Instagram'}`}
                    >
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="text-white/70 text-sm font-satoshi">
                &copy; {new Date().getFullYear()} TPMX. All Rights Reserved
              </div>
            </motion.div>
          </div>
          
          {/* Scroll to Top Button */}
          {isVisible && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-20 right-8 bg-black/80 hover:bg-black p-3 rounded-full transition-all duration-300 z-50 border border-white/20"
              aria-label="Scroll to top"
            >
              <img 
                src={upIcon} 
                alt="Scroll to top" 
                className="w-6 h-6"
              />
            </button>
          )}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
