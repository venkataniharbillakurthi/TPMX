import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Services from './components/Services';
import Mission from './components/Mission';
import Process from './components/Process';
import Manifesto from './components/Manifesto';
import Clients from './components/Clients';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Loading from './components/Loading';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    // Add a small delay before removing the loading screen
    setTimeout(() => {
      setIsLoading(false);
      // Add a class to the body to prevent scrolling while loading
      document.body.style.overflow = 'auto';
    }, 500);
  };

  // Prevent scrolling while loading
  if (isLoading) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <Router>
      <div className="relative flex flex-col w-full min-h-screen">
        {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
        <div className={`${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'} flex-1 flex flex-col w-full`}>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main className="flex-1">
                <Hero />
                <Services />
                <Mission />
                <Process />
                <Clients />
              </main>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;