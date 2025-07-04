import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Conception from './components/Conception/Conception';
import Carousel from './components/Carousel/USPGridCarousel/USPGridCarousel';
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
      <div className="hideable-content-below">
        <ApartmentLayouts />
        <PlacesAround />
        <Location />
        <CallUsBig />
      </div>
    </>
  );
}

export default App;
