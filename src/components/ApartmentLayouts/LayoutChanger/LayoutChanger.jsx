import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LayoutChanger.module.css';

const LayoutChanger = ({ onLayoutChange }) => {
  const { t } = useTranslation();
  const [activeLayout, setActiveLayout] = useState('1-room');

  const layoutOptions = [
    { 
      id: '1-room', 
      key: 'layouts.oneRoom'
    },
    { 
      id: '2-room', 
      key: 'layouts.twoRoom'
    },
    { 
      id: '3-room', 
      key: 'layouts.threeRoom'
    },
    { 
      id: '4-room', 
      key: 'layouts.fourRoom'
    }
  ];

  const handleLayoutChange = (layoutId) => {
    setActiveLayout(layoutId);
    if (onLayoutChange) {
      onLayoutChange(layoutId);
    }
  };

  return (
    <div className={styles["layout-changer"]}>
      <div className={styles["layout-changer__controls"]}>
        {layoutOptions.map((layout) => (
          <button
            key={layout.id}
            className={`${styles["layout-changer__button"]} ${
              activeLayout === layout.id ? styles["layout-changer__button--active"] : ''
            }`}
            onClick={() => handleLayoutChange(layout.id)}
          >
            {t(layout.key)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LayoutChanger;