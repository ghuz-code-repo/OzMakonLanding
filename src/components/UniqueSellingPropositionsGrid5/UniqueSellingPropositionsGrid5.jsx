import React from 'react';
import { useTranslation } from 'react-i18next';
import './UniqueSellingPropositionsGrid5.css';

const UniqueSellingPropositionsGrid5 = () => {
  const { t } = useTranslation();
  return (
    <section className="usp5__container">
      <div className="usp5-wrapper">
        {/* Левая колонка */}
        <div className="usp5-col usp5-col--left">
          <div className="usp5__left-top">
          <h2 className="usp5__title">{t('usp5.title')}</h2>
          <div className="usp5__left-top-text">
            <div className="usp5__list">
            <div>{t('usp5.list1')}</div>
            <div>{t('usp5.list2')}</div>
            <div>{t('usp5.list3')}</div>
          </div>
          <div className="usp5__year">2025</div>
          </div>
        </div>
        <div className="usp5__left-bottom">

          <div className="usp5__img-block usp5__img-block--bottom">
          <div className="usp5__line" />
              <div className="usp5__img usp5__img-zal"/>
            {/* <img src={usp1} alt="Фитнес-зал" className="usp5__img usp5__img-zal" /> */}
          </div>
        </div>
      </div>
      {/* Средняя колонка */}
      <div className="usp5-col usp5-col--center">
        <div className="usp5__img-block usp5__img-block--top">
          <div className="usp5__img usp5__img-child"/>
        </div>
        <div className="usp5__img-block usp5__img-block--middle">
          <div className="usp5__img usp5__img-dvor"/>
        </div>

      </div>
      {/* Правая колонка */}
      <div className="usp5-col usp5-col--right">
        <div className="usp5__img-block usp5__img-block--house">
          <div className='usp5_img--frontview'/>
        </div>
        <div className="usp5__textblock">
        {t('usp5.textblock').split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
        <div className="usp5__img-block usp5__img-block--bbq">
          <div className='usp5_img--bbq'/>
        </div>

      </div>
    </div>
    </section >
  );
};

export default UniqueSellingPropositionsGrid5; 