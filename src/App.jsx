import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Manifesto from './components/Manifesto';
import Clients from './components/Clients';

function App() {
  return (
    <div className="App">
      <Hero />
      <Services />
      <Process />
      <Manifesto />
      <Clients />
    </div>
  );
}

export default App;