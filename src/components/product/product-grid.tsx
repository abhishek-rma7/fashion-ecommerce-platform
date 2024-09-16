import ProductCard from "@components/product/product-card";
import { FC, useState, useEffect } from "react";
import {
  useInfiniteProductsQuery,
  useProductsQuery,
} from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import Link from "next/link";
import Button from "@components/ui/button";
import { useWindowSize } from "react-use";
// import InfiniteScroller from "react-infinite-scroller";
import InfiniteScroll from "react-infinite-scroll-component";

import { Product } from "@framework/types";

interface ProductGridProps {
  setLength: (length: number) => any;
}
export const ProductGrid: FC<ProductGridProps> = ({ setLength }) => {
  const { width } = useWindowSize();
  const router = useRouter();
  const { query } = router;

  const {
    data: pages,
    fetchNextPage,
    error,
    isLoading,
    hasNextPage,
  } = useInfiniteProductsQuery({
    limit: width > 1440 ? 8 : 6,
    fields:
      "name slug stock price salePrice image shortDetail variations discount",
    ...query,
  });

  useEffect(() => {
    if (pages?.pages.length === 0) {
      setLength(0);
    } else {
      const length = pages?.pages[0].length;
      setLength(length!);
    }
  }, [pages]);

  if (error) {
    return <h1>{(error as any).message}</h1>;
  }

  if (isLoading) {
    return (
      <div className={`flex justify-around space-x-4`}>
        <ProductFeedLoader limit={3} uniqueKey="search-product" />
      </div>
    );
  }

  if (pages?.pages.length === 0) {
    return EmptyProductMessage();
  }

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={pages?.pages.length!}
        hasMore={hasNextPage!}
        next={fetchNextPage}
        scrollThreshold={0.7}
        loader={
          <div className={`flex justify-around space-x-4`}>
            <ProductFeedLoader limit={3} uniqueKey="search-product" />
          </div>
        }
        endMessage={
          <h1 className="text-green-600 text-lg text-center mt-6 font-semibold">
            Yay! You have seen it all!
          </h1>
        }
      >
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8`}
        >
          {pages?.pages.map((item, idx) => RenderProducts(item.products))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

function RenderProducts(products: Product[]) {
  return products.map((product) => {
    return (
      <ProductCard
        key={`product--key${product._id}`}
        product={product}
        variant="grid"
      />
    );
  });
}

function EmptyProductMessage() {
  return (
    <div role="alert w-full">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 uppercase">
        No Products and heartbreaks!
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>
          Try changing the filter or{" "}
          <Link href={"/products"} legacyBehavior>
            <span className="text-black cursor-pointer underline">
              reset the filters.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
