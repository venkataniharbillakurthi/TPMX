import React, { useEffect, useRef } from 'react';

const Manifesto = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lines = entry.target.querySelectorAll('.manifesto-line');
            lines.forEach((line, index) => {
              setTimeout(() => {
                line.classList.add('animate-fade-in-up');
              }, index * 800);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <div className="space-y-8">
          <h2 className="manifesto-line text-4xl md:text-6xl font-black text-white leading-tight opacity-0 transform translate-y-8">
            TECHNOLOGY IS OUR TOOL.
          </h2>
          <h2 className="manifesto-line text-4xl md:text-6xl font-black text-blue-500 leading-tight opacity-0 transform translate-y-8">
            PEOPLE ARE OUR PURPOSE.
          </h2>
          <h2 className="manifesto-line text-4xl md:text-6xl font-black text-white leading-tight opacity-0 transform translate-y-8">
            MEDIA IS OUR LEGACY.
          </h2>
        </div>
        
        <div className="mt-16">
          <p className="manifesto-line text-xl text-white/80 max-w-3xl mx-auto leading-relaxed opacity-0 transform translate-y-8">
            We believe in the power of purposeful design and strategic thinking. 
            Every project is an opportunity to create something that matters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;