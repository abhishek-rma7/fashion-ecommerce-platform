import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";

export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: "Social",
      lists: [
        {
          id: 1,
          title: "Instagram",
          path: "https://www.instagram.com/cropoffs/",
          icon: <IoLogoInstagram />,
        },
        {
          id: 2,
          title: "Facebook",
          path: "https://www.facebook.com/cropoffs-100477079319604/",
          icon: <IoLogoFacebook />,
        },
      ],
    },
    {
      id: 2,
      widgetTitle: "Contact",
      lists: [
        {
          id: 1,
          title: "Contact Us",
          path: "/contact-us",
        },
        {
          id: 2,
          title: "support@cropoffs.com",
          path: "/",
        },

        {
          id: 4,
          title: "+ 91 635-136-1244",
          path: "/",
        },
      ],
    },
    // {
    //   id: 3,
    //   widgetTitle: "About",
    //   lists: [
    //     {
    //       id: 1,
    //       title: "link-support-center",
    //       path: "/contact-us",
    //     },
    //     {
    //       id: 2,
    //       title: "link-customer-support",
    //       path: "/",
    //     },
    //     {
    //       id: 3,
    //       title: "link-about-us",
    //       path: "/contact-us",
    //     },
    //     {
    //       id: 4,
    //       title: "link-copyright",
    //       path: "/",
    //     },
    //   ],
    // },
    {
      id: 4,
      widgetTitle: "Customer Care",
      lists: [
        {
          id: 2,
          title: "Shipping",
          path: "/return",
        },
        {
          id: 3,
          title: "Exchanges",
          path: "/return",
        },
      ],
    },
    {
      id: 5,
      widgetTitle: "Our Information",
      lists: [
        {
          id: 1,
          title: "Privacy",
          path: "/privacy",
        },
        {
          id: 2,
          title: "Terms",
          path: "/terms",
        },
        {
          id: 3,
          title: "Return Policy",
          path: "/return",
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      path: "/",
      image: "/assets/images/payment/mastercard.svg",
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "/",
      image: "/assets/images/payment/visa.svg",
      name: "payment-visa",
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: "/",
      image: "/assets/images/payment/razorpay.svg",
      name: "RazorPay",
      width: 100,
      height: 20,
    },
  ],
};
