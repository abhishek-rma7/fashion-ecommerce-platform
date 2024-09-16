import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import SubscriptionWithBg from "@components/common/subscription-with-bg";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import ActiveLink from "@components/ui/active-link";
import { useRouter } from "next/router";
import Reviews from "@components/Reviews/Reviews";
import { fetchProduct, useProductQuery } from "@framework/product/get-product";
import ErrorInformation from "@components/404/error-information";
import Loader from "@components/Loader.tsx/Loader";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import ProductGallery from "@components/product/product-image-gallery";

export default function ProductPage() {
  const {
    query: { id },
  } = useRouter();

  const { data, isLoading } = useProductQuery(id as string);

  if (isLoading) {
    <Loader />;
  }

  if (!data?.slug) {
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
  return (
    <>
      <NextSeo
        title={`${data.name} | CropOffs`}
        description={data.description}
      />
      <Divider className="mb-0" />
      <Container>
        <div className="pt-8">
          <ActiveLink href={`/`} activeClassName="font-semibold text-heading">
            <a className="capitalize">Home </a>
          </ActiveLink>
          /
          <ActiveLink
            href={`/products/`}
            activeClassName="font-semibold text-heading"
          >
            <a className="capitalize"> Products </a>
          </ActiveLink>
          /
          <span className="capitalize font-semibold text-heading">
            {" "}
            {data?.name}
          </span>
        </div>
        <div className="bg-white">
          <main className="mx-auto max-w-8xl sm:px-6 sm:pt-16 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              {/* Product */}
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                {/* Image gallery */}
                <ProductGallery gallery={data?.gallery!} />

                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <ProductSingleDetails data={data!} />
                </div>
              </div>
              {!data?.reviews || data?.reviews?.length === 0 ? (
                ""
              ) : (
                <Reviews
                  count={data?.reviews.length}
                  rating={data?.ratingAverage!}
                  reviews={data?.reviews}
                  name={data?.name!}
                  meta={{ slug: data?.slug!, id: data?.id as string }}
                />
              )}
              <RelatedProducts
                sectionHeading="Related products"
                category={data?.category}
              />
            </div>
          </main>
        </div>
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([`/products/${id}`, id], fetchProduct);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
