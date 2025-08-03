import React, { useEffect, useRef } from 'react';
import { Palette, Code, Users } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach((child, index) => {
              // Clear any existing animation classes first
              child.classList.remove('animate-card-appear');
              
              // Force a reflow before adding the animation class again
              void child.offsetWidth;
              
              setTimeout(() => {
                child.classList.add('animate-card-appear');
              }, index * 300);
            });
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
     <>
      {/* Marquee Ticker */}
      <div className="overflow-hidden py-4 w-full bg-black">
        <div className="whitespace-nowrap animate-marquee">
          <span className="mx-8 text-2xl font-bold tracking-widest text-white">
            BRANDING • SOFTWARE • PORTFOLIOS • STRATEGY • BRANDING • SOFTWARE • PORTFOLIOS • STRATEGY • 
          </span>
        </div>
      </div>

      {/* Services Section */}
      <section ref={sectionRef} className="py-24 bg-white">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black leading-tight text-black opacity-0 transform translate-y-8 md:text-7xl animate-on-scroll">
              THE SCOPE
            </h2>
            <p className="mt-6 text-xl text-gray-600 opacity-0 transform translate-y-8 animate-on-scroll">
              What we do for the world
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Service 1 */}
            <div className="p-6 text-center rounded-lg opacity-0 transition-all duration-500 transform translate-y-8 cursor-pointer group animate-on-scroll hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:scale-105">
              <div className="flex justify-center items-center mx-auto mb-8 w-20 h-20 bg-blue-500 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-black text-black transition-colors duration-300 group-hover:text-blue-500">ELEVATING BRANDS</h3>
              <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                We craft visual identities that resonate. From logo design to complete brand systems, 
                we build the foundation of memorable brands.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-6 text-center rounded-lg opacity-0 transition-all duration-500 transform translate-y-8 cursor-pointer group animate-on-scroll hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:scale-105">
              <div className="flex justify-center items-center mx-auto mb-8 w-20 h-20 bg-blue-500 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-black text-black transition-colors duration-300 group-hover:text-blue-500">ENGINEERING PLATFORMS</h3>
              <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                We build robust digital experiences. From web applications to complex systems, 
                we turn ideas into powerful, scalable solutions.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-6 text-center rounded-lg opacity-0 transition-all duration-500 transform translate-y-8 cursor-pointer group animate-on-scroll hover:bg-white hover:shadow-xl hover:-translate-y-2 hover:scale-105">
              <div className="flex justify-center items-center mx-auto mb-8 w-20 h-20 bg-blue-500 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-black text-black transition-colors duration-300 group-hover:text-blue-500">CRAFTING NARRATIVES</h3>
              <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                We tell compelling stories. Through strategic content and media, 
                we help brands connect with their audience on a deeper level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;