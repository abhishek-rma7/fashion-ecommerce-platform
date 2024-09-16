import Container from "@components/ui/container";
import { useState } from "react";
import Layout from "@components/layout/layout";
import ProductCard from "@components/product/product-card";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Product } from "@framework/types";
import {
  useProductsQuery,
  fetchProducts,
} from "@framework/product/get-all-products";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchBanners, useBannersQuery } from "@framework/getBanners";
import Loader from "@components/Loader.tsx/Loader";
import ErrorInformation from "@components/404/error-information";
import BannerCard from "@components/common/banner-card";
import Button from "@components/ui/button";
import { NextSeo } from "next-seo";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";

export default function Category({ category }) {
  const [limit, setLimit] = useState(8);
  const options = {
    category,
    limit,
    fields:
      "name slug stock price salePrice image shortDetail variations gender discount",
  };

  const { data, isLoading } = useProductsQuery(options);

  const {
    data: banner,
    isSuccess: bannerSuccess,
    isLoading: bannerLoading,
  } = useBannersQuery({
    pageName: "category",
    section: category,
  });

  if (data?.length === 0) {
    return (
      <ErrorInformation
        heading={"No Product Found!"}
        subHeading={
          "There are many products for you to explore on the shop page."
        }
        img={"/assets/images/no_product.svg"}
        btnText={"Shop Page"}
        href={"/products"}
      />
    );
  }

  return (
    <div className="border-t-2 border-borderBottom">
      <NextSeo
        title={`${category} | CropOffs`}
        description="Welcome to CropOffs. An upcycled jewellery brand started by a woman who has always loved fashion but wanted to make a difference."
      />
      <Container>
        {bannerSuccess && banner[0] ? (
          <BannerCard
            key={`banner--key${banner[0]._id}`}
            banner={banner[0]}
            href={banner[0].link}
            className={"p-5"}
          />
        ) : (
          ""
        )}
        <div className="pb-16 lg:pb-20 pt-8">
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 3xl:grid-cols-6`}
          >
            {isLoading ? (
              <ProductFeedLoader />
            ) : (
              data?.products.map((product: Product) => {
                return (
                  <ProductCard
                    key={`product--key${product._id}`}
                    product={product}
                    variant="grid"
                  />
                );
              })
            )}
          </div>
          <div className="flex justify-center pt-5">
            {data?.products.length! < data?.length! ? (
              <Button
                onClick={() => {
                  setLimit((prev) => prev + 8);
                }}
              >
                Load More
              </Button>
            ) : (
              <p className="py-5 text-lg capitalize font-medium">
                You have seen it all!
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

Category.Layout = Layout;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { name: "Drop Earrings" } },
      { params: { name: "Stud Earrings" } },
      { params: { name: "Floral Earrings" } },
      { params: { name: "Abstract Earrings" } },
      { params: { name: "Solid Earrings" } },
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params!;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [
      "/products",
      {
        limit: 8,
        fields:
          "name slug stock price salePrice image shortDetail gender variations discount",
        category: name,
      },
    ],
    fetchProducts
  );

  await queryClient.prefetchQuery(
    ["/banners", { pageName: "category", section: name }],
    fetchBanners
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      category: name,
    },
    revalidate: 600,
  };
};
