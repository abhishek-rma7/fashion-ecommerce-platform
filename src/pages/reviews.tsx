import React from "react";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { fetchProduct, useProductQuery } from "@framework/product/get-product";
import { useRouter } from "next/router";
import Button from "@components/ui/button";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import ErrorInformation from "@components/404/error-information";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const ReviewsPage = () => {
  const {
    query: { id },
    push,
  } = useRouter();
  const { data, isLoading } = useProductQuery(id as string);

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

  return <>
    <NextSeo
      title={`${data.name} Reviews | CropOffs`}
      description={data.description}
    />
    <Container className="py-10 text-review">
      <section className="py-24 2xl:py-44 bg-[rgba(237,241,248)] rounded-t-10xl overflow-hidden">
        <div className="container px-4 mx-auto">
          <span className="text-base text-gray-600 uppercase tracking-wide">
            What people say
          </span>
          <h1 className="mt-8 mb-14 md:mb-24 text-3xl md:text-5xl xl:text-7xl font-heading font-medium leading-tight">
            Reviews
          </h1>
          <div className="flex flex-wrap -mx-2 mb-14">
            <div className="w-full xl:w-4/5 px-2 mb-4 xl:mb-0">
              <div className="flex items-center h-full py-12 px-8 bg-white rounded-3xl">
                <div className="flex flex-wrap items-center justify-between w-full -mx-2">
                  <div className="w-full md:w-auto px-2 mb-4 md:mb-0">
                    <span className="block mx-auto max-w-max">
                      <img
                        className="h-72 object-cover"
                        src={data?.image.url}
                        alt=""
                        onClick={() =>
                          push(`/products/${data?.slug}/${data?.id}`)
                        }
                      />
                    </span>
                  </div>
                  <div className="w-full md:w-auto px-2 mb-8 md:mb-0">
                    <Link
                      href={`/products/${data?.slug}/${data?.id}`}
                      className="block mb-2 text-2xl xl:text-3xl font-heading font-medium hover:underline">

                      {data?.name}

                    </Link>
                    <div className="flex">
                      <p className="text-sm font-heading font-medium mr-2">
                        <span>Category: </span>
                        <span className="text-gray-600">
                          {data?.category}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-auto px-2 mb-8 md:mb-0">
                    <p className="text-xl text-review font-heading font-medium">
                      ₹ {data?.salePrice ? data.salePrice : data?.price}{" "}
                      {data.salePrice ? (
                        <span className="line-through text-gray-400">
                          (₹{data.price})
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="w-full md:w-auto px-2">
                    <Button
                      className="inline-block w-full md:w-auto py-4 px-6 text-center leading-8 font-heading font-medium tracking-tighter text-xl rounded-xl"
                      onClick={() =>
                        push(`/products/${data?.slug}/${data?.id}`)
                      }
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/5 px-2 mb-4 md:mb-0">
              <div className="py-12 px-12 h-full bg-white rounded-3xl">
                <p className="font-heading font-medium">
                  <span className="text-9xl">{data?.ratingAverage}</span>
                  <span className="text-gray-600">/5</span>
                </p>
                <div className="flex mb-3">
                  {Array.from({
                    length: Math.ceil(data?.ratingAverage!),
                  }).map(() => (
                    <svg
                      width={20}
                      height={20}
                      className="inline-block mr-1"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                        fill="#FFCB00"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {data?.ratingQuantity} reviews
                </p>
              </div>
            </div>
          </div>
          <span className="inline-block mb-14 text-3xl font-heading font-medium underline hover:text-darkBlueGray-700">
            {data?.ratingQuantity} reviews
          </span>
          {data?.reviews?.map((item) => {
            return (
              <div
                className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden"
                key={item._id}
              >
                <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                  <div className="flex flex-wrap items-center">
                    <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                      {item.user.firstName} {item.user.lastName}
                    </h4>
                    <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200" />
                    <span className="mr-4 text-xl font-heading font-medium">
                      {item.rating}
                    </span>
                    <div className="inline-flex">
                      {Array.from({
                        length: Math.floor(item.rating),
                      }).map(() => (
                        <svg
                          width={20}
                          height={20}
                          className="inline-block mr-1"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                            fill="#FFCB00"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-2/3 mb-6 md:mb-0">
                      <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                        {item.comment}
                      </p>
                    </div>
                    <div className="w-full md:w-1/3 text-right">
                      <p className="mb-8 text-sm text-review">
                        Added{" "}
                        {timeAgo.format(
                          new Date(item.createdAt!),
                          "round-minute"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center mt-3">
            <Button loading={isLoading}>Load More</Button>
          </div>
        </div>
      </section>
    </Container>
  </>;
};

ReviewsPage.Layout = Layout;

export default ReviewsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query!;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([`/products/${id}`, id], fetchProduct);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
