"use client";
import Link from "@components/ui/link";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useWindowSize } from "@utils/use-window-size";
import cn from "classnames";
import { LinkProps } from "next/link";

interface BannerProps {
  banner: any;
  variant?: "rounded" | "default";
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  href: LinkProps["href"];
}

function getImage(deviceWidth: number, banner: any) {
  return deviceWidth < 480 ? banner.mobileImage : banner.desktopImage;
}

const BannerCard: FC<BannerProps> = ({
  banner,
  className,
  variant = "rounded",
  effectActive = false,
  classNameInner,
  href,
}) => {
  const { width } = useWindowSize();
  const [selectedImage, setSelectedImage] = useState({
    url: "",
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSelectedImage(getImage(width, banner));
  }, []);

  if (selectedImage.url === "") {
    return <div></div>;
  }

  console.log(banner);

  return (
    <div className={cn("mx-auto", className)}>
      <Link
        href={href}
        className={cn(
          "h-full group flex justify-center relative overflow-hidden",
          classNameInner
        )}
      >
        <Image
          src={selectedImage?.url}
          width={selectedImage?.width}
          height={selectedImage?.height}
          alt={banner.slug}
          quality={80}
          className={cn("bg-gray-300 object-cover w-full", {
            "rounded-md": variant === "rounded",
          })}
        />
        {effectActive && (
          <div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        )}
      </Link>
    </div>
  );
};

export default BannerCard;
