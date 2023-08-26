import React from 'react';
import CustomSearch from '../components/CustomSearch';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SliderSection from '../components/SliderSection';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CustomSearch />
      <SliderSection />
    </div>
  );
};

export default Home;
