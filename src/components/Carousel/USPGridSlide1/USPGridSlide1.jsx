import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './USPGridSlide1.module.css';
import CachedBackgroundImage from '../../CachedImage/CachedBackgroundImage';


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
    <div className={styles["usp5__container"]}>
      <div className={styles["usp5-wrapper"]}>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--left"]}>
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
              <CachedBackgroundImage
                src={imgPath(slide.left.img)}
                className={styles["usp5__img"] + ' ' + styles["usp5__img-zal"]}
                aria-label='ЖДУ ФОТО'
              />
            </div>
          </div>
        </div>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--center"]}>
          <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--top"]}>
            <CachedBackgroundImage
              src={imgPath(slide.center.img1)}
              className={styles["usp5__img"] + ' ' + styles["usp5__img-child"]}
              aria-label='ЖДУ ФОТО'
            />
          </div>
          <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--middle"]}>
            <CachedBackgroundImage
              src={imgPath(slide.center.img2)}
              className={styles["usp5__img"] + ' ' + styles["usp5__img-dvor"]}
              aria-label='ЖДУ ФОТО'
            />
          </div>
        </div>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--right"]}>
          <div className={styles["usp5__right-top-block"]}>
            <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block-right"]}>
              <CachedBackgroundImage
                src={imgPath(slide.right.img1)}
                className={styles["usp5__img"] + ' ' + styles["usp5_img--frontview"]}
                aria-label='ЖДУ ФОТО'
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
            <CachedBackgroundImage
              src={imgPath(slide.right.img2)}
              className={styles["usp5__img"] + ' ' + styles["usp5_img--bbq"]}
              aria-label='ЖДУ ФОТО'
            />
          </div>
        </div>
      </div>

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
          <div className={styles["usp5__mobile-bot-right-text"] + ' ' + styles["usp5__mobile-text"]+ ' ' + styles["tablet-mini-text"]}>
            {slide.left.list.split('\n').map((item, i) => <div key={i}>{item}</div>)}
          </div>
        </div>
        <div className={styles["usp5_mobile-content-block"]}>
          <div className={styles["usp5__mobile-row"]}>
            <div className={styles["usp5__mobile-top-left-img"]}
              style={{ backgroundImage: `url(${imgPath(slide.center.img2)})` }} aria-label='ЖДУ ФОТО'
            />
            <div className={styles["usp5__mobile-top-right-img"]}
              style={{ backgroundImage: `url(${imgPath(slide.left.img)})` }} aria-label='ЖДУ ФОТО'
            />
          </div>
          <div className={styles["usp5__mobile-row"]}>
            <div className={styles["usp5__mobile-bot-left-img"]}
              style={{ backgroundImage: `url(${imgPath(slide.center.img1)})` }} aria-label='ЖДУ ФОТО'
            />
            <div className={styles["usp5__mobile-bot-right-block"]}>
              <div className={styles["usp5__mobile-bot-right-text"] + ' ' + styles["usp5__mobile-text"]+ ' ' + styles["mobile-mini-text"]}>
                {slide.left.list.split('\n').map((item, i) => <div key={i}>{item}</div>)}
              </div>
              <div className={styles["usp5__mobile-bot-right-img"]}
                style={{ backgroundImage: `url(${imgPath(slide.right.img2)})` }} aria-label='ЖДУ ФОТО'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide1; 