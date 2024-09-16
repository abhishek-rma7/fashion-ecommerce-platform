"use client";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import SubscriptionWithBg from "@components/common/subscription-with-bg";
import PageHeader from "@components/ui/page-header";
import OrderInformation from "@components/order/order-information";
import { fetchOrder, useOrderQuery } from "@framework/order/get-order";
import usePrice from "@framework/product/use-price";
import { useRouter } from "next/router";
import ErrorInformation from "@components/404/error-information";
import Loader from "@components/Loader.tsx/Loader";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";

function Order() {
  const { query } = useRouter();

  if (!query.orderId) {
    return <ErrorInformation />;
  }
  const { data, isLoading } = useOrderQuery(query.orderId as string);

  const { price: total } = usePrice(
    data && {
      amount: data.total,
      currencyCode: "INR",
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <ErrorInformation
        heading="No order found."
        subHeading="The order with the given order ID doesn't exists."
      />
    );
  }

  return (
    <>
      <NextSeo
        title={`Order Page | CropOffs`}
        description="Welcome to CropOffs. An upcycled jewellery brand started by a woman who has always loved fashion but wanted to make a difference."
      />
      {/* <PageHeader pageHeader={"Order"} /> */}
      <section className="h-auto bg-white">
        <div className="max-w-7xl mx-auto pt-8 px-5 sm:py-12 sm:px-6 lg:px-8 sm:text-center">
          <h2 className="text-xl font-semibold text-indigo-600 tracking-wide uppercase">
            Order Placed
          </h2>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl uppercase">
            Thank You for the purchase!
          </p>
          <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-600">
            Thank you so much for your order. You made our day. <br /> We hope
            you have a lovely day and see you again soon!
          </p>
        </div>
      </section>
      <Container>
        <OrderInformation data={data} total={total} />
        <SubscriptionWithBg />
      </Container>
    </>
  );
}

Order.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query!;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([`/orders/${id}`, id], () =>
    fetchOrder(id as string)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Order;
