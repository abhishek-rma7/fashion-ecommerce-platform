import Image from "next/image";
import { IoHomeSharp } from "react-icons/io5";
import Text from "@components/ui/text";
import Link from "@components/ui/link";

const ErrorInformation: React.FC<{
  href?: string;
  btnText?: string;
  img?: string;
  heading?: string;
  subHeading?: string;
}> = ({
  href = "/",
  btnText = "Cropoffs Home",
  img = "/assets/images/404.svg",
  heading = "Lost your way?",
  subHeading = "Sorry, we cant find that page. You'll find loads to explore on the home page.",
}) => {
  return (
    <div className="border-t border-b border-gray-300 text-center px-16 py-8 sm:py-16 lg:py-20 xl:py-8 flex items-center justify-center">
      <div>
        <Image src={img} alt="error-heading" width={822} height={392} />

        <Text variant="mediumHeading" className="uppercase">
          {heading}
        </Text>
        <p className="text-sm md:text-base leading-7 pt-2 md:pt-3.5 pb-7 md:pb-9">
          {subHeading}
        </p>
        <Link
          href={href}
          className="text-[13px] md:text-sm lg:text-base leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 bg-heading text-white px-4 md:px-6  py-2.5 lg:py-3 hover:text-white hover:bg-gray-600 hover:shadow-cart rounded-lg"
        >
          <IoHomeSharp />
          <span className="ps-1.5">{btnText}</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorInformation;
