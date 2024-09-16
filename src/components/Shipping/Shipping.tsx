/* This example requires Tailwind CSS v2.0+ */
import { useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useCart } from "@contexts/cart/cart.context";
import { toast } from "react-toastify";

const orderType = [
  {
    id: 2,
    title: "Prepaid",
    description: "Seamless Payments using UPI.",
  },
  {
    id: 1,
    title: "Cash on Delivery",
    description: "Available on orders above ₹299.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PaymentMethod({ coupon, setCouponCode }) {
  const { paymentMethod, setPaymentType, resetCoupon, total } = useCart();

  useEffect(() => {
    setPaymentType("Prepaid");
  }, []);

  return (
    <RadioGroup
      value={paymentMethod}
      onChange={(e) => {
        if (total < 299 && e === "Cash on Delivery") {
          toast.error(
            "Cash on Delivery is only available for orders above 299!"
          );
          return;
        } else {
          setPaymentType(e as any);
          if (coupon) {
            resetCoupon();
            setCouponCode("");
          }
        }
      }}
    >
      <RadioGroup.Label className="text-base font-medium text-gray-900">
        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-4 mt-4">
          Payment Method
        </h2>
      </RadioGroup.Label>

      <div className=" grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {orderType.map((type) => (
          <RadioGroup.Option
            key={type.id}
            value={type.title}
            disabled={total < 299}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex-1 flex">
                  <div className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-base font-semibold text-gray-900"
                    >
                      {type.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="block text-sm font-normal text-placeholder"
                    >
                      {type.description}
                    </RadioGroup.Description>
                  </div>
                </div>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    "h-6 w-6 text-indigo-600"
                  )}
                  aria-hidden="true"
                />
                <div
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-indigo-500" : "border-transparent",
                    "absolute -inset-px rounded-lg pointer-events-none"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
