import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './USPGridSlide1.module.css';


const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/slide1/${name}`;

const USPGridSlide1 = () => {
  const { t } = useTranslation();
  const slide = {
    title: t('usp5.slide1.title'),
    left: {
      list: t('usp5.slide1.list'),
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
      text: t('usp5.slide1.textblock'),
    },
  };
  return (
    <div className={styles["usp5-wrapper"]}>
      <div className={styles["usp5-col"]+' '+styles["usp5-col--left"]}>
        <div className={styles["usp5-animatable"]}>
          <div className={styles["usp5__left-top"]}>
            <h2 className={styles["usp5__title"]}>
              {slide.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <div className={styles["usp5__left-top-text"]}>
              <div className={styles["usp5__list"]}>
                {slide.left.list.split('\n').map((item, i) => <div key={i}>{item}</div>)}
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
              style={{ backgroundImage: `url(${imgPath(slide.left.img)})` }} aria-label='ЖДУ ФОТО'
            />
          </div>
        </div>
      </div>
      <div className={styles["usp5-col"] + ' ' + styles["usp5-col--center"]}>
        <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--top"]}>
          <div
            className={styles["usp5__img"] + ' ' + styles["usp5__img-child"]}
            style={{ backgroundImage: `url(${imgPath(slide.center.img1)})` }} aria-label='ЖДУ ФОТО'
          />
        </div>
        <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--middle"]}>
          <div
            className={styles["usp5__img"] + ' ' + styles["usp5__img-dvor"]}
            style={{ backgroundImage: `url(${imgPath(slide.center.img2)})` }} aria-label='ЖДУ ФОТО'
          />
        </div>
      </div>
      <div className={styles["usp5-col"] + ' ' + styles["usp5-col--right"]}>
        <div className={styles["usp5__right-top-block"]}>
          <div className={styles["usp5__img-block"]+ ' ' + styles["usp5__img-block-right"]}>
            <div
              className={styles["usp5__img"] + ' ' + styles["usp5_img--frontview"]}
              style={{ backgroundImage: `url(${imgPath(slide.right.img1)})` }} aria-label='ЖДУ ФОТО'
            />
          </div>
          <div className={styles["usp5__textblock"]}>
            {slide.right.text.split('\n').map((line, i) => (
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
            style={{ backgroundImage: `url(${imgPath(slide.right.img2)})` }} aria-label='ЖДУ ФОТО'
          />
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide1; 