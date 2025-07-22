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
    <div className={styles['usp5-container']}>
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

      <div className={styles['tablet_slide']}>
        <div className={styles['tablet_slide_wrapper']}>
          <div className={styles['tablet_slide_left']}>
            <div className={styles['tablet_first_left_row']}>
              <div className={styles['tablet_left_row_title']}>
                <h2 className={styles['tablet_left_row_title_text']}>
                  {slide.left_bottom_title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
                <div className={styles['tablet_left_row_main_text']}>
                  {slide.left_bottom_text.split('\n').map((line, i) => (
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
          <div className={styles['tablet_slide_right']}>
            <div className={styles['tablet_right_photo_block']}>
              <div className={styles['top_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.left_top_img)})` }} />
            </div>
            <div className={styles['slide_two_photos']}>
              <div className={styles['mid_left_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.right_left_top_img)})` }} />
              <div className={styles['mid_right_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.right_right_top_img)})` }} />
            </div>
            <div className={styles['tablet_bottom_right_photo_block']}>
              <div className={styles['bottom_right_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.right_bottom_img)})` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles['mobile_slide']}>
        <div className={styles['mobile_slide_wrapper']}>
          <div className={styles['mobile_top_row']}>
            <div className={styles["mobile_title_block"]}>
              <h2 className={styles["title_text"]}>
                {slide.left_bottom_title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              <div className={styles["mobile_year"] + ' ' + styles["mobile_text"]}>
                {slide.year}
              </div>
            </div>
            <div className={styles["mobile_text_block"]}>
              <div className={styles["mobile_text"]}>
                {slide.left_bottom_text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles['mobile_yellow-line']} />

            </div>
            <div className={styles['mobile_top_photo']}
              style={{ backgroundImage: `url(${imgPath(slide.left_top_img)})` }} />
          </div>
          <div className={styles['mobile_mid_row']}>
            <div className={styles['mid_left_right_mob_photo']}
              style={{ backgroundImage: `url(${imgPath(slide.right_left_top_img)})` }} />
            <div className={styles['mid_right_right_content']}>
              <div className={styles['mid_bullets']}>
                <span>
                  {slide.left_bottom_bullets.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
              <div className={styles['mid_right_right_mob_photo']}
                style={{ backgroundImage: `url(${imgPath(slide.right_right_top_img)})` }} />
            </div>
          </div>
          <div className={styles['mobile_bot_row']}>
            <div className={styles['bottom_right_mob_photo']}
              style={{ backgroundImage: `url(${imgPath(slide.right_bottom_img)})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide3; 
