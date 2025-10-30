declare module "react-slick" {
  import { ComponentType, HTMLAttributes, ReactNode } from "react";

  export interface Settings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    fade?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: "ondemand" | "progressive" | false;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
    beforeChange?: (current: number, next: number) => void;
    afterChange?: (current: number) => void;
    nextArrow?: ReactNode;
    prevArrow?: ReactNode;
    appendDots?: (dots: ReactNode) => ReactNode;
    customPaging?: (index: number) => ReactNode;
    responsive?: Array<{
      breakpoint: number;
      settings: Settings | "unslick";
    }>;
  }

  interface SliderProps extends HTMLAttributes<HTMLDivElement>, Settings {}

  const Slider: ComponentType<SliderProps>;
  export default Slider;
}
