import Widgets from "./widgets";
import Copyright from "./copyright";
import { footer } from "./data";
import Image from "next/image";
import { ImFacebook, ImInstagram } from "react-icons/im";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoSend,
} from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import Link from "next/link";

const { widgets, payment } = footer;

const lists = [
  {
    id: 1,
    title: "Facebook",
    path: "https://www.facebook.com/cropoffs-100477079319604/",
    icon: <IoLogoFacebook color="black" />,
  },
  {
    id: 2,
    title: "Instagram",
    path: "https://www.instagram.com/cropoffs/",
    icon: <IoLogoInstagram color="black" />,
  },
  {
    id: 3,
    title: "Pinterest",
    path: "https://in.pinterest.com/cropoffs/",
    icon: <IoLogoPinterest color="black" />,
  },
];

const payments = [
  {
    id: 1,
    title: "Visa",
    src: "/assets/images/payment/visa.svg",
  },
  {
    id: 2,
    title: "MasterCard",
    src: "/assets/images/payment/mastercard.svg",
  },
  {
    id: 3,
    title: "RazorPay",
    src: "/assets/images/payment/razorpay.svg",
  },
];

const otherList = [
  {
    title: "About Us",
    links: [
      {
        title: "About us",
        href: "/about-us",
      },
      {
        title: "Contact us",
        href: "/contact-us",
      },
      {
        title: "About team",
        href: "/about-us",
      },
    ],
  },
  {
    title: "Our Information",
    links: [
      {
        title: "Privacy policy",
        href: "/privacy",
      },
      {
        title: "Terms & conditions",
        href: "/terms",
      },
      {
        title: "Return & Exchange",
        href: "/return",
      },
      {
        title: "Shipping & Refund",
        href: "/refund",
      },
    ],
  },
];
const Footer: React.FC = () => (
  <footer className="mt-[50px] lg:mt-14 2xl:mt-16">
    <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
      <div className="grid grid-cols-2 gap-5 pb-[50px] sm:gap-9 md:grid-cols-7 lg:gap-11 xl:grid-cols-12 xl:gap-7">
        <div className="border-border-three col-span-full mb-4 border-b pb-10 sm:col-span-1 sm:mb-0 sm:border-b-0 sm:pb-0 md:col-span-3">
          <div className="mx-auto flex max-w-[300px] flex-col pb-6 text-center sm:pb-5 sm:ltr:ml-0 sm:ltr:text-left sm:rtl:mr-0 sm:rtl:text-right">
            <a className="focus:outline-none -ml-5" href="/">
              <Image src="/icons/3.png" width={160} height={40} />
            </a>
            <p className="text-brand-muted lg:text-15px text-sm leading-7 lg:leading-[27px]">
              CropOffs is a startup brand that makes upcycled & recycled
              jewellery. We offers high-quality earrings and the best delivery
              service.
            </p>
          </div>
          <ul className="mx-auto flex flex-wrap justify-center sm:justify-start">
            {lists.map((item) => {
              return (
                <li
                  className="transition hover:opacity-80 text-4xl p-1"
                  key={item.id}
                  title={item.title}
                >
                  <a target="_blank" rel="noreferrer" href={item.path}>
                    {item.icon}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {otherList.map((list) => {
          return (
            <div
              className="col-span-1 pb-3.5 sm:pb-0 md:col-span-2"
              key={list.title}
            >
              <h3 className="text-brand-dark mb-4 pb-0.5 text-base font-bold sm:mb-5 lg:mb-6 lg:text-[17px] lg:leading-7">
                {list.title}
              </h3>
              <ul className="lg:text-15px flex flex-col space-y-3 text-sm">
                {list.links.map((item) => {
                  return (
                    <li className="flex items-baseline" key={item.title}>
                      <Link
                        href={item.href}
                        className="hover:text-brand-dark transition-colors duration-200">

                        {item.title}

                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="3xl:ltr:pl-16 3xl:rtl:pr-16 border-border-three col-span-full flex flex-col border-t pt-8 sm:col-span-1 sm:border-t-0 sm:pt-0 md:col-span-4 md:col-start-4 xl:col-span-3 xl:col-start-auto 2xl:ltr:pl-7 2xl:rtl:pr-7">
          <h3 className="text-brand-dark mb-4 text-base lg:mb-6 lg:pb-0.5 lg:text-[17px] lg:leading-7 font-bold">
            Subscribe Now
          </h3>
          <p className="text-brand-muted lg:text-15px max-w-[400px] text-sm leading-7 lg:-mt-1 lg:leading-[27px]">
            Subscribe your email for newsletter and featured news based on your
            interest
          </p>
          <form className="relative mt-5 max-w-[400px]">
            <span className="absolute top-0 flex h-12 transform items-center px-3.5 ltr:left-0 rtl:right-0">
              <FaFacebookMessenger />
            </span>
            <div className="w-full">
              <input
                type="email"
                id="subscription-email"
                name="email"
                placeholder="Write your email here"
                className="text-input text-13px font-body min-h-12 text-brand-dark text-brand-dark border-border-two focus:border-brand h-11 h-12 w-full appearance-none rounded rounded-md border py-2 px-4 placeholder-[#B3B3B3] transition transition duration-150 duration-200 ease-in-out ease-in-out focus:border-2 focus:outline-none focus:ring-0 ltr:pl-10 rtl:pr-10 md:h-12 lg:text-sm 2xl:px-11"
                autoComplete="off"
                spellCheck="false"
                aria-invalid="false"
              />
            </div>
            <button
              className="absolute top-0 h-12 scale-90 transform px-3 hover:opacity-80 focus:outline-none ltr:right-0 rtl:left-0 lg:px-3.5 2xl:scale-100"
              aria-label="Subscribe Button"
            >
              <IoSend color="green" />
            </button>
          </form>
        </div>
      </div>
    </div>
    <div className="pb-20 lg:pb-7">
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
        <div className="border-border-three flex flex-col border-t pt-6 text-center md:flex-row md:justify-between lg:pt-7 items-center">
          <p className="text-brand-dark lg:text-15px text-sm leading-7 lg:leading-[27px]">
            ©&nbsp;{/* */}Copyright{/* */}
            {/* */} 2022{/* */}&nbsp;
            <a
              className="text-brand-dark hover:text-brand transition-colors duration-200 ease-in-out font-bold"
              href="https://webbify.in"
              target={"_blank"}
            >
              Webbify Pvt. Ltd.
            </a>
            &nbsp;
            {/* */}All rights reserved
          </p>
          <ul className="mx-auto -mb-1.5 flex flex-wrap items-center justify-center pt-3.5 md:mx-0 md:mb-0 md:pt-0">
            {payments.map((item) => {
              return (
                <li
                  className="inline-flex transition hover:opacity-80 md:mb-0 w-20 h-10"
                  key={item.id}
                >
                  <Image
                    alt={item.title}
                    src={item.src}
                    width={72}
                    height={72}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  </footer>

  // <footer className="border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
  //   <Widgets widgets={widgets} />
  //   <Copyright payment={payment} />
  // </footer>
);

export default Footer;
