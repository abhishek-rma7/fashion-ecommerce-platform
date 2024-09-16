import Layout from "@components/layout/layout";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Subscribed = () => {
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="flex justify-center">
            <img src="/icons/confetti.gif" className="h-40" />
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Newsletter Subscribed!
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-800">
            Your email: {email} is added to our subscription list.
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-800">
            You will receive emails about out special offers, free giveaways,
            and once-in-a-lifestyle deals.
          </p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

Subscribed.Layout = Layout;
export default Subscribed;
