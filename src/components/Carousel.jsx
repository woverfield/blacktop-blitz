import React, { useState } from "react";
import slides from "../data/carousel.json";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Carousel() {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === slides.slides.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.slides.length - 1 : slide - 1);
  };

  return (
    <div className="carousel container mx-auto flex">
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide} />
      {slides.slides.map((item, idx) => {
        return (
          <Link to={(idx + 1).toString()} className="flex justify-center">
            <div className={
                  slide === idx
                    ? "ps-" + (idx + 1) + " player-slide"
                    : "ps-" + (idx + 1) + " player-slide hidden"
                }>
              <h1
                className={
                  slide === idx
                    ? "carousel-heading bg-white p-3 px-10 text-3xl"
                    : "hidden"
                }
              >
                {idx + 1} vs. {idx + 1}
              </h1>
              <button
                className={
                  slide === idx
                    ? "btn-" + (idx + 1) + " size-btn"
                    : "btn-" + (idx + 1) + " size-btn hidden"
                }
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  key={idx}
                  className={
                    slide === idx
                      ? "slide-" + (idx + 1) + " slide"
                      : "slide-" + (idx + 1) + " slide hidden"
                  }
                />
              </button>
            </div>
          </Link>
        );
      })}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={nextSlide}
      />
      <span className="indicators">
        {slides.slides.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
            ></button>
          );
        })}
      </span>
    </div>
  );
}
