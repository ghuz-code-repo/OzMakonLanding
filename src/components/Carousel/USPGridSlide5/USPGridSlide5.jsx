import React from 'react';
import styles from './USPGridSlide5.module.css';
import { useTranslation } from 'react-i18next';
const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/slide5/${name}`;

const USPGridSlide5 = () => {
  const { t } = useTranslation();
  const slide = {
    top_right_left_img: 'bicycle.webp',
    top_right_right_img: 'boiler.webp',
    bottom_left_img: "window.webp",
    bottom_center_img: "electro_lock.webp",
    year: '2025',
    left_top_title: t('usp5.slide5.left_top_title'),
    left_top_text: t('usp5.slide5.left_top_text'),
    right_bottom_title: t('usp5.slide5.right_bottom_title'),
    right_bottom_text: t('usp5.slide5.right_bottom_text')
  };
  return (
    <div className={styles["usp5_wrapper"]}>
      <div className={styles["slide5"]}>
        <div className={styles["first_row"]}>
          <div className={styles["top_left"]}>
            <div className={styles["top_left_title_block"]}>
              <div className={styles["top_left_title"]}>
                {slide.left_top_title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles["top_left_year"]}>{slide.year}
              </div>
            </div>
            <div className={styles["top_left_text"]}>
              {slide.left_top_text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
            <div className={styles["top_left_yellow_line"]} />
          </div>
          <div className={styles["top_right"]}>
            <div className={styles["top_right_left_img_block"]}>
              <div className={styles["top_right_left_img"]}
                style={{ backgroundImage: `url(${imgPath(slide.top_right_left_img)})` }} />
            </div>
            <div className={styles["top_right_right_img_block"]}>
              <div className={styles["top_right_right_img"]}
                style={{ backgroundImage: `url(${imgPath(slide.top_right_right_img)})` }} />
            </div>
          </div>
        </div>
        <div className={styles["second_row"]}>
          <div className={styles["bottom_left_img_block"]}>
            <div className={styles["bottom_left_img"]}
              style={{ backgroundImage: `url(${imgPath(slide.bottom_left_img)})` }} />
          </div>
          <div className={styles["bottom_center_img_block"]}>
            <div className={styles["bottom_center_img"]}
              style={{ backgroundImage: `url(${imgPath(slide.bottom_center_img)})` }} />
          </div>
          <div className={styles["bottom_right"]}>
            <div className={styles["bottom_right_text_block"]}>
              <div className={styles["bottom_right_title"]}>
                {slide.right_bottom_title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles["bottom_right_text"]}>
                {slide.right_bottom_text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={styles["bottom_right_yellow_line"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide5;
