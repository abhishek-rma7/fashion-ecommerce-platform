export const siteSettings = {
  name: "CropOffs | Recycled & Upcycled Jewellery Store",
  description:
    "CropOffs is a startup brand that makes upcycled & recycled jewelry. We offers high-quality earrings and the best delivery service.",
  author: {
    name: "Webbify, Inc.",
    websiteUrl: "https://webbify.in",
    address: "",
  },
  logo: {
    url: "/icons/4.png",
    alt: "CropOffs",
    href: "/",
    width: 160,
    height: 80,
  },
  defaultLanguage: "en",
  currencyCode: "INR",
  site_header: {
    menu: [
      {
        id: 1,
        path: "/",
        label: "HOME",
      },
      {
        id: 2,
        path: "/products",
        label: "SHOP",
      },
      {
        id: 9,
        path: "/#",
        label: "Shop By Category",
        columns: [
          {
            id: 2,
            columnItems: [
              {
                id: 1,
                path: "/category/Stud Earrings",
                label: "Stud Earrings",
                img: "https://ik.imagekit.io/abhishekrma7/Studs_O0dU76cvR.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1660193718695",
              },
            ],
          },
          {
            id: 3,
            columnItems: [
              {
                id: 1,
                path: "/category/Abstract Earrings",
                label: "Abstract Earrings",
                img: "https://ik.imagekit.io/abhishekrma7/Abstract_StlOPloF3.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1660193717658",
              },
            ],
          },
          {
            id: 4,
            columnItems: [
              {
                id: 1,
                path: "/category/Floral Earrings",
                label: "Floral Earrings",
                img: "https://ik.imagekit.io/abhishekrma7/Floral_dhOV2U6xS.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1660193717986",
              },
            ],
          },
          {
            id: 5,
            columnItems: [
              {
                id: 1,
                path: "/category/Solid Earrings",
                label: "Solid Earrings",
                img: "https://ik.imagekit.io/abhishekrma7/Solid_h2EvX8Y8n.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1660193718337",
              },
            ],
          },
        ],
      },
      { id: 3, path: "/about-us", label: "ABOUT" },
      {
        id: 5,
        path: "/contact-us",
        label: "CONTACT",
      },
    ],
    mobileMenu: [
      {
        id: 1,
        path: "/",
        label: "HOME",
      },
      {
        id: 2,
        path: "/products",
        label: "SHOP",
      },
      {
        id: 9,
        path: "/#",
        label: "SHOP BY CATEGORY",
        subMenu: [
          {
            id: 2,

            path: "/category/Stud Earrings",
            label: "Stud Earrings",
          },
          {
            id: 3,

            path: "/category/Abstract Earrings",
            label: "Abstract Earrings",
            img: "",
          },
          {
            id: 4,
            path: "/category/Floral Earrings",
            label: "Floral Earrings",
            img: "",
          },
          {
            id: 5,

            path: "/category/Solid Earrings",
            label: "Solid Earrings",
            img: "",
          },
        ],
      },
      { id: 3, path: "/about-us", label: "ABOUT" },
      {
        id: 5,
        path: "/contact-us",
        label: "CONTACT",
      },
    ],
  },
};
