"use client";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { useEffect, useState } from "react";
import { useCart } from "@contexts/cart/cart.context";
import { NextSeo } from "next-seo";
import CheckoutBanner from "@components/checkout/checkout-banner";

export default function CheckoutPage() {
  let { addCoupon } = useCart();
  const [paymentType, setPaymentType] = useState("Prepaid");

  useEffect(() => {
    addCoupon(undefined);
  }, []);

  return (
    <>
      <NextSeo
        title="Checkout | CropOffs"
        description="Welcome to CropOffs. An upcycled jewellery brand started by a woman who has always loved fashion but wanted to make a difference."
      />
      <CheckoutBanner />
      <PageHeader pageHeader="Checkout" />
      <Container>
        <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="order-2 md:order-1 md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
            <CheckoutForm />
          </div>
          <div className="order-1 md:order-2 md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
            <CheckoutCard />
          </div>
        </div>
      </Container>
    </>
  );
}

CheckoutPage.Layout = Layout;
