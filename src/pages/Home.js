import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import CustomSearch from '../components/CustomSearch';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MapComponent from '../components/MapComponent';
import SliderSection from '../components/SliderSection';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CustomSearch />
      {/* <SliderSection /> */}
      <MapComponent />
    </div>
  );
};

export default Home;
