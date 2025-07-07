import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TypeChanger.module.css';

const TypeChanger = ({ onTypeChange }) => {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState('shopping');

  const typeOptions = [
    { 
      id: 'shopping', 
      key: 'places.shopping'
    },
    { 
      id: 'parks', 
      key: 'places.parks'
    },
    { 
      id: 'markets', 
      key: 'places.markets'
    },
    { 
      id: 'schools', 
      key: 'places.schools'
    },
    { 
      id: 'entertainment', 
      key: 'places.entertainment'
    }
  ];

  const handleTypeChange = (typeId) => {
    setActiveType(typeId);
    if (onTypeChange) {
      onTypeChange(typeId);
    }
  };

  return (
    <div className={styles["type-changer"]}>
      <div className={styles["type-changer__controls"]}>
        {typeOptions.map((type) => (
          <button
            key={type.id}
            className={`${styles["type-changer__button"]} ${
              activeType === type.id ? styles["type-changer__button--active"] : ''
            }`}
            onClick={() => handleTypeChange(type.id)}
          >
            {t(type.key)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TypeChanger;
