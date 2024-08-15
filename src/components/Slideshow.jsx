import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDot } from 'react-icons/rx';
import homePageContent from '../data/HomePageContent'; 

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getHomePageContent } = homePageContent(); 

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const content = await getHomePageContent(); 
        if (content.length > 0) {
          const images = content[0].images;
          const formattedSlides = images.map((image) => ({
            url: image.fields.file.url,
          }));
          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  if (slides.length === 0) {
    return <div></div>;
  }

  return (
    <div className='h-[23rem] [@media(max-width:510px)]:h-[75vw] w-full m-auto relative group  md:h-[27rem] lg:h-full lg:absolute lg:insert-0'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full bg-center bg-cover duration-700 rounded-[4em] lg:rounded-s-[8em] lg:rounded-e-none'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center pt-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <div>
              <div className='-mt-10 hover:transform-gpu hover:scale-150'>
                <RxDot style={{ color: currentIndex === slideIndex ? 'white' : 'gray' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
