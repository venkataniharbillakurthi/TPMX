import React, { useEffect, useRef, useState } from 'react';

const Process = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: '01',
      title: 'DISCOVERY',
      description: 'We dive deep into your brand, understanding your vision, goals, and the market landscape. This foundation shapes everything that follows.'
    },
    {
      number: '02',
      title: 'STRATEGY',
      description: 'We develop a comprehensive blueprint that aligns your brand positioning with market opportunities and user needs.'
    },
    {
      number: '03',
      title: 'DESIGN',
      description: 'We bring the strategy to life through compelling visual design, creating systems that are both beautiful and functional.'
    },
    {
      number: '04',
      title: 'DEVELOPMENT',
      description: 'We build robust, scalable solutions using cutting-edge technology, ensuring performance and reliability at every level.'
    },
    {
      number: '05',
      title: 'LAUNCH',
      description: 'We deploy your brand into the world with precision, monitoring performance and optimizing for maximum impact.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '1');
            setActiveStep(stepIndex);
          }
        });
      },
      { threshold: 0.6 }
    );

    const stepElements = document.querySelectorAll('.process-step');
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black leading-tight">
            THE PROCESS
          </h2>
          <p className="text-xl text-gray-600 mt-6">
            How we do it
          </p>
        </div>

        <div className="relative">
          {/* Sticky Number */}
          <div className="sticky top-1/2 left-0 w-full pointer-events-none z-10">
            <div className="flex justify-start">
              <div className="text-9xl md:text-[12rem] font-black text-blue-500/20 leading-none transition-all duration-500">
                {steps[activeStep - 1]?.number}
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="relative -mt-32 md:-mt-48">
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-step min-h-screen flex items-center"
                data-step={index + 1}
              >
                <div className="w-full max-w-2xl ml-auto">
                  <div className="bg-white p-12 rounded-lg shadow-lg">
                    <div className="flex items-center mb-6">
                      <span className="text-3xl font-black text-blue-500 mr-4">
                        {step.number}
                      </span>
                      <h3 className="text-3xl font-black text-black">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;