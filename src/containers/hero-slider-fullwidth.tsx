import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { useBannersQuery } from "@framework/getBanners";
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
import { useWindowSize } from "react-use";

const HeroSlider: React.FC = () => {
  const { data, isLoading } = useBannersQuery({
    pageName: "home",
    section: "hero",
  });

  const { width } = useWindowSize();

  return (
    <div className="relative mb-5 md:mb-8">
      <Carousel
        autoplay={isLoading ? false : true}
        className="mx-0"
        buttonClassName="hidden"
        paginationPosition="left"
        effect="fade"
        pagination={{
          clickable: false,
        }}
      >
        {!isLoading ? (
          data?.map((banner: any) => (
            <SwiperSlide
              className="carouselItem"
              key={`banner--key-${banner?._id}`}
            >
              <BannerCard banner={banner} href={`${banner.link}`} />
            </SwiperSlide>
          ))
        ) : (
          <CategoryListCardLoader
            width={width < 480 ? 1080 : 1920}
            height={width < 480 ? 500 : 500}
          />
        )}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
