import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ApartmentLayouts.module.css';
import LayoutChanger from './LayoutChanger/LayoutChanger';

const imgPath = (name) => `/src/assets/img/ApartmentLayouts/${name}`;

const ApartmentLayouts = () => {
  const { t } = useTranslation();
  const [selectedLayout, setSelectedLayout] = useState('1-room');
  
  const [hoveredId, setHoveredId] = useState(null);

  const handleLayoutChange = (layoutId) => {
    setSelectedLayout(layoutId);
  };

  // Данные для планировок
  const layoutsData = {
    '1-room': [
      {
        id: 1,
        image: imgPath('1k-1.webp'),
        scale: 1.8,
        price: '400 000 000',
        discount: '-15%',
        isHover: false
      },
      {
        id: 2,
        image: imgPath('1k-2.webp'),
        scale: 1.6,
        price: '400 000 000',
        discount: '-15%',
        isHover: false
      }
    ],
    '2-room': [
      {
        id: 3,
        image: imgPath('2k-1.webp'),
        scale: 1.5,
        price: '600 000 000',
        discount: '-3%',
        isHover: false
      },
      {
        id: 4,
        image: imgPath('2k-1.webp'),
        scale: 1.5,
        price: '580 000 000',
        discount: '-3%',
        isHover: false
      }
    ],
    '3-room': [
      {
        id: 5,
        image: imgPath('3k-1.webp'),
        scale: 1.15,
        price: '800 000 000',
        discount: '-2%',
        isHover: false
      },
      {
        id: 6,
        image: imgPath('3k-2.webp'),
        scale: 1.4,
        price: '800 000 000',
        discount: '-2%',
        isHover: false
      }
    ],
    '4-room': [
      {
        id: 7,
        image: imgPath('4k-1.webp'),
        scale: 1.1,
        price: '1 000 000 000',
        discount: '-2%',
        isHover: false
      },
      {
        id: 8,
        image: imgPath('4k-2.webp'),
        scale: 1.25,
        price: '1 000 000 000',
        discount: '-2%',
        isHover: false
      }
    ]
  };

  const currentLayouts = layoutsData[selectedLayout] || [layoutsData['1-room']];

  return (
    <section className={styles["apartment-layouts"]} id="layouts">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="discount-tag-clip-path">
            {/* Этот path ваш, но с исправленным синтаксисом. 
        Он рисует фигуру размером 39px в ширину и 80px в высоту.
      */}
            <path d="M 0 0 L 0 69 Q 0 71 2 71 Q 12 71 12 78 Q 12 80 14 80 L 35 80 Q 37 80 37 78 Q 37 71 46 71 Q 48 71 48 69 L 48 0 L 0 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles["apartment-layouts__container"]}>
        <div className={styles["apartment-layouts__header"]}>
          <h2 className={styles["apartment-layouts__title"]}>
            {t('layouts.sectionTitle')}
          </h2>

          <LayoutChanger onLayoutChange={handleLayoutChange} />
        </div>
        <div className={styles["apartment-layouts__content"]}>
          <div className={styles["apartment-layouts__grid"]}>
            {/* Первая карточка - "Все квартиры" */}
            <div className={styles["apartment-layouts__card"] + " " + styles["apartment-layouts__card--all"]}>
              <div className={styles["apartment-layouts__card-image"]}>
                <img
                  src={imgPath('all.png')}
                  alt={t('layouts.allApartments')}
                  className={styles["apartment-layouts__image"]}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles["apartment-layouts__card-content"]}>
                <h3 className={styles["apartment-layouts__card-title"]}>
                  {t('layouts.allApartments')}
                </h3>
              </div>
            </div>

            {/* Карточки планировок */}
            {currentLayouts.map((layout) => (
              <div key={layout.id} className={styles["apartment-layouts__card"]}
                onMouseEnter={() => setHoveredId(layout.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {layout.discount && (
                  <div className={styles["apartment-layouts__discount"]}>
                    {layout.discount}
                  </div>
                )}
                <div className={styles["apartment-layouts__card-image"]}>
                  <img
                    src={layout.image}
                    alt={`${t('layouts.layout')}`}
                    className={styles["apartment-layouts__image"]}
                    style={{
                      transform: hoveredId === layout.id ? `scale(${layout.scale})` : `scale(1)`,
                      transition: 'transform 0.3s ease-in-out' // ✨ Бонус: плавная анимация
                    }}
                  />
                </div>
                <div className={styles["apartment-layouts__card-content"]}>
                  <div className={styles["apartment-layouts__price"]}>
                    {layout.price} {t('layouts.currency')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApartmentLayouts;
