import React, { useEffect, useState } from 'react';
import './InstantLoader.css';

const InstantLoader = ({ isLoading, onLoadingComplete }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Запускаем анимацию исчезновения
      setFadeOut(true);
      // Через время анимации полностью скрываем лоадер
      setTimeout(() => {
        setShowLoader(false);
        onLoadingComplete && onLoadingComplete();
      }, 500); // Время анимации fade-out
    }
  }, [isLoading, onLoadingComplete]);

  if (!showLoader) return null;

  return (
    <div className={`instant-loader ${fadeOut ? 'instant-loader--fade-out' : ''}`}>
      <div className="instant-loader__content">
        <div className="instant-loader__logo">
          <div className="instant-loader__logo-text">OZ MAKON</div>
          <div className="instant-loader__logo-subtitle">Golden House</div>
        </div>
        
        <div className="instant-loader__spinner">
          <div className="instant-loader__spinner-ring"></div>
          <div className="instant-loader__spinner-ring"></div>
          <div className="instant-loader__spinner-ring"></div>
        </div>
        
        <div className="instant-loader__text">
          Загружаем для вас лучший контент...
        </div>
        
        <div className="instant-loader__progress">
          <div className="instant-loader__progress-bar">
            <div className="instant-loader__progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantLoader;
