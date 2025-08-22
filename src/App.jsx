import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Mission from './components/Mission';
import Process from './components/Process';
import Manifesto from './components/Manifesto';
import Clients from './components/Clients';
import Navbar from './components/Navbar';
import Footer from './components/footer';

function App() {
  return (
        <div >
      <Navbar />
      <Hero />
      <Services />
      <Mission />
      <Process />
      <Clients />
      <Footer />
    </div>
  );
}

export default App;