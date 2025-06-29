import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Conception from './components/Conception/Conception';
import UniqueSellingPropositionsGrid5 from './components/UniqueSellingPropositionsGrid5/UniqueSellingPropositionsGrid5';
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
      <UniqueSellingPropositionsGrid5 />
      <ApartmentLayouts />
      <PlacesAround />
      <Location />
      <CallUsBig />
    </>
  );
}

export default App;
