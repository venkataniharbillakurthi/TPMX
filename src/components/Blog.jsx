import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import PixelTransition from './PixelTransition';
import { getAllPosts } from '../data/blogPosts';
import './Blog.css';


import BlogHeaderImage from '../assests/blog-image2.png';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Available categories
  const categories = ['All', 'Tech', 'People', 'Media'];

  // Load posts when component mounts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Loading posts...');
        // Force a small delay to ensure the component mounts
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const allPosts = getAllPosts();
        console.log('Raw posts data:', allPosts);
        
        if (!Array.isArray(allPosts)) {
          throw new Error('Invalid posts data format');
        }
        
        // Normalize posts data
        const formattedPosts = allPosts.map((post, index) => ({
          id: post.id || `post-${Date.now()}-${index}`,
          title: post.title || 'Untitled Post',
          excerpt: post.excerpt || 'No excerpt available',
          category: (post.category || 'Uncategorized').trim(),
          date: post.date || new Date().toISOString(),
          image: post.image || 'https://via.placeholder.com/800x500?text=Blog+Image',
          tags: Array.isArray(post.tags) ? post.tags : [],
          readingTime: post.readingTime || 5,
          content: post.content || [],
          author: post.author || {
            name: 'Admin',
            role: 'Author',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=random'
          }
        }));
        
        console.log('Formatted posts:', formattedPosts);
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([{
          id: 1,
          title: 'Error Loading Posts',
          excerpt: 'There was an error loading the blog posts. Please try again later.',
          category: 'Error',
          date: new Date().toLocaleDateString(),
          image: 'https://via.placeholder.com/800x500?text=Error+Loading+Content',
          tags: ['error']
        }]);
      }
    };
    
    loadPosts();
  }, []);
  
  // Filter posts based on selected category
  const filteredPosts = React.useMemo(() => {
    console.log('Filtering posts. Selected category:', selectedCategory);
    console.log('Available posts:', posts);
    
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      console.log('No posts available to filter');
      return [];
    }
    
    const filtered = selectedCategory === 'All' 
      ? [...posts] 
      : posts.filter(post => 
          post.category && 
          typeof post.category === 'string' && 
          post.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    
    console.log('Filtered posts:', filtered);
    return filtered;
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


  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('show');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView, selectedCategory]); // Add selectedCategory to dependencies

  // Debug info
  console.log('Rering Blog component');
  console.log('Posts state:', posts);
  console.log('Filtered posts:', filteredPosts);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-12 md:py-20">
        
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-2xl text-center lg:text-left pt-14">
              <motion.h1 
                className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Digital Marketing 
                <span className="relative inline-block">
                  <span className="relative">Insights</span>
                </span>
              </motion.h1>
              
              <motion.p 
                className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover the latest trends, strategies, and insights in digital marketing to grow your business.
              </motion.p>
              
              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button 
                  onClick={() => document.getElementById('blog-posts').scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-6 py-3 bg-[#940900] text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#7a0700] hover:shadow-lg hover:shadow-[#940900]/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Read Latest Post
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#940900] to-[#7a0700] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full max-w-md mt-12 lg:max-w-none lg:w-1/2 lg:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={BlogHeaderImage}
                alt="Digital Marketing Insights"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">Explore Our Content</h2>
            <p className="max-w-2xl mx-auto text-gray-500">Browse through our latest articles and insights</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              
              return (
                <motion.button
                  key={category}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#940900] text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={isActive ? {} : { 
                    y: -2,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)' 
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {category === 'Tech' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10a1 1 0 01-1.64 0l-7-10A1 1 0 014 7h4V2a1 1 0 011.3-.954z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category === 'People' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    )}
                    {category === 'Media' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-8h1V5h-1v2zm-2 0V5H8v2h3zm-5 6h13a1 1 0 01.96 1.22l-6.5 7.5a1 1 0 01-1.06.32H18c-.69 0-1.33-.17-1.86-.45l-6.5-7.5a1 1 0 01-.16-1.15z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category === 'All' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category}
                  </span>
                  
                  {isActive && (
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-[#940900] to-[#7a0700] rounded-full -z-10"
                      layoutId="categoryIndicator"
                      initial={false}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 30 
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid - Redesigned */}
      <div id="blog-posts" className="py-16 bg-white min-h-[80vh]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate={controls}
            key={selectedCategory}
            ref={ref}
          >
            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-transparent"
                    variants={item}
                    whileHover={{ y: -8, scale: 1.02 }}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 z-10 transition-opacity duration-300 bg-gradient-to-b from-transparent to-black/30 mix-blend-multiply group-hover:opacity-75"></div>
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute z-20 bottom-4 left-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            post.category === 'Tech' ? 'bg-[#940900]' :
                            post.category === 'People' ? 'bg-[#080071]' :
                            'bg-[#680982]'
                          } text-white`}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </time>
                          <span>•</span>
                          <span>{Math.ceil(post.readingTime || 5)} min read</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#940900] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="flex-grow mb-5 text-gray-600 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="pt-4 mt-auto border-t border-gray-100">
                          <div className="flex items-center text-[#940900] font-medium group-hover:translate-x-1 transition-transform duration-200">
                            <span>Continue Reading</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))
              ) : (
                <div className="py-16 text-center col-span-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-gray-900">No posts found</h3>
                  <p className="text-gray-500">We couldn't find any posts in this category.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-white border-t border-gray-100">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Stay in the Loop</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
            Subscribe to our newsletter for the latest digital marketing insights and updates delivered to your inbox.
          </p>
          
          <div className="flex flex-col max-w-md gap-3 mx-auto sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-lg border-0 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#7a0700] transition-all duration-200"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (email) {
                  alert(`Thank you for subscribing with ${email}!`);
                  setEmail('');
                }
              }}
              className="px-6 py-3.5 bg-white text-[#940900] font-medium rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Subscribe Now
            </motion.button>
          </div>
          
          <p className="mt-4 text-sm text-white/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
