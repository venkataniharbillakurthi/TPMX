import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const Process = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: '01',
      title: '🚀 Branding & Identity',
      description:
        'Name it. Shape it. Launch it. From logo systems to tone of voice, we give your brand a soul and a suit of armour.',
      bgColor: 'bg-gradient-to-r from-pink-100 to-pink-200'
    },
    {
      number: '02',
      title: '💻 Digital Experiences',
      description:
        'Websites, apps, AR filters—if it lives on a screen, we design and build it to be fast, beautiful and user obsessed.',
      bgColor: 'bg-gradient-to-r from-blue-100 to-blue-200'
    },
    {
      number: '03',
      title: '📣 Media Magic',
      description:
        'Campaigns, content, influencers, SEO and paid media. We turn ideas into scroll stopping stories and measurable results.',
      bgColor: 'bg-gradient-to-r from-yellow-100 to-yellow-200'
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
    <section
      id="process"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-yellow-50 to-yellow-100"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tight">
            THE PROCESS
          </h2>
          <p className="text-xl text-gray-600 mt-6">
            What We Do & How We Do It
          </p>
        </div>

        {/* Sticky Step Number */}
        <div className="relative">
          <div className="sticky top-1/2 left-0 w-full pointer-events-none z-10">
            <div className="flex justify-start">
              <motion.div
                className="text-9xl md:text-[12rem] font-black text-blue-500/20 leading-none"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {steps[activeStep - 1]?.number}
              </motion.div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="relative -mt-24 md:-mt-36">
            {steps.map((step, index) => (
              <div
                key={index}
                className="process-step flex items-center min-h-[45vh] md:min-h-[55vh] py-6"
                data-step={index + 1}
              >
                <div className="w-full max-w-2xl ml-auto">
                  <div
                    className={`p-12 rounded-3xl shadow-2xl border-l-8 border-blue-400 transform transition-transform duration-300 hover:-translate-y-2 ${step.bgColor}`}
                  >
                    <div className="flex items-center mb-6">
                      <span className="text-4xl font-black text-blue-600 mr-4 drop-shadow-sm">
                        {step.number}
                      </span>
                      <h3 className="text-3xl font-black text-gray-800">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Method Section */}
        <motion.div
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900"
              variants={fadeInUp}
            >
              Our Method
            </motion.h3>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
            >
              {[
                '🌍 Think big – Discover the opportunity and dream up the wow.',
                '🛠️ Craft smart – Prototype, test and iterate with real users.',
                '🚀 Make it real – Design, develop and deploy with pixel perfect precision.',
                '📈 Turn it up – Distribute, optimise and scale until the world takes notice.'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
                  whileHover={{ y: -5 }}
                  variants={fadeInUp}
                >
                  <p className="text-lg text-gray-700">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
