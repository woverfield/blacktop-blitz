import React, { useState } from "react";
import slides from "../data/carousel.json";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function Carousel() {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === slides.slides.length - 1 ? 0 : slide + 1);
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.slides.length - 1 : slide - 1);
  }

  return (
    <div className="carousel container mx-auto">
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide}/>
      {slides.slides.map((item, idx) => {
        return (
          <img src={item.src} alt={item.alt} key={idx} className={slide === idx ? "slide" : "slide slide-hidden"} />
        );
      })}
      <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide}/>
      <span className="indicators">
        {slides.slides.map((_, idx) => {
            return (
                <button key={idx} onClick={null} className={slide === idx ? "indicator" : "indicator indicator-inactive"}></button>
            )
        })}
      </span>
    </div>
  );
}
