"use client";
import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { useWindowSize } from "@utils/use-window-size";
import { useBannersQuery } from "@framework/getBanners";

const breakpoints = {
  "1025": {
    slidesPerView: 3,
    spaceBetween: 28,
  },
  "480": {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  "0": {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

interface BannerProps {
  className?: string;
  limit?: number;
}

const SaleBannerGrid: React.FC<BannerProps> = ({
  className = "mb-12 lg:mb-14 xl:mb-16 lg:pb-1 xl:pb-0",
  limit = 3,
}) => {
  const { width } = useWindowSize();
  const { data: banners } = useBannersQuery({
    pageName: "home",
    section: "explore",
  });

  return (
    <div className={`${className}`}>
      {width < 768 ? (
        <div>
          <Carousel breakpoints={breakpoints}>
            {banners?.slice(0, limit).map((banner: any) => (
              <SwiperSlide key={banner._id}>
                <BannerCard
                  banner={banner}
                  href={`${banner.link}`}
                  className="h-full"
                  // effectActive={true}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-2 md:gap-5 xl:gap-7 relative">
          {banners?.slice(0, limit).map((banner: any) => (
            <BannerCard
              key={banner._id}
              banner={banner}
              href={`${banner.link}`}
              className={banner.type === "large" ? "col-span-2" : "col-span-1"}
              // effectActive={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SaleBannerGrid;
