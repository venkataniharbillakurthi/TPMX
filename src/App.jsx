import React, { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Mission from './components/Mission';
import Process from './components/Process';
import Manifesto from './components/Manifesto';
import Clients from './components/Clients';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Loading from './components/Loading';

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
    <div className="relative flex flex-col min-h-screen w-full">
      {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'} flex-1 flex flex-col w-full`}>
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Services />
          <Mission />
          <Process />
          <Clients />
          
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;