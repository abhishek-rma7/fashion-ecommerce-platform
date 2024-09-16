import React, { useEffect, useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import { useWindowSize } from "@utils/use-window-size";
const Carousel = dynamic(() => import("@components/ui/carousel/carousel"), {
  ssr: false,
});
import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "@components/product/product-meta-review";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import Divider from "@components/ui/divider";
import StarIcon from "@components/icons/star-icon";
import ErrorInformation from "@components/404/error-information";
import { Attributes, Product } from "@framework/types";
import dynamic from "next/dynamic";
import ProductGallery from "./product-image-gallery";
import ProductImage from "./product-preview-image";

const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC<{
  data: Product;
}> = ({ data }) => {
  const { addItemToCart } = useCart();

  //Product Data
  const [variant, setVariant] = useState<{ color: string; image: string }>();
  const [quantity, setQuantity] = useState(1);

  //Price and other utils
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.salePrice ? data.salePrice : data.price,
      baseAmount: data.price,
      currencyCode: "INR",
    }
  );

  useEffect(() => {
    setVariant({
      //@ts-ignore
      color: data && data.variations ? data.variations[0].value : "",
      //@ts-ignore
      image:
        data && data.variations
          ? data.variations[0].image.url
          : data?.image.url,
    });
  }, [data]);

  if (!data) {
    return (
      <ErrorInformation
        heading={"No Product found"}
        subHeading={
          "There are many products for you to explore on the shop page."
        }
        img={"/assets/images/no_product.svg"}
        btnText={"Shop Page"}
        href={"/products"}
      />
    );
  }

  const isSelected = Boolean(variant);

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 600);

    const item = generateCartItem(data!, variant!);
    //@ts-ignore
    addItemToCart(item, quantity);
  }

  function handleAttribute(variant: any) {
    setVariant(variant);
  }

  return (
    <div className="block pb-10 lg:pb-14 2xl:pb-20 items-start">
      <div className="pb-7 mb-7 border-b border-gray-300">
        <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5 uppercase">
          {data?.name}
        </h2>
        {data?.reviews!.length ? (
          <h2 className="inline-block border border-gray-350">
            {data?.ratingQuantity ? (
              <p className="flex items-center text-xl p-1">
                {data?.ratingAverage}{" "}
                <StarIcon className="text-xl mx-2" color="green" />|
                <span className="ml-2">{data.ratingQuantity} Ratings </span>
              </p>
            ) : (
              ""
            )}
          </h2>
        ) : (
          ""
        )}
        <Divider className="my-3" />
        <div className="flex items-center mt-5">
          <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
            {price}
          </div>
          {discount && (
            <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
              {basePrice}
            </span>
          )}
          {discount && (
            <span className="font-segoe text-[#ff3f6c] text-sm md:text-base lg:text-lg xl:text-xl ps-2">
              ({discount} OFF)
            </span>
          )}
        </div>
        <p className="text-body text-sm lg:text-base leading-6 lg:leading-8 mt-3">
          {data?.shortDetail}
        </p>
      </div>

      <div className="border-b border-gray-300">
        <ProductAttributes
          variations={data?.variations!}
          active={variant!}
          onClick={handleAttribute}
        />
      </div>
      <div className="py-3 border-b border-gray-300">
        <ul className="text-sm space-y-5 pb-1">
          <li>
            <span className="font-semibold text-heading inline-block pe-2">
              Stock:
            </span>
            {data?.stock}
          </li>
          <li>
            <span className="font-semibold text-heading inline-block pe-2">
              Gender:
            </span>
            <span className="transition hover:underline hover:text-heading capitalize cursor-default">
              {data?.gender}
            </span>
          </li>
          <li>
            <span className="font-semibold text-heading inline-block pe-2">
              Type:
            </span>
            <span className="transition hover:underline hover:text-heading capitalize cursor-default">
              {data?.category}
            </span>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48  py-8">
        <Counter
          quantity={quantity}
          onIncrement={() => setQuantity((prev) => prev + 1)}
          onDecrement={() => setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))}
          disableDecrement={quantity === 1}
          disableIncrement={quantity > data.stock - 1}
        />
        <Button
          onClick={addToCart}
          variant="slim"
          className={`w-full md:w-6/12 xl:w-full ${
            !isSelected && "bg-gray-400 hover:bg-gray-400"
          }`}
          disabled={!isSelected || data.stock === 0}
          loading={addToCartLoader}
        >
          <span className="py-2 3xl:px-8">
            {data.stock === 0 ? "Out of Stock" : "Add to cart"}
          </span>
        </Button>
      </div>
      <ProductMetaReview data={data} />
    </div>
  );
};

export default ProductSingleDetails;
