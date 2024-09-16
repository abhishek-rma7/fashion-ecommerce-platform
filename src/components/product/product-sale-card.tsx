import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { Product } from "@framework/types";
import React, { useState } from "react";

interface Props {
  product: Product;
}

const ProductSaleCard: React.FC<Props> = ({ product }) => {
  const { openModal, setModalView, setModalData } = useUI();
  const { price, basePrice, discount } = usePrice({
    amount: product.salePrice ? product.salePrice : product.price,
    baseAmount: product.price,
    currencyCode: "INR",
  });

  function handlePopupView() {
    setModalData({ data: product });
    setModalView("PRODUCT_VIEW");
    return openModal();
  }
  return (
    <div
      onClick={handlePopupView}
      className="group relative block overflow-hidden cursor-pointer"
    >
      <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      <img
        src={product.image.url}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <span className="whitespace-nowrap bg-white ring-1 ring-black text-white px-3 py-1.5 text-xs font-medium">
          {discount && (
            <span className="font-segoe text-[#ff3f6c] text-sm mt-1 mx-1">
              {discount} OFF
            </span>
          )}
        </span>

        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {product.name}
        </h3>

        <div className="flex items-center mt-1">
          <div className="text-heading font-bold text-base pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
            {price}
          </div>
          {discount && (
            <span className="line-through font-segoe text-gray-400 text-sm mt-1">
              {basePrice}
            </span>
          )}
        </div>

        <button className="mt-4 block w-full rounded bg-black text-white p-4 text-sm font-semibold transition hover:scale-105">
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductSaleCard;
