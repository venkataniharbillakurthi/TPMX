import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import PixelTransition from './PixelTransition';
import { getAllPosts } from '../data/blogPosts';
import './Blog.css';

// Import illustrations
import BlogIllustration from '../assests/rocket.svg';
import TechIllustration from '../assests/veo3-tech.png';
import PeopleIllustration from '../assests/speed-people.png';
import MediaIllustration from '../assests/insta-media.jpg';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Available categories
  const categories = ['All', 'Tech', 'People', 'Media'];

  // Load posts when component mounts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = getAllPosts();
        // Normalize categories to match our filter options (capitalized first letter)
        const formattedPosts = allPosts.map(post => {
          let normalizedCategory = 'Uncategorized';
          
          // Map the category to match our filter options
          if (post.category) {
            const lowerCategory = post.category.toLowerCase();
            if (lowerCategory === 'tech' || lowerCategory === 'technology') {
              normalizedCategory = 'Tech';
            } else if (lowerCategory === 'people') {
              normalizedCategory = 'People';
            } else if (lowerCategory === 'media') {
              normalizedCategory = 'Media';
            } else {
              normalizedCategory = post.category.charAt(0).toUpperCase() + post.category.slice(1);
            }
          }
          
          return {
            ...post,
            category: normalizedCategory
          };
        });
        
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      }
    };
    
    loadPosts();
  }, []);
  
  // Filter posts based on selected category
  const filteredPosts = React.useMemo(() => {
    if (!posts || posts.length === 0) return [];
    
    return selectedCategory === 'All' 
      ? [...posts] 
      : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [posts, selectedCategory]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.96
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.5
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.98,
      transition: { 
        duration: 0.15,
        ease: 'easeInOut'
      }
    }
  };

  const hoverEffect = {
    scale: 1.02,
    y: -5,
    transition: { 
      type: 'spring',
      stiffness: 200,
      damping: 10
    }
  };

  const tapEffect = {
    scale: 0.98
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('show');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView, selectedCategory]); // Add selectedCategory to dependencies

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }
            }
          }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ 
              scale: 1,
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-red-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ 
              scale: 1.1,
              transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
            className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Digital Marketing Insights</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the latest trends, strategies, and insights in digital marketing across technology, people, and media.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mt-6"></div>
        </motion.div>


        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => {
            // Get the appropriate illustration for each category
            let illustration;
            switch(category) {
              case 'Tech':
                illustration = TechIllustration;
                break;
              case 'People':
                illustration = PeopleIllustration;
                break;
              case 'Media':
                illustration = MediaIllustration;
                break;
              default:
                illustration = BlogIllustration;
            }
            
            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 flex flex-col items-center ${
                  selectedCategory === category 
                    ? category === 'Tech' ? 'bg-[#940900]/10 ring-2 ring-[#940900]' : 
                      category === 'People' ? 'bg-[#080071]/10 ring-2 ring-[#080071]' : 
                      category === 'Media' ? 'bg-[#680982]/10 ring-2 ring-[#680982]' :
                      'bg-gray-800/10 '
                    : 'bg-white hover:bg-gray-50 ring-1 ring-gray-200'
                }`}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  borderColor: 'transparent'
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-2">
                  <img 
                    src={illustration} 
                    alt={`${category} illustration`} 
                    className={`w-full h-full object-cover rounded-full ${
                      selectedCategory === category ? 'ring-2 ring-offset-2' : ''
                    } ${
                      category === 'Tech' ? 'ring-[#940900]' : 
                      category === 'People' ? 'ring-[#080071]' : 
                      category === 'Media' ? 'ring-[#680982]' : 
                      'ring-gray-800'
                    }`}
                  />
                </div>
                <span className="font-medium text-gray-800">{category}</span>
                {selectedCategory === category && (
                  <motion.div 
                    className="absolute -bottom-2 w-1/2 h-1 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: 1,
                      backgroundColor: 
                        category === 'Tech' ? '#940900' : 
                        category === 'People' ? '#080071' : 
                        category === 'Media' ? '#680982' : 
                        '#1F2937'
                    }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={controls}
          key={selectedCategory} // Force re-render when category changes
        >
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-50 overflow-hidden h-full flex flex-col relative group"
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  whileHover="hover"
                  transition={{ 
                    type: 'spring',
                    stiffness: 120,
                    damping: 14,
                    mass: 0.5
                  }}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <motion.div 
                      className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                        post.category === 'Tech' ? 'bg-[#940900]' : 
                        post.category === 'People' ? 'bg-[#080071]' : 'bg-[#680982]'
                      } text-white`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.2 }
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {post.category}
                    </motion.div>
                  </div>

                  {/* Image with PixelTransition */}
                  <motion.div 
                    className="h-48 overflow-hidden relative"
                    whileHover={{
                      scale: 1.03,
                      transition: {
                        duration: 0.3,
                        ease: 'easeOut'
                      }
                    }}
                  >
                    <Link to={`/blog/${post.id}`} className="block h-full w-full">
                      <PixelTransition
                        firstContent={
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        }
                        secondContent={
                          <div className={`w-full h-full flex items-center justify-center p-4 ${
                            post.category === 'Tech' ? 'bg-[#940900]' : 
                            post.category === 'People' ? 'bg-[#080071]' : 'bg-[#680982]'
                          }`}>
                            <div className="text-center text-white">
                              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-lg font-bold uppercase tracking-wider">
                                {post.category}
                              </span>
                            </div>
                          </div>
                        }
                        gridSize={8}
                        pixelColor='#ffffff'
                        animationStepDuration={0.3}
                        className="h-full w-full"
                      />
                    </Link>
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    className="p-6 flex-1 flex flex-col"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.1,
                        duration: 0.3 
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Link to={`/blog/${post.id}`} className="hover:text-red-600 transition-colors">
                        <span>{post.date}</span>
                      </Link>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      <Link to={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            post.category === 'Tech' ? 'bg-[#940900]/10 text-[#940900]' : 
                            post.category === 'People' ? 'bg-[#080071]/10 text-[#080071]' : 'bg-[#680982]/10 text-[#680982]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="px-6 pt-4">
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  </div>

                  {/* Read More Button */}
                  <motion.div 
                    className="px-6 pb-6 pt-0 mt-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.15,
                        duration: 0.3 
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/blog/${post.id}`} className="inline-block group/readmore">
                      <motion.span 
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        whileHover={{ 
                          x: 4,
                          color: post.category === 'Tech' ? '#940900' : 
                                post.category === 'People' ? '#080071' : 
                                '#680982'
                        }}
                      >
                        Read more
                        <motion.svg 
                          className="w-4 h-4 ml-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          initial={{ x: 0 }}
                          animate={{ 
                            x: 0,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </motion.svg>
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.article>
              )))
          : (
            <motion.div 
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

        {/* Newsletter Section */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated with Our Latest Insights</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest digital marketing tips and strategies directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button 
              onClick={() => {
                // Here you would typically handle the subscription logic
                console.log('Subscribed with email:', email);
                // Clear the input field after subscription
                setEmail('');
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
