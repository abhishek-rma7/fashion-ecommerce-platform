import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@components/layout/header/header"), {
  ssr: false,
});
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";
import CookieBar from "@components/common/cookie-bar";
import { useAcceptCookies } from "@utils/use-accept-cookies";
import Button from "@components/ui/button";

const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
        ]}
        title="CropOffs | Recycled & Upcycled Jewellery Store"
        description="CropOffs is a startup brand that makes upcycled & recycled jewellery. We offers high-quality earrings and the best delivery service."
        canonical="https://cropoffs.com/"
        openGraph={{
          url: "https://cropoffs.com/",
          title: "CropOffs | Recycled & Upcycled Jewellery Store",
          description:
            "CropOffs is a startup brand that makes upcycled & recycled jewellery. We offers high-quality earrings and the best delivery service.",
          images: [
            {
              url: "/assets/icons/4.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: "/assets/images/og-image-02.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
          ],
        }}
      />
      <Header />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      <Search />
      <CookieBar
        title={"This website uses cookies"}
        hide={acceptedCookies}
        action={
          <Button onClick={() => onAcceptCookies()} variant="slim">
            {"Accept cookies"}
          </Button>
        }
      />
    </div>
  );
};

export default Layout;
