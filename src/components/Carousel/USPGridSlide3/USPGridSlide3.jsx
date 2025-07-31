import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './USPGridSlide3.module.css';
import CachedBackgroundImage from '../../CachedImage/CachedBackgroundImage';

const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/slide3/${name}`;

const USPGridSlide3 = () => {
  const { t, ready } = useTranslation();

  // Безопасное получение переводов с fallback и проверкой готовности
  const getTranslation = (key, fallback) => {
    if (!ready) return fallback;
    const translation = t(key);
    return translation && translation !== key ? translation : fallback;
  };

  const slide = {
    title: getTranslation('usp5.slide3.title', 'Паркинг\nи инфраструктура'),
    left: {
      list: getTranslation('usp5.slide3.list', 'Подземный паркинг\nЭлектрозарядки\nСистема безопасности'),
      year: '2025',
    },
    right: {
      text: getTranslation('usp5.slide3.textblock', 'Современная инфраструктура\nдля комфортной жизни'),
    },
    images: {
      parkingBig: '2b-garage.webp',
      electroZaryad: 'electro_zaryad.webp',
      usiliteli: 'usiliteli.webp', 
      parkingSmall: 'parking_big.webp'
    }
  };

  // Безопасная функция для разделения текста
  const safeSplit = (text) => {
    if (!text || typeof text !== 'string') return [''];
    return text.split('\n');
  };

  return (
    <div className={styles["usp5-container"]}>
      <div className={styles["usp5-wrapper"]}>
        <div className={styles["slide3"]}>
          <div className={styles["slide-3-top"]}>
            <div className={styles["slide-3-top--left"]}>
              <div className={styles["top--left--photo--block"]}>
                <CachedBackgroundImage
                  src={imgPath(slide.images.parkingBig)}
                  className={styles["top--left--photo"]}
                  aria-label='Парковка'
                />
              </div>
            </div>
            <div className={styles["slide-3-top--right"]}>
              <div className={styles["left--top--right--photo--block"]}>
                <CachedBackgroundImage
                  src={imgPath(slide.images.electroZaryad)}
                  className={styles["left--top--right--photo"]}
                  aria-label='Электрозарядка'
                />
              </div>
              <div className={styles["right--top--right-photo--block"]}>
                <CachedBackgroundImage
                  src={imgPath(slide.images.usiliteli)}
                  className={styles["right--top--right-photo"]}
                  aria-label='Усилители'
                />
              </div>
            </div>
          </div>

          <div className={styles["slide-3-bottom"]}>
            <div className={styles["slide-3-bottom--left"]}>
              <div className={styles["slide-3-bottom--left--block"]}>
                <div className={styles["first-row"]}>
                  <div className={styles["row_title_text"]}>
                    {safeSplit(slide.title).map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className={styles["bullet-block"]}>
                    <div className={styles["year"]}>{slide.left.year}</div>
                    <div className={styles["yellow-line"]} />
                  </div>
                </div>
                <div className={styles["second-row"]}>
                  <div className={styles["main-text"]}>
                    {safeSplit(slide.right.text).map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                  <div className={styles["bullets"]}>
                    {safeSplit(slide.left.list).map((item, i) => <div key={i}>{item}</div>)}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["right--bottom-photo--block"]}>
              <CachedBackgroundImage
                src={imgPath(slide.images.parkingSmall)}
                className={styles["right--bottom-photo"]}
                aria-label='Парковка вид'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Планшетная версия */}
      <div className={styles["tablet_slide"]}>
        <div className={styles["tablet_slide_wrapper"]}>
          <div className={styles["tablet_slide_left"]}>
            <div className={styles["tablet_first_left_row"]}>
              <div className={styles["tablet_left_row_title_text"]}>
                {safeSplit(slide.title).map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className={styles["tablet_year"]}>{slide.left.year}</div>
            </div>
            <div className={styles["tablet_second_left_row"]}>
              <div className={styles["tablet_left_row_main_text"]}>
                {safeSplit(slide.right.text).map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles["tablet_bullet_block"]}>
                <div className={styles["tablet_bullets"]}>
                  {safeSplit(slide.left.list).map((item, i) => <div key={i}>{item}</div>)}
                </div>
                <div className={styles["tablet_yellow-line"]} />
              </div>
            </div>
          </div>
          <div className={styles["tablet_slide_right"]}>
            <CachedBackgroundImage
              src={imgPath(slide.images.parkingBig)}
              className={styles["top_right_photo"]}
              aria-label='Парковка'
            />
            <div className={styles["slide_two_photos"]}>
              <CachedBackgroundImage
                src={imgPath(slide.images.electroZaryad)}
                className={styles["mid_left_right_photo"]}
                aria-label='Электрозарядка'
              />
              <CachedBackgroundImage
                src={imgPath(slide.images.usiliteli)}
                className={styles["mid_right_right_photo"]}
                aria-label='Усилители'
              />
            </div>
            <CachedBackgroundImage
              src={imgPath(slide.images.parkingSmall)}
              className={styles["bottom_right_photo"]}
              aria-label='Парковка вид'
            />
          </div>
        </div>
      </div>

      {/* Мобильная версия */}
      <div className={styles["mobile_slide"]}>
        <div className={styles["mobile_slide_wrapper"]}>
          <div className={styles["mobile_top_row"]}>
            <div className={styles["mobile_title_block"]}>
              <div className={styles["title_text"]}>
                {safeSplit(slide.title).map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className={styles["mobile_year"]}>{slide.left.year}</div>
            </div>
            <div className={styles["mobile_text"]}>
              {safeSplit(slide.right.text).map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          <CachedBackgroundImage
            src={imgPath(slide.images.parkingBig)}
            className={styles["mobile_top_photo"]}
            aria-label='Парковка'
          />
          <div className={styles["mobile_text_block"]}>
            <div className={styles["mobile_text"]}>
              {safeSplit(slide.left.list).map((item, i) => <div key={i}>{item}</div>)}
            </div>
            <div className={styles["mobile_yellow-line"]} />
          </div>
          <div className={styles["mobile_mid_row"]}>
            <CachedBackgroundImage
              src={imgPath(slide.images.electroZaryad)}
              className={styles["mid_left_right_mob_photo"]}
              aria-label='Электрозарядка'
            />
            <div className={styles["mid_right_right_content"]}>
              <div className={styles["mid_bullets"]}>
                Дополнительная информация
              </div>
              <CachedBackgroundImage
                src={imgPath(slide.images.usiliteli)}
                className={styles["mid_right_right_mob_photo"]}
                aria-label='Усилители'
              />
            </div>
          </div>
          <CachedBackgroundImage
            src={imgPath(slide.images.parkingSmall)}
            className={styles["bottom_right_mob_photo"]}
            aria-label='Парковка вид'
          />
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide3;
