"use client";
import React from "react";
import { Swiper } from "swiper/react";
import { useRouter } from "next/router";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getDirection } from "@utils/get-direction";

// SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);

type CarouselPropsType = {
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  direction?: "horizontal" | "vertical";
  buttonSize?: "default" | "small";
  paginationVariant?: "default" | "circle";
  paginationPosition?: "center" | "left" | "right";
  centeredSlides?: boolean;
  effect?:
    | "slide"
    | "fade"
    | "cube"
    | "coverflow"
    | "flip"
    | "creative"
    | "cards";
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  scrollbar?: {} | any;
  autoplay?: {} | any;
};

const Carousel: React.FunctionComponent<CarouselPropsType> = ({
  children,
  className = "",
  buttonClassName = "",
  buttonSize = "default",
  paginationVariant = "default",
  paginationPosition,
  breakpoints,
  effect = "fade",
  autoplay = {
    delay: 4000,
  },
  direction = "horizontal",
  ...props
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const classPagination = paginationPosition
    ? ` pagination-${paginationPosition}`
    : "";

  return (
    <div
      className={`carouselWrapper relative ${className}${classPagination} ${
        paginationVariant === "circle" ? "dotsCircle" : ""
      }`}
    >
      <Swiper
        loop={true}
        autoplay={autoplay}
        breakpoints={breakpoints}
        observer
        dir={dir}
        direction={direction}
        effect={effect}
        navigation={{
          prevEl: ".prev-button",
          nextEl: ".next-button",
        }}
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        {...props}
      >
        {children}
      </Swiper>
      <div className="flex items-center w-full absolute top-2/4 z-10">
        <button
          aria-label="prev-button"
          className={`prev-button ${buttonClassName} ${
            buttonSize === "default"
              ? "w-7 h-7 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl"
              : "w-7 h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg"
          } text-black flex items-center justify-center rounded-full text-gray-0 bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none start-0 transform ${
            dir === "rtl"
              ? "rotate-180 shadow-navigationReverse translate-x-1/2"
              : "shadow-navigation -translate-x-1/2"
          }`}
        >
          <IoIosArrowBack />
        </button>
        <button
          aria-label="next-button"
          className={`next-button ${buttonClassName} ${
            buttonSize === "default"
              ? "w-7 h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl"
              : "w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg"
          } text-black flex items-center justify-center rounded-full bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none end-0 transform ${
            dir === "rtl"
              ? "rotate-180 shadow-navigationReverse -translate-x-1/2"
              : "shadow-navigation translate-x-1/2"
          }`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
