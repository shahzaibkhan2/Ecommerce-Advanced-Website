import React, { useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { sliderData } from "./sliderData";

const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliderLength = sliderData.length;
  const autoSlideState = true;
  let slideInterval;
  let intervalTime = 5000;

  const prevSlide = () => {
    setCurrentSlider(
      currentSlider === 0 ? sliderLength - 1 : currentSlider - 1
    );
  };
  const nextSlide = () => {
    setCurrentSlider(
      currentSlider === sliderLength - 1 ? 0 : currentSlider + 1
    );
  };

  useEffect(() => {
    setCurrentSlider(0);
  }, []);

  useEffect(() => {
    if (autoSlideState) {
      (() => (slideInterval = setInterval(nextSlide, intervalTime)))();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlider, slideInterval, autoSlideState]);
  return (
    <div className={styles.slider}>
      <BiLeftArrowAlt
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
      />
      <BiRightArrowAlt
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
      />

      {sliderData.map((slider, index) => {
        const { image, desc, heading } = slider;
        return (
          <div
            key={index}
            className={`${
              index === currentSlider
                ? `${styles.slide} ${styles.current}`
                : styles.slide
            }`}
          >
            {index === currentSlider && (
              <>
                <img className={styles.images} src={image} alt="image" />
                <div className={styles.content}>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a
                    href="#product"
                    className="--btn --btn-primary --small-btn"
                  >
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
