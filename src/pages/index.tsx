import { useEffect, useState } from "react";
import Container from "@components/ui/container";
const HeroSlider = dynamic(() => import("@containers/hero-slider-fullwidth"), {
  ssr: false,
});
import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { QueryClient, dehydrate } from "@tanstack/react-query";
const SaleBannerGrid = dynamic(() => import("@containers/sale-banner-grid"), {
  ssr: false,
});

const ProductsFlashSaleCarousel = dynamic(
  () => import("@containers/product-flash-sale-carousel"),
  { ssr: false }
);
const NewArrivalsProductFeed = dynamic(
  () => import("@components/product/feeds/new-arrivals-product-feed"),
  { ssr: false }
);

import BannerCard from "@components/common/banner-card";
import { fetchProducts } from "@framework/product/get-all-products";
import { fetchBanners, useBannersQuery } from "@framework/getBanners";
import Subscription from "@components/common/subscription";

const ParallaxBanner = dynamic(() => import("@containers/parallax-banner"), {
  ssr: false,
});
const Instagram = dynamic(() => import("@components/common/instagram"));
const Featured = dynamic(() => import("@components/featured/Featured"), {
  ssr: false,
});
const NewFeatureBlock = dynamic(() => import("@containers/new-feature-block"));

function Home() {
  return (
    <>
      <Container>
        <HeroSlider />
        <ProductsFlashSaleCarousel
          date={new Date("2023-05-08")}
          sectionHeading="End of season sale"
        />

        {/* <SaleBannerGrid /> */}
        <Featured />
        <ParallaxBanner />
        <NewArrivalsProductFeed />
        <Featured />
        <NewFeatureBlock />
        <Instagram />
        <Subscription />
      </Container>
    </>
  );
}

Home.Layout = Layout;

export default Home;
export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  // Banners Prefetch Queries

  await queryClient.prefetchQuery(
    [
      "/banners",
      {
        pageName: "home",
        section: "hero",
      },
    ],
    fetchBanners
  );
  await queryClient.prefetchQuery(
    [
      "/banners",
      {
        pageName: "home",
        section: "explore",
      },
    ],
    fetchBanners
  );
  await queryClient.prefetchQuery(
    [
      "/banners",
      {
        pageName: "home",
        section: "parallax",
      },
    ],
    fetchBanners
  );

  // Products Prefetch Queries
  await queryClient.prefetchQuery(
    [
      "/products",
      {
        limit: 10,
        fields:
          "name slug stock price salePrice image shortDetail variations discount",
        featured: true,
        sort: "-createdAt",
      },
    ],
    fetchProducts
  );

  await queryClient.prefetchQuery(
    [
      "/products",
      {
        limit: 10,
        fields:
          "name slug stock price salePrice image shortDetail variations discount",
        sale: true,
        featured: false,
      },
    ],
    fetchProducts
  );
  await queryClient.prefetchQuery(
    [
      "/products",
      {
        limit: 12,
        fields:
          "name slug stock price salePrice image shortDetail variations discount",
        sort: "createdAt",
      },
    ],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 600,
  };
};
