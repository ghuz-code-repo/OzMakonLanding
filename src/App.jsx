import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Conception from './components/Conception/Conception';
import Carousel from './components/Carousel/USPGridCarousel/USPGridCarousel';
import ApartmentLayouts from './components/ApartmentLayouts/ApartmentLayouts';
import PlacesAround from './components/PlacesAround/PlacesAround';
import Location from './components/Location/Location';
import Callback from './components/Callback/Callback';
import Footer from './components/Footer/Footer';

// Компоненты для предзагрузки медиафайлов
import { MediaPreloaderProvider } from './components/MediaPreloader/MediaPreloader';
import MediaInitializer from './components/MediaPreloader/MediaInitializer';
import LoadingProgressAdvanced from './components/MediaPreloader/LoadingProgressAdvanced';

function App() {
  return (
    <MediaPreloaderProvider>
      <MediaInitializer>
        <LoadingProgressAdvanced />
        <Header />
        <Hero />
        <Conception />
        <Carousel />

        <div className="hideable-content-below">
          <ApartmentLayouts />
          <PlacesAround />
          <Location />
          <Callback />
          <Footer />

        </div>
      </MediaInitializer>
    </MediaPreloaderProvider>
  );
}

export default App;
