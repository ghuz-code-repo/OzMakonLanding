import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './USPGridSlide1.module.css';
import CachedImage from '../../CachedImage/CachedImage';


const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/slide1/${name}`;

const USPGridSlide1 = () => {
  const { t, ready } = useTranslation();

  const getTranslation = (key, fallback) => {
    if (!ready) return fallback;
    const translation = t(key);
    return translation && translation !== key ? translation : fallback;
  };

  const slide = {
    title: getTranslation('usp5.slide1.title', 'Детская площадка\nи спорт'),
    left: {
      list: getTranslation('usp5.slide1.list', 'Детская площадка\nСпортивный зал\nБеговые дорожки'),
      year: '2025',
      img: 'sports.webp',
    },
    center: {
      img1: 'kids_room.webp',
      img2: 'eagle_view.webp',
    },
    right: {
      img1: 'front_view.webp',
      img2: 'bbq.webp',
      text: getTranslation('usp5.slide1.textblock', 'Активный образ жизни\nдля всей семьи'),
    },
  };

  const safeSplit = (text) => {
    if (!text || typeof text !== 'string') return [''];
    return text.split('\n');
  };

  return (
    <div className={styles["usp5__container"]}>
      <div className={styles["usp5-wrapper"]}>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--left"]}>
          <div className={styles["usp5-animatable"]}>
            <div className={styles["usp5__left-top"]}>
              <h2 className={styles["usp5__title"]}>
                {safeSplit(slide.title).map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <div className={styles["usp5__left-top-text"]}>
                <div className={styles["usp5__list"]}>
                  {safeSplit(slide.left.list).map((item, i) => <div key={i}>{item}</div>)}
                </div>
                <div className={styles["usp5__year"]}>{slide.left.year}</div>
              </div>
            </div>
          </div>
          <div className={styles["usp5__left-bottom"]}>
            <div className={styles["usp5__line"]} />
            <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--bottom"]}>
              <div
                className={styles["usp5__img"] + ' ' + styles["usp5__img-zal"]}
                style={{ backgroundImage: `url(${imgPath(slide.left.img)})` }}
                aria-label='Спортивный зал'
              />
            </div>
          </div>
        </div>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--center"]}>
          <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--top"]}>
            <div
              className={styles["usp5__img"] + ' ' + styles["usp5__img-child"]}
              style={{ backgroundImage: `url(${imgPath(slide.center.img1)})` }}
              aria-label='Детская комната'
            />
          </div>
          <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--middle"]}>
            <div
              className={styles["usp5__img"] + ' ' + styles["usp5__img-dvor"]}
              style={{ backgroundImage: `url(${imgPath(slide.center.img2)})` }}
              aria-label='Вид сверху'
            />
          </div>
        </div>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--right"]}>
          <div className={styles["usp5__right-top-block"]}>
            <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block-right"]}>
              <div
                className={styles["usp5__img"] + ' ' + styles["usp5_img--frontview"]}
                style={{ backgroundImage: `url(${imgPath(slide.right.img1)})` }}
                aria-label='Фасад здания'
              />
            </div>
            <div className={styles["usp5__textblock"]}>
              {safeSplit(slide.right.text).map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block-bottom-right"]}>
            <div
              className={styles["usp5__img"] + ' ' + styles["usp5_img--bbq"]}
              style={{ backgroundImage: `url(${imgPath(slide.right.img2)})` }}
              aria-label='Барбекю зона'
            />
          </div>
        </div>
      </div>

      {/* Мобильная версия - используем обычные img теги */}
      <div className={styles["usp5__mobile-wrapper"]}>
        <div className={styles["usp5__mobile-top-row"]}>
          <div>
            <div className={styles["usp5__mobile-title"]}>
              <h2 className={styles["usp5__title"]}>
                {slide.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
            </div>

            <div className={styles["usp5__mobile-textblock"]}>
              <div className={styles["usp5__mobile-text"]}>
                {slide.right.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles["usp5__mobile-year"] + ' ' + styles["usp5__mobile-text"]}>
                {slide.left.year}
              </div>
            </div>
          </div>
          <div className={styles["usp5__mobile-bot-right-text"] + ' ' + styles["usp5__mobile-text"] + ' ' + styles["tablet-mini-text"]}>
            {slide.left.list.split('\n').map((item, i) => <div key={i}>{item}</div>)}
          </div>
        </div>
        <div className={styles["usp5_mobile-content-block"]}>
          <div className={styles["usp5__mobile-row"]}>
            <CachedImage
                src={imgPath(slide.left.img)}
                alt='Вид сверху'
                className={styles["usp5__mobile-top-left-img"]}
            />
            <CachedImage
                src={imgPath(slide.left.img)}
                alt='Спортивный зал'
                className={styles["usp5__mobile-top-right-img"]}
            />
          </div>
          <div className={styles["usp5__mobile-row"]}>
            <CachedImage
                src={imgPath(slide.center.img1)}
                alt='Детская комната'
                className={styles["usp5__mobile-bot-left-img"]}
            />
            <div className={styles["usp5__mobile-bot-right-block"]}>
              <div className={styles["usp5__mobile-bot-right-text"] + ' ' + styles["usp5__mobile-text"] + ' ' + styles["mobile-mini-text"]}>
                {safeSplit(slide.left.list).map((item, i) => <div key={i}>{item}</div>)}
              </div>
              <CachedImage
                src={imgPath(slide.right.img2)}
                alt='Барбекю зона'
                className={styles["usp5__mobile-bot-right-img"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide1;