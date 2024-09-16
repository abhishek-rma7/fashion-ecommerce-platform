import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router from "next/router";
import { useCart } from "@contexts/cart/cart.context";
import { useEffect, useState } from "react";
import { useUI } from "@contexts/ui.context";
import { CheckoutInputType, RazorpayResponse, User } from "@framework/types";
import http from "@framework/utils/http";
import { toast } from "react-toastify";
import Example from "./checkout-address-card";
import PaymentModal from "./checkout-payment-modal";
import CODModal from "./checkout-cod-modal";
import Swal from "sweetalert2";

const CheckoutForm: React.FC = () => {
  const {
    mutate,
    isLoading,
    isSuccess,
    error,
    isError,
    data: successData,
  } = useCheckoutMutation();
  const { openCart, isAuthorized } = useUI();
  const {
    items,
    emptyCart,
    isEmpty,
    discount,
    paymentMethod,
    subTotal,
    total,
    coupon,
  } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [addressType, setAddressType] = useState("another");
  const [open, setOpen] = useState(false);

  const generateOrderData = () => {
    const dataToSend = {
      coupon: coupon?.code,
      total,
      subTotal,
      items,
      discount,
      paymentType: paymentMethod,
      user: user?._id,
    };
    return dataToSend;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();

  useEffect(() => {
    if (isAuthorized) {
      const profile = JSON.parse(localStorage.getItem("profile") || "");
      setUser(profile);
    }
  }, []);

  async function onSubmit(input: CheckoutInputType) {
    if (isEmpty) {
      return toast.error("Please add items in your cart to checkout.");
    }

    if (paymentMethod === "Cash on Delivery") {
      const result = await Swal.fire({
        title: "Confirm Order",
        text: "Cash on Delivery orders are not cancellable. Are you sure you wanna place this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm Order",
      });
      if (result.isConfirmed) {
        setOpen(true);
        // @ts-ignore
        return mutate({ ...input, ...generateOrderData() });
      } else {
        return;
      }
    }
    let dataToSend: Partial<CheckoutInputType> = {
      ...generateOrderData(),
    };

    if (addressType === "saved") {
      const { address, email, phone, firstName, lastName } = user!;
      const input: Partial<CheckoutInputType> = {
        address,
        email,
        phone,
        firstName,
        lastName,
      };

      dataToSend = { ...input, ...dataToSend };
    } else {
      dataToSend = { ...input, ...dataToSend };
    }

    if (isAuthorized) {
      dataToSend.user = user?._id;
    }

    try {
      const { data } = await http.post<RazorpayResponse>(
        "/orders/create-initial",
        dataToSend
      );
      toast.dark("Redirecting to Razorpay", {
        autoClose: 1500,
        hideProgressBar: true,
        onClose: () => displayRazorpay(data),
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 2500,
        onClose: () => openCart(),
      });
    }
  }

  const displayRazorpay = async (data: RazorpayResponse) => {
    const options = {
      key: process.env.RAZORPAY_SECRET,
      currency: data.currency,
      amount: data.amount.toString(),
      name: "CropOffs",
      description: "Order for earrings.",
      order_id: data.id,

      handler: async function (response: any) {
        setOpen(true);
        const dataToSend = {
          response,
          _id: data._id,
          paymentType: "Prepaid",
        };

        //@ts-ignore
        mutate(dataToSend);
      },

      prefill: {
        name: data.name,
        email: data.email,
        contact: data.contact,
      },
    };
    //@ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (isSuccess) {
    if (!open) {
      emptyCart();
      Router.push(`/order/${successData?.orderId}`);
    }
  }

  if (isError) {
    if (!open) {
      Router.reload();
    }
  }

  return <>
    <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
      Shipping Address
    </h2>
    <PaymentModal
      paymentType={paymentMethod}
      open={open}
      setOpen={setOpen}
      error={error}
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
    {user && user.address && (
      <Example address={user?.address} setAddressType={setAddressType} />
    )}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto flex flex-col justify-center py-5"
      noValidate
    >
      {addressType === "another" && (
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="First Name"
              {...register("firstName", {
                required: "Please enter your first name.",
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
              placeholder={"Enter First Name"}
            />
            <Input
              labelKey="Last Name"
              {...register("lastName", {
                required: "Please enter your first name.",
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              placeholder={"Enter Last Name"}
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="Phone"
              {...register("phone", {
                required: "Please enter your mobile number.",
              })}
              errorKey={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              type="email"
              labelKey="Email"
              {...register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email.",
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <Input
            labelKey="Address"
            {...register("address.location", {
              required: "Please enter your address.",
            })}
            errorKey={errors.address?.location?.message}
            variant="solid"
          />
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="City"
              {...register("address.city", {
                required: "Please enter your city.",
              })}
              required
              errorKey={errors.address?.city?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              labelKey="Pincode"
              {...register("address.pincode", {
                required: "Please enter your city pincode.",
              })}
              variant="solid"
              errorKey={errors.address?.pincode?.message}
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
            <Input
              labelKey="State"
              {...register("address.state", {
                required: "Please enter your state.",
              })}
              errorKey={errors.address?.state?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
            />
          </div>
          <div className="relative flex items-center ">
            <CheckBox labelKey="Save Information" />
          </div>
          <TextArea
            labelKey="Additional Note"
            {...register("note")}
            placeholderKey="Order notes"
            className="relative pt-3 xl:pt-6"
          />
        </div>
      )}
      <div className="flex w-full">
        <Button type="submit" className="w-full" loading={isLoading}>
          {"Place Order"}
        </Button>
      </div>
    </form>
  </>;
};

export default CheckoutForm;
