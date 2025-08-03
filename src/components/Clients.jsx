import React, { useEffect, useRef } from 'react';

const Clients = () => {
  const sectionRef = useRef(null);

  const clients = [
    'APPLE', 'GOOGLE', 'MICROSOFT', 'NETFLIX', 'SPOTIFY', 'AIRBNB', 
    'UBER', 'TESLA', 'NIKE', 'ADIDAS', 'SAMSUNG', 'SONY',
    'AMAZON', 'META', 'TWITTER', 'INSTAGRAM', 'YOUTUBE', 'TIKTOK'
  ];

  const topRowClients = clients.slice(0, 9);
  const bottomRowClients = clients.slice(9);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white opacity-0 transform translate-y-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black leading-tight">
            THE PROOF
          </h2>
          <p className="text-xl text-gray-600 mt-6">
            Trusted by industry leaders
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="overflow-hidden">
          {/* Top Row - Moving Right */}
          <div className="flex animate-marquee-right mb-8">
            {[...topRowClients, ...topRowClients].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 px-8 py-4 border border-gray-200 hover:border-blue-500 transition-colors duration-300 group"
              >
                <span className="text-2xl font-black text-gray-400 group-hover:text-blue-500 transition-colors duration-300 whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Row - Moving Left */}
          <div className="flex animate-marquee-left">
            {[...bottomRowClients, ...bottomRowClients].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 px-8 py-4 border border-gray-200 hover:border-blue-500 transition-colors duration-300 group"
              >
                <span className="text-2xl font-black text-gray-400 group-hover:text-blue-500 transition-colors duration-300 whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <h3 className="text-3xl font-black text-black mb-8">
            READY TO BUILD YOUR BLUEPRINT?
          </h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <span className="group-hover:tracking-wider transition-all duration-300">LET'S TALK</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Clients;