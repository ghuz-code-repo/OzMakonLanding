import React, { useEffect } from 'react';
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
  useEffect(() => {
    // Google Tag Manager
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-PHCLCFF');

    // UTM Stat
    window.utmStatConf = {
      projectId: "615df58d028b8bea415591acdc788975",
      hasMetrika: true,
      hasAnalytics: true,
      useCookieSync: true
    };
    
    (function (u, t, m) {
      var s = u.createElement(t),
        n = u.getElementsByTagName(t)[0];
      s.type = "text/javascript";
      s.async = true;
      s.src = m + "?v=" + Date.now();
      n.parentNode.insertBefore(s, n);
    })(document, "script", "//static.utmstat.com/client.min.js");
  }, []);

  return (
    <MediaPreloaderProvider>
      <MediaInitializer>
        {/* <LoadingProgressAdvanced /> */}
        
        <Header />
        <Hero />
        <Conception />
        <Carousel />
        <ApartmentLayouts />
        <PlacesAround />
        <Location />
        <Callback />
        <Footer />
      </MediaInitializer>
    </MediaPreloaderProvider>
  );
}

export default App;
