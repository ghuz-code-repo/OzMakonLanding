import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './USPGridSlide3.module.css';

const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/slide3/${name}`;

const USPGridSlide3 = () => {
  const { t } = useTranslation();
  const slide = {
    left_top_img: '2b-garage.webp',
    right_left_top_img: 'electro_zaryad.webp',
    right_right_top_img: 'usiliteli.webp',
    right_bottom_img: 'parking_big.webp',
    left_bottom_title: t('usp5.slide3.left_bottom_title'),
    year: '2025',
    left_bottom_text: t('usp5.slide3.left_bottom_text'),
    left_bottom_bullets: t('usp5.slide3.left_bottom_bullets'),

  };
  return (
    <div className={styles["usp5-wrapper"]}>
      <div className={styles['slide3']}>
        <div className={styles['slide-3-top']}>
          <div className={styles['slide-3-top--left']}>
            <div className={styles['top--left--photo--block']}>
              <div className={styles['top--left--photo']}
                style={{ backgroundImage: `url(${imgPath(slide.left_top_img)})` }} />
            </div>
          </div>
          <div className={styles['slide-3-top--right']}>
            <div className={styles['left--top--right--photo--block']}>
              <div className={styles['left--top--right--photo']}
                style={{ backgroundImage: `url(${imgPath(slide.right_left_top_img)})` }} />
            </div>
            <div className={styles['right--top--right-photo--block']}>
              <div className={styles['right--top--right-photo']}
                style={{ backgroundImage: `url(${imgPath(slide.right_right_top_img)})` }} />
            </div>
          </div>
        </div>
        <div className={styles['slide-3-bottom']}>
          <div className={styles['slide-3-bottom--left']}>
            <div className={styles['slide-3-bottom--left--block']}>
              <div className={styles['first-row']}>
                <div className={styles['row_title']}>
                  <h2 className={styles['row_title_text']}>
                    {slide.left_bottom_title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h2>
                  <div className={styles['main-text']}>
                    {slide.left_bottom_text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className={styles['year']}>
                  <span>{slide.year}</span>
                </div>
              </div>
              <div className={styles['second-row']}>

                <div className={styles['bullet-block']}>
                  <div className={styles['yellow-line']} />
                  <div className={styles['bullets']}>
                    <span>
                      {slide.left_bottom_bullets.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['slide-3-bottom--right']}>
            <div className={styles['right--bottom-photo--block']}>
              <div className={styles['right--bottom-photo']}
                style={{ backgroundImage: `url(${imgPath(slide.right_bottom_img)})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide3; 