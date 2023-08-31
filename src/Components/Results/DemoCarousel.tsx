import "react-responsive-carousel/lib/styles/carousel.min.css";
import picture from '../../images/add.png'
var React = require('react');
var ReactDOM = require('react-dom');
var Carousel = require('react-responsive-carousel').Carousel;

interface CarouselProps {
  videos:  JSX.Element[] | undefined
}

var DemoCarousel = ({videos}: CarouselProps) => {
        return (
            <Carousel showArrows={true} height='500px'>
                {videos}
            </Carousel>
        );
    }

export default DemoCarousel
