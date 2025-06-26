import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Conception from './components/Conception/Conception';
import Carousel from './components/Carousel/Carousel';
import ApartmentLayouts from './components/ApartmentLayouts/ApartmentLayouts';
import PlacesAround from './components/PlacesAround/PlacesAround';
import Location from './components/Location/Location';
import CallUsBig from './components/CallUsBig/CallUsBig';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Conception />
      <Carousel />
      <ApartmentLayouts />
      <PlacesAround />
      <Location />
      <CallUsBig />
    </>
  );
}

export default App;
