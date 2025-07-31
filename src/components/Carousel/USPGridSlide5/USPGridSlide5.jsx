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
              <h2 className={styles["top_left_title"]}>
                {slide.left_top_title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>

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
      <div className={styles['tablet_slide']}>
        <div className={styles['tablet_slide_wrapper']}>
          <div className={styles['tablet_slide_left']}>
            <div className={styles['tablet_first_left_row']}>
              <div className={styles['tablet_left_row_title']}>
                <h2 className={styles['tablet_left_row_title_text']}>
                  {slide.left_top_title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
                <div className={styles['tablet_left_row_main_text']}>
                  {slide.left_top_text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className={styles['tablet_year']}>
                <span>{slide.year}</span>
              </div>
            </div>
            <div className={styles['tablet_second_left_row']}>
              <div className={styles['tablet_yellow-line']} />
              <div className={styles['tablet_bullets']}>
                <span>
                  {slide.right_bottom_text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className={styles['tablet_slide_right']}>
            <div className={styles['tablet_right_photo_block']}>
              <div className={styles['top_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.top_right_left_img)})` }} />
            </div>
            <div className={styles['slide_two_photos']}>
              <div className={styles['mid_left_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.top_right_right_img)})` }} />
              <div className={styles['mid_right_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.bottom_left_img)})` }} />
            </div>
            <div className={styles['tablet_bottom_right_photo_block']}>
              <div className={styles['bottom_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.bottom_center_img)})` }} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles['mobile_slide']}>
        <div className={styles['mobile_slide_wrapper']}>
          <div className={styles['mobile_top_row']}>
            <div className={styles["mobile_title_block"]}>
                <h2 className={styles['mobile_left_row_title_text']}>
                  {slide.left_top_title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
              <div className={styles["mobile_year"]}>
                {slide.year}
              </div>
            </div>
            <div className={styles["mobile_text_block"]}>
              <div className={styles["mobile_text"]}>
                  {slide.left_top_text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </div>
              <div className={styles['mobile_yellow-line']} />

            </div>
            <div className={styles['mobile_top_photo']}
              style={{ backgroundImage: `url(${imgPath(slide.top_right_left_img)})` }} />
          </div>
          <div className={styles['mobile_mid_row']}>
            <div className={styles['mid_left_right_mob_photo']}
              style={{ backgroundImage: `url(${imgPath(slide.top_right_right_img)})` }} />
            <div className={styles['mid_right_right_content']}>
              <div className={styles['mid_bullets']}>
                <span>
                  {slide.right_bottom_text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
              <div className={styles['mid_right_right_mob_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.bottom_left_img)})` }} />
            </div>
          </div>
          <div className={styles['mobile_bot_row']}>
            <div className={styles['bottom_right_mob_photo']}
              style={{ backgroundImage: `url(${imgPath(slide.bottom_center_img)})` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide5;
