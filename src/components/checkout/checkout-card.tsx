import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useEffect, useState } from "react";
import http from "./../../framework/basic-rest/utils/http";
import { toast } from "react-toastify";
import { Coupon } from "@framework/types";
import PaymentMethod from "@components/Shipping/Shipping";
import { getDiscount } from "@utils/orderHelper";

const CheckoutCard: React.FC = () => {
  let {
    items,
    isEmpty,
    subTotal,
    total,
    coupon,
    addCoupon,
    discount,
    paymentMethod,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [eS, setES] = useState("");

  const { price: subtotal } = usePrice({
    amount: subTotal,
    currencyCode: "INR",
  });

  const checkoutFooter = [
    {
      id: 1,
      name: "Sub Total",
      price: subtotal,
    },
    {
      id: 2,
      name: <p className="flex flex-col">Shipping </p>,
      price: `Free`,
    },

    {
      id: 4,
      name: "Total",
      price: `₹ ${total}`,
    },
  ];

  if (coupon) {
    checkoutFooter.splice(1, 0, {
      id: 3,
      name: "Discount",
      price: `- ₹${discount}`,
    });
  }

  const handleCoupons = async (
    coupon: string = couponCode,
    payment: string
  ) => {
    if (coupon === "") {
      setES("Please enter a coupon code.");
      return;
    }

    try {
      const { data } = await http.get(
        `/coupons/${coupon}?total=${total}&payment=${payment}`
      );
      addCoupon(data.data);
      toast.success("Coupon applied");
    } catch (error: any) {
      setES(error.response.data.message);
    }
  };

  useEffect(() => {
    setCouponCode("");
    setES("");
  }, [paymentMethod]);

  return (
    <div className="pt-12 md:pt-0 2xl:ps-4">
      <div>
        <PaymentMethod coupon={coupon} setCouponCode={setCouponCode} />
        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8 pt-3">
          {"Discount Code"}
        </h2>
        <div className="pb-4">
          <p className="mb-4 italic">
            If you have a promo code, please enter it in the box below.
          </p>
          <div className="pt-2 mb-1 sm:mb-0 md:flex">
            <Input
              type="text"
              name="coupon"
              value={couponCode}
              variant="solid"
              placeholder="Promo Code"
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full md:w-2/3 py-1 md:py-0"
              inputClassName="px-4 lg:px-7 text-center bg-gray-50"
            />

            <Button
              className="w-full md:w-1/3 py-1"
              onClick={() => handleCoupons(couponCode, paymentMethod)}
              variant={"slim"}
            >
              Apply
            </Button>
          </div>

          {coupon ? (
            <>
              <p className={`mt-2 text-base uppercase text-gray-400`}>
                Coupon Applied:{" "}
                <span className="font-bold text-black">{coupon.code}</span>
              </p>
              <p className={`mt-1 text-base uppercase text-green-600`}>
                <span className="font-semibold">{coupon.description}</span>
              </p>
            </>
          ) : (
            <p className={`mt-1 text-base uppercase text-red-600`}>
              <span className="font-semibold">{eS}</span>
            </p>
          )}
          {coupon ? (
            <p className="text-sm">
              *Discount will only be applied on subtotal
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8 mt-4">
        {"Your Order"}
      </h2>
      <div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
        <span>{"Products"}</span>
        <span className="ms-auto flex-shrink-0">{"Total"}</span>
      </div>
      {!isEmpty ? (
        <>
          {items.map((item) => (
            <CheckoutItem item={item} key={item.id} />
          ))}
          {checkoutFooter.map((item: any) => (
            <CheckoutCardFooterItem item={item} key={item.id} />
          ))}
        </>
      ) : (
        <p className="text-red-500 lg:px-3 py-4">{"Cart is empty"}</p>
      )}
    </div>
  );
};

export default CheckoutCard;
