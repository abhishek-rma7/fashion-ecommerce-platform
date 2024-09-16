import Loader from "@components/Loader.tsx/Loader";
import { useBannersQuery } from "@framework/getBanners";
import Image from "next/image";
interface CategoryBannerProps {
  category: string;
  className?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  category,
  className = "mb-7",
}) => {
  const { data: banners, isLoading } = useBannersQuery({
    pageName: "category",
    section: category,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (banners?.length === 0) {
    return <div></div>;
  }

  return (
    <div
      className={`bg-gray-200 rounded-md relative flex flex-row ${className}`}
    >
      <div className="hidden md:flex">
        <Image
          src={banners[0]?.desktopImage.url!}
          alt="Category Banner"
          width={1600}
          height={800}
          className="rounded-md"
          quality={70}
        />
      </div>
      <div className="relative md:absolute top-0 start-0 h-auto md:h-full w-full md:w-2/5 flex items-center py-2 sm:py-3.5">
        <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-heading p-7 text-center w-full block">
          {category}
        </h2>
      </div>
    </div>
  );
};

export default CategoryBanner;
