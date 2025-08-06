import React from 'react';

const ServiceCard = ({ emoji, title, description, bgColor = 'bg-blue-500', textColor = 'text-white' }) => {
  return (
    <div 
      className={`relative ${bgColor} rounded-3xl p-8 transform hover:scale-105 hover:rotate-1 transition-all duration-500 overflow-hidden group`}
    >
      <div className="relative z-10">
        <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>
        <h3 className={`text-2xl font-bold ${textColor} mb-4`}>
          {title}
        </h3>
        <p className={`${textColor} opacity-90 leading-relaxed`}>
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

const Services = () => {
  const services = [
    {
      emoji: '🤖',
      title: 'Tech',
      description: 'AI powered content, immersive AR, micro automations—whatever\'s next, we\'re already on it.',
      bgColor: 'bg-blue-500'
    },
    {
      emoji: '👥',
      title: 'People',
      description: 'Communities over consumers. Authenticity over ads. Diversity over sameness.',
      bgColor: 'bg-purple-500'
    },
    {
      emoji: '📱',
      title: 'Media',
      description: 'Live streams, shoppable reels, creator collabs—media is the new marketplace.',
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="px-8 mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The World We Play In
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            What's buzzing right now?
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              emoji={service.emoji}
              title={service.title}
              description={service.description}
              bgColor={service.bgColor}
            />
          ))}
        </div>

        <p className="mt-20 text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          We stay plugged in so you don't have to. Tap into our brains and ride the wave.
        </p>
      </div>
    </section>
  );
};

export default Services;