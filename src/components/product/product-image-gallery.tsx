import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Pagination } from "swiper";
import { Attachment } from "@framework/types";
import { Tab } from "@headlessui/react";
import { useWindowSize } from "react-use";
import Carousel from "@components/ui/carousel/carousel";

interface Gallery {
  url: string;
  thumnail: string;
  fileId: string;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

export default function ProductGallery({ gallery }: { gallery: Attachment[] }) {
  const { width } = useWindowSize();

  return width < 1025 ? (
    <Carousel
      pagination={true}
      paginationVariant="circle"
      breakpoints={productGalleryCarouselResponsive}
      className="product-gallery"
      buttonClassName="hidden"
    >
      {gallery?.map((item, index: number) => (
        <SwiperSlide key={`product-gallery-key-${index}`}>
          <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
            <img
              src={
                item?.url ?? "/assets/placeholder/products/product-gallery.svg"
              }
              alt={item?.url}
              className="object-cover w-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Carousel>
  ) : (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {gallery?.map((image) => (
            <Tab
              key={image._id}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              {({ selected }) => (
                <>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      src={image.url}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    className={classNames(
                      selected ? "ring-indigo-500" : "ring-transparent",
                      "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
        {gallery?.map((image) => (
          <Tab.Panel key={image._id}>
            <img
              src={image.url}
              alt={image.url}
              className="h-full w-full object-cover object-center sm:rounded-lg"
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
