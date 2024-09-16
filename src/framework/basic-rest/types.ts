import { QueryKey } from "@tanstack/react-query";

export interface RazorpayResponse {
  _id: string;
  id: string;
  currency: string;
  amount: string | number;
  status: "paid" | "created" | "attempted";
  email: string;
  contact: string;
  name: string;
}
export interface Coupon {
  code: string;
  minPriceRequired?: number;
  amount: number;
  isPercent: boolean;
  _id: string;
  maxDiscount?: number;
  description: string;
}

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  [key: string]: unknown;
  page?: number | string;
  limit?: number;
  sort?: string;
  fields?: string;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  _id: string | number;
  thumbnail: string;
  url: string;
};

export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};

interface BannerImage {
  url: string;
  width: number;
  height: number;
}

export interface Banner {
  _id: string;
  desktopImage: BannerImage;
  mobileImage: BannerImage;
  page: string;
  section: string;
  slug: string;
  link: string;
}

export interface Review {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  createdAt?: Date;
}

export type Variations = {
  image: Attachment;
  value: string;
  meta: string;
};

export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  gender: string;
  quantity: number;
  salePrice?: number;
  image: Attachment;
  shortDetail: string;
  sku?: string;
  gallery?: Attachment[];
  category?: string;
  tag?: Tag[];
  meta?: any[];
  ratingQuantity?: number;
  ratingAverage?: number;
  reviews?: Review[];
  description?: string;
  variations?: Variations[];
  [key: string]: any;
};

export interface User {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password?: string;
  _id: string;
  address?: CheckoutAddress;
  city?: string;
  state?: string;
  zipcode?: string;
}

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  date: string;
  status: string;
  name: string;
  email: string;
  paymentType: string;
  orderStatus: string;
  slug: string;
  orderId: string;
  items: Item[];
  total: number;
  subTotal: number;
  shipping: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  coupon?: string;
  discount: number;
  payment?: {
    method: string;
    id: string;
    status: string;
  };
  shipping_fee: number;
};

export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  gender: string;
  [key: string]: any;
}

export interface User {
  name: string;
  email: string;
  orders: CheckoutInputType[];
  _id: string;
}

export interface CheckoutAddress {
  location: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Attributes {
  color: string;
  image?: string;
}

export interface CheckoutInputType {
  user: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: CheckoutAddress;
  save: boolean;
  note: string;
  paymentType: string;
  payment: {
    razorpay_payment_id: string;
    org_name: string;
  };
  response: any;
  paymentMethod: string;

  items: Item[];
  total: number;
  coupon?: string;
  userId?: string;
  shipping_fee: number;
}
