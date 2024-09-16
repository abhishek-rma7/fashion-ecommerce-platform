import Carousel from "@components/ui/carousel/carousel";
import ProductCardGridLoader from "@components/ui/loaders/product-card-grid-loader";
import { useProductsQuery } from "@framework/product/get-all-products";
import React from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

const breakpoints = {
  "1720": {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  "1400": {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  "1025": {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  "768": {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  "500": {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  "0": {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

const Featured = () => {
  const { data, isLoading } = useProductsQuery({
    limit: 10,
    fields:
      "name slug stock price salePrice image shortDetail variations discount",
    featured: true,
    sort: "-createdAt",
  });

  return (
    <div className="pb-16">
      <div className="text-center text-black my-8">
        <p className="text-xl font-semibold text-gray-800">Carry Your Style</p>
        <h2 className="text-4xl font-bold uppercase">Featured Products</h2>
      </div>
      <Carousel
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={breakpoints}
        buttonClassName="-mt-2 sm:-mt-[5.5rem] md:-mt-28"
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <ProductCardGridLoader
                key={idx}
                uniqueKey={`flash-sale-${idx}`}
              />
            ))
          : data?.products.map((product: any, idx) => {
              return (
                <SwiperSlide key={`product--key-${product._id}`}>
                  <Link
                    href={`/products/${product.slug}/${product._id}`}
                    className="group flex flex-col overflow-hidden rounded-md border border-gray-300 pb-4 text-center "
                  >
                    <div className="relative mx-auto flex flex-col">
                      <div className="flex w=[366px] h-[497px]">
                        <Image
                          src={product.image.url}
                          alt={product.name}
                          width={400}
                          height={200}
                          // layout="responsive"
                          // objectFit="fill"
                          quality={60}
                        />
                        <noscript />
                      </div>
                      <div className="end-3.5 lg:end-5 absolute bottom-3.5 overflow-hidden p-2 lg:bottom-5">
                        <span className="text-heading shadow-navigation hover:bg-heading inline-block transform cursor-pointer rounded-md bg-white py-3 px-4 text-center text-[13px] font-semibold leading-4 transition duration-300 ease-in-out hover:text-white md:text-sm lg:translate-y-full lg:py-4 lg:px-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                          View Product
                        </span>
                      </div>
                    </div>
                    <div className="3xl:pt-7 px-4 pt-3.5 sm:px-0 lg:pt-4 xl:pt-5">
                      <h3 className="text-heading 3xl:mb-3.5 mb-1.5 text-lg font-bold md:text-xl lg:mb-2.5 lg:text-2xl xl:leading-10 2xl:mb-3 2xl:text-3xl">
                        {product.name}
                      </h3>
                      <p className="text-xl text-review font-heading font-medium">
                        ₹{" "}
                        {product?.salePrice
                          ? product.salePrice
                          : product?.price}{" "}
                        {product.salePrice ? (
                          <span className="line-through text-gray-400">
                            (₹{product.price})
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
      </Carousel>
    </div>
  );
};

export default Featured;
