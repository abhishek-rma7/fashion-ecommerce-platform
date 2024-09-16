"use client";
import BannerCard from "@components/common/banner-card";
import { useBannersQuery } from "@framework/getBanners";
import React from "react";

const ParallaxBanner = () => {
  const { data: banner, isSuccess } = useBannersQuery({
    pageName: "home",
    section: "parallax",
  });

  return (
    <div>
      {banner && (
        <BannerCard
          key={`banner--key${banner[0]?._id}`}
          banner={banner ? banner[0] : ""}
          href={banner[0]?.link}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-5 my-8"
        />
      )}
    </div>
  );
};

export default ParallaxBanner;
