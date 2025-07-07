import React, { useState, useEffect } from 'react';
import styles from './PlacesAround.module.css';
import TypeChanger from './TypeChanger/TypeChanger';
import { useTranslation } from 'react-i18next';

// Импорт слайдов
import {
  ShoppingCenters,
  Parks,
  Markets,
  Schools,
  Entertainment
} from './Slides';

const PlacesAround = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState('shopping');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTypeChange = (typeId) => {
    if (typeId === selectedType) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setSelectedType(typeId);
      setIsAnimating(false);
    }, 150);
  };

  // Компоненты для каждого типа
  const slideComponents = {
    'shopping': ShoppingCenters,
    'parks': Parks,
    'markets': Markets,
    'schools': Schools,
    'entertainment': Entertainment
  };

  const CurrentSlide = slideComponents[selectedType];

  return (
    <section className={styles["places-around"]} id="places">
      <div className={styles["places-around__container"]}>
        <div className={styles["places-around__header"]}>
          <h2 className={styles["places-around__title"]}>
            {t('places.sectionTitle')}
          </h2>
        </div>
        
        <TypeChanger onTypeChange={handleTypeChange} />
        
        <div className={styles["places-around__content"]}>
          <div className={`${styles["places-around__slide"]} ${isAnimating ? styles["places-around__slide--animating"] : ''}`}>
            {CurrentSlide && <CurrentSlide />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacesAround;
