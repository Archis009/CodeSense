import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';

const Landing = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Navbar /> {/* Reusing Navbar for now, normally would be a public nav */}
      <main>
        <Hero />
        {/* Additional sections will go here */}
      </main>
    </div>
  );
};

export default Landing;
