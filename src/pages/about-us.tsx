import Layout from "@components/layout/layout";
import Loader from "@components/Loader.tsx/Loader";
import Container from "@components/ui/container";
import Divider from "@components/ui/divider";
import { fetchBanners, useBannersQuery } from "@framework/getBanners";
import { aboutSetting } from "@settings/about.settings";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { Head } from "next/document";
import Image from "next/image";
import Link from "next/link";
import { ImSmile2 } from "react-icons/im";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useWindowSize } from "react-use";

export default function AboutUsPage() {
  const { width } = useWindowSize();
  const { data, isLoading } = useBannersQuery({
    pageName: "about",
  });

  if (isLoading) {
    return <Loader />;
  }

  const getBanner = (section: string) => {
    for (const banner of data!) {
      if (banner.section === section) {
        return width < 1050 ? banner.mobileImage.url : banner.desktopImage.url;
      }
    }
  };

  return <>
    <NextSeo
      title="About Us | CropOffs"
      description="Welcome to CropOffs. An upcycled jewellery brand started by a woman who has always loved fashion but wanted to make a difference."
    />

    {/* End of seo */}
    <div className="bg-white">
      <div aria-hidden="true" className="relative">
        <img
          src={getBanner("hero")}
          alt=""
          className="w-full h-96 object-top object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white" />
      </div>
      <div className="relative -mt-10 max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center lg:max-w-4xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl capitalize">
            Welcome to CropOffs
          </h2>
          <p className="mt-4 text-[rgb(107,114,128)] text-lg sm:text-xl">
            An upcycled jewellery brand started by a woman who has always
            loved fashion but wanted to make a difference.
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <div className="py-4 text-black text-2xl">
      <Container>
        <div className="flex flex-col w-full mx-auto max-w-[1200px]">
          <div className="py-8 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div className="md:5/12 lg:w-5/12">
                  <Image
                    src={getBanner("Section 1")!}
                    alt="image"
                    width={700}
                    height={574}
                    loading="lazy"
                  />
                </div>
                <div className="md:7/12 lg:w-6/12">
                  <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                    Unique and elegant designs for people who like to stand
                    out
                  </h2>
                  <p className="mt-6 text-gray-600 text-lg text-leading">
                    Our products are 100% handmade & upcycled from leftover
                    scraps collected from brand owners, manufacturers &
                    tailors, that would normally be sent into the landfill.
                  </p>
                  <p className="mt-4 text-gray-600 text-lg text-leading">
                    {" "}
                    These are new condition scraps that have never been
                    previously used.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div className="md:7/12 lg:w-6/12">
                  <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                    Our handmade earrings are lovingly made to be <br />{" "}
                    perfect for your ears.
                  </h2>
                  <p className="mt-6 text-gray-600 text-lg leading-7">
                    Our earrings come in a variety of colours & patterns which
                    means you can find something that matches your style or
                    mood perfectly.
                  </p>
                  <p className="mt-6 text-gray-600 text-lg leading-7">
                    We believe that good design does not create waste so we
                    want you to feel good in wearing them knowing that you did
                    something helpful for our planet earth{" "}
                    <ImSmile2 color="green" className="inline text-xl" />.
                  </p>
                </div>
                <div className="md:5/12 lg:w-5/12">
                  <Image
                    src={getBanner("Section 2")!}
                    alt="image"
                    width={700}
                    height={574}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <Divider />
          <div className="flex mt-8 lg:mt-14 mb-6 lg:mb-10">
            <Image
              src={getBanner("Ending")!}
              alt={"text-map"}
              className=" me-4"
              height={500}
              width={1200}
            />
          </div>
          <h2 className="text-lg md:text-xl lg:text-[24px] font-semibold">
            Live green to save more green.
          </h2>
          <p className="font-normal text-base lg:text-lg leading-7 2xl:text-[20px] lg:leading-loose lg:mt-4 mb-1">
            {aboutSetting.titleThree} &nbsp;
            <a
              href="mailto:support@cropoffs.com"
              target={"_blank"}
              className="text-indigo-700"
            >
              support@cropoffs.com
            </a>
            .
          </p>
          <p className="font-normal text-base lg:text-lg leading-7 2xl:text-[20px] lg:leading-loose mb-3.5">
            For all other inquiries, visit our
            <Link href={"/contact-us"} className="text-indigo-600">
               Contact Us 
            </Link>
            page.
          </p>
        </div>
      </Container>
    </div>
  </>;
}

AboutUsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  // Banners Prefetch Queries

  await queryClient.prefetchQuery(
    [
      "/banners",
      {
        pageName: "about",
      },
    ],
    fetchBanners
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 600,
  };
};
