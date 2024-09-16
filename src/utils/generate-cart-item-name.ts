import { Attributes } from "@framework/types";
import isEmpty from "lodash/isEmpty";
import orderBy from "lodash/orderBy";

export function generateCartItemName(name: string, attributes: Attributes) {
  if (!isEmpty(attributes)) {
    delete attributes.image;
    const sortedAttributes = orderBy(attributes);
    return `${name} - ${sortedAttributes.join(", ")}`;
  }
  return name;
}
