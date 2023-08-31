import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface CarouselProps {
  videos:  JSX.Element[] | undefined
}

const DemoCarousel = ({videos}: CarouselProps) => {
  return (
    <Carousel showArrows={true}>
      {videos}
    </Carousel>
  );
}

export default DemoCarousel
