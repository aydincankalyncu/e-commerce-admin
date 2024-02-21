import { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import './imageSlider.css';

type ImageSliderProps = {
    images: Array<string>
}

const ImageSlider = ({ images } : ImageSliderProps) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  console.log("Images: ", images);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (images.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {images.map((image, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={`http://localhost:3000/${image}`} alt={image} className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;