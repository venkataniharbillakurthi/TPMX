import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookDemoModal from './BookDemoModal';
import { getPostById } from '../data/blogPosts';

const BlogPost = () => {
  const { postId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = () => {
      const foundPost = getPostById(postId);
      setPost(foundPost);
      setLoading(false);
    };
    
    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#940900] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Post not found</h2>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-[#940900] hover:text-[#680982] font-medium transition-colors duration-200"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="relative z-10 px-4 pt-24 pb-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-[#940900] hover:text-[#680982] font-medium transition-colors duration-200 group"
        >
          <svg 
            className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to All Blogs
        </Link>
      </div>
      
      {/* Header */}
      <header className="relative bg-white shadow-sm">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 text-white ${
              post.category === 'Tech' ? 'bg-[#940900]' :
              post.category === 'People' ? 'bg-[#080071]' :
              'bg-[#680982]'
            }`}>
              {post.category}
            </span>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <div className="flex items-center">
                <img 
                  className="w-10 h-10 mr-3 rounded-full" 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{post.date} · {post.readTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <article className="overflow-hidden bg-white shadow-lg rounded-2xl">
          <img 
            src={post.image} 
            alt={post.title} 
            className="object-cover w-full h-64 md:h-96"
          />
          
          <div className="p-6 md:p-8">
            <div className="prose max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Tags */}
            <div className="pt-6 mt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      post.category === 'Tech' ? 'bg-[#940900]/10 text-[#940900]' :
                      post.category === 'People' ? 'bg-[#080071]/10 text-[#080071]' :
                      'bg-[#680982]/10 text-[#680982]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="p-6 mt-12 bg-white shadow-lg rounded-2xl md:p-8">
          <div className="flex items-center">
            <img 
              className="w-16 h-16 rounded-full" 
              src={post.author.avatar} 
              alt={post.author.name} 
            />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{post.author.name}</h3>
              <p className="text-gray-600">{post.author.role}</p>
              <p className="mt-2 text-sm text-gray-500">
                {post.author.bio || 'Digital marketing enthusiast with a passion for AI and data-driven strategies.'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#940900] to-[#680982] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Ready to transform your digital marketing?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-red-100">
            Let's discuss how we can help you implement these strategies in your business.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#940900] hover:bg-[#7a0a00] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Book a Free Consultation
          </button>
        </div>
      </main>

      {/* Book Demo Modal */}
      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BlogPost;
