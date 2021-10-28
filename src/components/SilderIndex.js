import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


const items = [
  {
    src: 'https://gitlab.com/614259047/project-p4/-/raw/main/105402551_113182790439456_806841832412441641_n.jpg',
  },
  {
    src: 'https://gitlab.com/614259047/project-p4/-/raw/main/maxresdefault__1_.jpg'
  }
];

const SilderIndex = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [carousel, setCarousel] = useState([]);
  useEffect(() => {
    axios('https://educationservice.herokuapp.com/Carousel/getCarousel')
      .then(response => {
        console.log(response.data)
        setCarousel(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carousel.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carousel.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = carousel.map((item) => {
    return (
      <CarouselItem
      className="wow bounceInUp"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <center><img src={item.image_carousel} alt={item.altText}/></center>
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default SilderIndex;