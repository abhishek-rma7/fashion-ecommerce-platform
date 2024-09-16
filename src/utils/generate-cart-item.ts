import { Attributes } from "@framework/types";
import isEmpty from "lodash/isEmpty";

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    url: string;
    [key: string]: unknown;
  };
  price: number;
  gender: string;
  salePrice?: number;
  [key: string]: unknown;
}

export function generateCartItem(item: Item, attributes: Attributes) {
  const { id, name, slug, image, price, salePrice, gender, stock } = item;
  return {
    product: id,
    stock,
    id: !isEmpty(attributes)
      ? `${id}.${Object.values(attributes).join(".")}`
      : id,
    name,
    slug,
    image: attributes.image ? attributes.image : image.url,
    price: salePrice ? salePrice : price,
    gender,
    attributes,
  };
}
