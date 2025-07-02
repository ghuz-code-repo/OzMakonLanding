import React from 'react';
import { useTranslation } from 'react-i18next';

const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/${name}`;

const USPGridSlide1 = () => {
  const { t } = useTranslation();
  const slide = {
    title : t('usp5.title'),
    left: {
      list: [t('usp5.list1'), t('usp5.list2'), t('usp5.list3')],
      year: '2025',
      img: 'sports.jpg',
    },
    center: {
      img1: 'kids_room.jpg',
      img2: 'eagle_view.jpg',
    },
    right: {
      img1: 'front_view.png',
      img2: 'bbq.png',
      text: t('usp5.textblock'),
    },
  };
  return (
    <div className="usp5-wrapper">
      <div className="usp5-col usp5-col--left">
        <div className="usp5-animatable">
          <div className="usp5__left-top">
            <h2 className="usp5__title">
              {slide.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <div className="usp5__left-top-text">
              <div className="usp5__list">
                {slide.left.list.map((item, i) => <div key={i}>{item}</div>)}
              </div>
              <div className="usp5__year">{slide.left.year}</div>
            </div>
          </div>
        </div>
        <div className="usp5__left-bottom">
          <div className="usp5__img-block usp5__img-block--bottom usp5-animatable">
            <div className="usp5__line" />
            <div
              className="usp5__img usp5__img-zal"
              style={{ backgroundImage: `url(${imgPath(slide.left.img)})` }}
            />
          </div>
        </div>
      </div>
      <div className="usp5-col usp5-col--center">
        <div className="usp5__img-block usp5__img-block--top usp5-animatable">
          <div
            className="usp5__img usp5__img-child"
            style={{ backgroundImage: `url(${imgPath(slide.center.img1)})` }}
          />
        </div>
        <div className="usp5__img-block usp5__img-block--middle usp5-animatable">
          <div
            className="usp5__img usp5__img-dvor"
            style={{ backgroundImage: `url(${imgPath(slide.center.img2)})` }}
          />
        </div>
      </div>
      <div className="usp5-col usp5-col--right">
        <div className="usp5__img-block usp5__img-block--house usp5-animatable">
          <div
            className="usp5_img--frontview"
            style={{ backgroundImage: `url(${imgPath(slide.right.img1)})` }}
          />
        </div>
        <div className="usp5-animatable">
          <div className="usp5__textblock">
            {slide.right.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="usp5__img-block usp5__img-block--bbq usp5-animatable">
          <div
            className="usp5_img--bbq"
            style={{ backgroundImage: `url(${imgPath(slide.right.img2)})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default USPGridSlide1; 