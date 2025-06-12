import React from 'react';
import './Carousel.css';
import YardImprovement from './components/YardImprovement/YardImprovement';
import Interier from './components/Interier/Interier';
import Parking from './components/Parking/Parking';
import Security from './components/Security/Security';

const Carousel = () => {
  return (
    <section className="carousel-section section">
      <h2>Carousel Section</h2>
      {/* 
        A real carousel (e.g., Bootstrap Carousel) would be implemented here.
        For now, just listing the components.
      */}
      <YardImprovement />
      <Interier />
      <Parking />
      <Security />
    </section>
  );
};

export default Carousel;
