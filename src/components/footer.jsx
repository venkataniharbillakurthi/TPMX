import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import upIcon from '../assests/UP_ICON.svg';
import footerImage from '../assests/photo_6100676465155754245_y.jpg';

const socialLinks = [
  { icon: <FaLinkedinIn size={20} />, url: 'https://linkedin.com' },
  { icon: <FaInstagram size={20} />, url: 'https://instagram.com' },
  { icon: <FaFacebookF size={20} />, url: 'https://facebook.com' },
  { icon: <FaTwitter size={20} />, url: 'https://twitter.com' }
];

const Footer = () => (
  <footer className="w-full mt-12">
    {/* Reduced height section */}
    <div className="w-full h-[250px] bg-black rounded-tl-[60px] rounded-tr-[60px] overflow-hidden">
      <img 
        src={footerImage} 
        alt="Footer Background" 
        className="w-[900px] h-[250px] object-cover mx-auto"
      />
    </div>
    
    <div className="w-full bg-black py-8 relative">
      <div className="w-full h-px bg-white mb-6"></div>
      
      <div className="container mx-auto  text-center max-w-3xl">
        <p className="text-white text-satoshi md:text-lg leading-relaxed">
          TPMX is a digital innovation agency where People, Tech, and Media converge to build brands that last. We craft impactful branding, seamless digital experiences, and result-driven media strategies. At TPMX, creativity meets technology to help businesses grow, scale, and thrive.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex space-x-3">
            {socialLinks.map((item, index) => (
              <a 
                key={index}
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
          <div className="text-white text-xs font-satoshi md:text-sm">
            © {new Date().getFullYear()} TPMX. All Rights Reserved
          </div>
        </div>
      </div>
      
      {/* Smaller scroll-up button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute -top-28 right-3 p-8  "
        aria-label="Scroll to top"
      >
        <img src={upIcon} alt="Up" className="w-15 h-15" />
      </button>
    </div>
  </footer>
);

export default Footer;
