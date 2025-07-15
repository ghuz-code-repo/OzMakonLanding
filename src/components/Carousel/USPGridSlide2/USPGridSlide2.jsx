import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './USPGridSlide2.module.css';


const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/slide2/${name}`;

const USPGridSlide2 = () => {
  const { t } = useTranslation();
  const slide = {
    title: t('usp5.slide2.title'),
    left: {
      list: t('usp5.slide2.list'),
      year: '2025',
      img: 'enter.webp',
    },
    center: {
      img1: 'lift.webp',
      img2: 'hall.webp',
    },
    right: {
      img1: 'komnata.webp',
      img2: 'coffe_table.webp',
      text: t('usp5.slide2.textblock'),
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
              <div
                className={styles["usp5__img"] + ' ' + styles["usp5__img-enter"]}
                style={{ backgroundImage: `url(${imgPath(slide.left.img)})` }} aria-label='ЖДУ ФОТО'
              />
            </div>
          </div>
        </div>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--center"]}>
          <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--top"]}>
            <div
              className={styles["usp5__img"] + ' ' + styles["usp5__img-lift"]}
              style={{ backgroundImage: `url(${imgPath(slide.center.img1)})` }} aria-label='ЖДУ ФОТО'
            />
          </div>
          <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block--middle"]}>
            <div
              className={styles["usp5__img"] + ' ' + styles["usp5__img-hall"]}
              style={{ backgroundImage: `url(${imgPath(slide.center.img2)})` }} aria-label='ЖДУ ФОТО'
            />
          </div>
        </div>
        <div className={styles["usp5-col"] + ' ' + styles["usp5-col--right"]}>
          <div className={styles["usp5__right-top-block"]}>
            <div className={styles["usp5__img-block"] + ' ' + styles["usp5__img-block-right"]}>
              <div
                className={styles["usp5__img"] + ' ' + styles["usp5_img--komnata"]}
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
              className={styles["usp5__img"] + ' ' + styles["usp5_img--coffee"]}
              style={{ backgroundImage: `url(${imgPath(slide.right.img2)})` }} aria-label='ЖДУ ФОТО'
            />
          </div>
        </div>
      </div>
      <div className={styles["usp5__mobile-wrapper"]}>
        <div className={styles["usp5__mobile-top-row"]}>
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
              <div className={styles["usp5__mobile-bot-right-text"] + ' ' + styles["usp5__mobile-text"]}>
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

export default USPGridSlide2; 