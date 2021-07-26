import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.6435-9/105402551_113182790439456_806841832412441641_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=e3f864&_nc_eui2=AeFH3UvknB5ibnTxk8kjLYKHdtDBk20SvN920MGTbRK831KNfwY3gtYh5wyEnlX47KO4ty5J9cceyVzJ2EqVXTNY&_nc_ohc=SHaRMnp8C5YAX-FY385&_nc_ht=scontent.fbkk22-1.fna&oh=3f886144e26d817049bcf3fd2e141f8d&oe=612415FC',
  },
  {
    src: 'require(`../../img/maxresdefault.jpg`)'
  }
];

const SilderIndex = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
      className="wow bounceInUp"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
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