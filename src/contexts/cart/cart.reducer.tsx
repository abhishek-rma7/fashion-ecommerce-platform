import { Coupon } from "@framework/types";
import {
  Item,
  UpdateItemInput,
  addItemWithQuantity,
  removeItemOrQuantity,
  addItem,
  updateItem,
  removeItem,
  calculateUniqueItems,
  calculateItemTotals,
  calculateTotalItems,
  calculateSubTotal,
  calculateTotal,
} from "./cart.utils";
import { getDiscount } from "@utils/orderHelper";

interface Metadata {
  [key: string]: any;
}

type Action =
  | { type: "ADD_ITEM_WITH_QUANTITY"; item: Item; quantity: number }
  | { type: "REMOVE_ITEM_OR_QUANTITY"; id: Item["id"]; quantity?: number }
  | { type: "ADD_ITEM"; id: Item["id"]; item: Item }
  | { type: "UPDATE_ITEM"; id: Item["id"]; item: UpdateItemInput }
  | { type: "REMOVE_ITEM"; id: Item["id"] }
  | { type: "RESET_CART" }
  | { type: "ADD_COUPON"; coupon: Coupon }
  | { type: "RESET_COUPON" }
  | { type: "PAYMENT_METHOD"; paymentMethod: "Prepaid" | "Cash on Delivery" };

export interface State {
  paymentMethod: string;
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  coupon?: Coupon;
  totalUniqueItems: number;
  discount: number;
  total: number;
  shipping: number;
  subTotal: number;
  meta?: Metadata | null;
}
export const initialState: State = {
  paymentMethod: "Prepaid",
  items: [],
  isEmpty: true,
  totalItems: 0,
  discount: 0,
  coupon: undefined,
  totalUniqueItems: 0,
  shipping: 0,
  total: 0,
  subTotal: 0,
  meta: null,
};
export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM_WITH_QUANTITY": {
      const items = addItemWithQuantity(
        state.items,
        action.item,
        action.quantity
      );
      return generateFinalState(state, items);
    }
    case "REMOVE_ITEM_OR_QUANTITY": {
      const items = removeItemOrQuantity(
        state.items,
        action.id,
        (action.quantity = 1)
      );
      return generateFinalState(state, items);
    }
    case "ADD_ITEM": {
      const items = addItem(state.items, action.item);
      return generateFinalState(state, items);
    }
    case "REMOVE_ITEM": {
      const items = removeItem(state.items, action.id);
      return generateFinalState(state, items);
    }
    case "UPDATE_ITEM": {
      const items = updateItem(state.items, action.id, action.item);
      return generateFinalState(state, items);
    }
    case "PAYMENT_METHOD": {
      const PaymentMethod = action.paymentMethod;
      state.paymentMethod = PaymentMethod;
      return generateFinalState(state, state.items);
    }

    case "ADD_COUPON": {
      const items = state.items;
      state.coupon = action.coupon;
      return generateFinalState(state, items);
    }

    case "RESET_COUPON": {
      state.coupon = undefined;
      return generateFinalState(state, state.items);
    }
    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
}

const generateFinalState = (state: State, items: Item[]) => {
  const totalUniqueItems = calculateUniqueItems(items);
  return {
    ...state,
    coupon: state.coupon,
    paymentMethod: state.paymentMethod,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItems,
    discount: getDiscount(state.subTotal, state.coupon!).dp,
    subTotal: calculateSubTotal(items),
    total: calculateTotal(items, state.coupon),
    isEmpty: totalUniqueItems === 0,
  };
};
