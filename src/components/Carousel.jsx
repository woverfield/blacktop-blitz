import React, { useState } from "react";
import slides from "../data/carousel.json";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: "-100%" },
};

export default function Carousel() {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((slide + 1) % slides.slides.length);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.slides.length - 1 : slide - 1);
  };

  const getHeading = (size) => {
    if (size === 1) {
      return 'ONES';
    } else if (size === 2) {
      return 'TWOS';
    } else if (size === 3) {
      return 'THREES';
    } else if (size === 4) {
      return 'FOURS';
    } else if (size === 5) {
      return 'FIVES';
    }
  }

  return (
    <div className="carousel container mx-auto flex flex-col">
      {slides.slides.map((item, idx) => (
        <div
          key={idx}
          className={
            slide === idx
              ? `ps-${idx + 1} player-slide`
              : `ps-${idx + 1} player-slide hidden`
          }
        >
          <motion.div
            className="motion-container"
            initial="hidden"
            animate={slide === idx ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <Link to={(idx + 1).toString()} className="flex flex-col justify-center">
              <h1 className="carousel-heading text-white p-3 px-10 text-7xl font-serif">
                {getHeading(idx + 1)}
              </h1>
              <button className={`btn-${idx + 1} size-btn`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`slide-${idx + 1} slide`}
                />
              </button>
            </Link>
          </motion.div>
        </div>
      ))}

      <div className="carousel-nav">
        <BsArrowLeftCircleFill
          className="arrow arrow-left"
          onClick={prevSlide}
        />
        <span className="indicators">
          {slides.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={`indicator ${
                slide === idx ? "" : "indicator-inactive"
              }`}
            />
          ))}
        </span>
        <BsArrowRightCircleFill
          className="arrow arrow-right"
          onClick={nextSlide}
        />
      </div>
    </div>
  );
}
