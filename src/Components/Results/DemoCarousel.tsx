import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import React from 'react';

interface CarouselProps {
  videos: JSX.Element[] | undefined;
}

const DemoCarousel = ({ videos }: CarouselProps) => {
  return (
    <Carousel showArrows={true} showThumbs={false}>
      {videos}
    </Carousel>
  );
};

export default DemoCarousel;
