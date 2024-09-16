import React from "react";
import { cartReducer, State, initialState } from "./cart.reducer";
import { Item, getItem } from "./cart.utils";
import { useLocalStorage } from "@utils/use-local-storage";
import { toast } from "react-toastify";
import { useWindowSize } from "react-use";
import { Coupon } from "@framework/types";
interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item["id"]) => void;
  // updateItem: (id: Item["id"], payload: object) => void;
  // updateItemQuantity: (id: Item["id"], quantity: number) => void;
  clearItemFromCart: (id: Item["id"]) => void;
  getItemFromCart: (id: Item["id"]) => any | undefined;
  isInCart: (id: Item["id"]) => boolean;
  emptyCart: () => void;
  addCoupon: (coupon: Coupon | undefined) => void;
  resetCoupon: () => void;
  setPaymentType: (paymentMethod: "Prepaid" | "Cash on Delivery") => void;
  // updateCartMetadata: (metadata: Metadata) => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = "CartContext";

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export const CartProvider = (props: any) => {
  const { width } = useWindowSize();
  const [savedCart, saveCart] = useLocalStorage(
    `CropOffs-cart`,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item, quantity: number) => {
    if (item.stock < quantity) {
      return toast.error("Product quantity greater than stock.");
    }

    if (isInCart(item.id)) {
      const itemInCart = getItemFromCart(item.id)!;
      const newQuantity = quantity + itemInCart.quantity;

      if (newQuantity > item.stock) {
        return toast.error("Product quantity greater than stock.");
      }
    }

    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });

    toast.dark("Added to the bag", {
      progressClassName: "fancy-progress-bar",
      position: width > 768 ? "bottom-right" : "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const removeItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });
  const clearItemFromCart = (id: Item["id"]) =>
    dispatch({ type: "REMOVE_ITEM", id });
  const isInCart = (id: Item["id"]) => !!getItem(state.items, id);
  const getItemFromCart = (id: Item["id"]) => getItem(state.items, id);
  const addCoupon = (coupon: Coupon) =>
    dispatch({ type: "ADD_COUPON", coupon });
  const setPaymentType = (paymentMethod: "Prepaid" | "Cash on Delivery") =>
    dispatch({ type: "PAYMENT_METHOD", paymentMethod });
  const emptyCart = () => {
    dispatch({ type: "RESET_CART" });
  };
  const resetCoupon = () => {
    dispatch({ type: "RESET_COUPON" });
  };

  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      setPaymentType,
      isInCart,
      emptyCart,
      addCoupon,
      resetCoupon,
    }),
    [state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
