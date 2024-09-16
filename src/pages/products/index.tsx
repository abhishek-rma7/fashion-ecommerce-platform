import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import ShopDiscount from "@components/shop/discount";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { GetStaticProps } from "next";
import { useState } from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@framework/product/get-all-products";
import BannerCard from "@components/common/banner-card";
import BannerSliderBlock from "@containers/banner-slider-block";
import { fetchBanners, useBannersQuery } from "@framework/getBanners";
import { NextSeo } from "next-seo";

const Products = () => {
  const [productLength, setProductLength] = useState(0);
  const { data: heroBanner, isSuccess: isHeroSuccess } = useBannersQuery({
    pageName: "shop",
    section: "hero",
  });

  const { data: exploreBanner, isSuccess: isExploreSuccess } = useBannersQuery({
    pageName: "shop",
    section: "explore",
  });

  return (
    <>
      <NextSeo
        title="Products | CropOffs"
        description="Shop for variety of great earrings at an affordable price."
      />
      {/* <TopNavigation /> */}
      <ShopDiscount />
      {isHeroSuccess && heroBanner[0] ? (
        <BannerCard
          key={`banner--key${heroBanner[0]._id}`}
          banner={heroBanner[0]}
          href={heroBanner[0].link}
          className={"p-5"}
        />
      ) : (
        ""
      )}

      <Container>
        {/* <Example /> */}
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="pb-7">
                <BreadcrumbItems separator="/">
                  <ActiveLink
                    href={"/"}
                    activeClassName="font-semibold text-heading"
                  >
                    <a>Home</a>
                  </ActiveLink>
                  <ActiveLink
                    href={"/products"}
                    activeClassName="font-semibold text-heading"
                  >
                    <a className="capitalize">Products</a>
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
              <ShopFilters />
            </StickyBox>
          </div>

          <div className="w-full lg:-ms-9">
            <SearchTopBar length={productLength} />
            <ProductGrid setLength={setProductLength} />
          </div>
        </div>
        {!isExploreSuccess && <BannerSliderBlock banner={exploreBanner!} />}
      </Container>
    </>
  );
};

Products.Layout = Layout;

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [
      "/products-infinite",
      {
        limit: 8,
        page: 1,
        fields:
          "name slug stock price salePrice image shortDetail variations discount",
      },
    ],
    fetchProducts
  );
  await queryClient.prefetchQuery(
    [
      "/banners",
      {
        pageName: "shop",
        section: "hero",
      },
    ],
    fetchBanners
  );

  await queryClient.prefetchQuery(
    [
      "/banners",
      {
        pageName: "shop",
        section: "explore",
      },
    ],
    fetchBanners
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 600,
  };
};
