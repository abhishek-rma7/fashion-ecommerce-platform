import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
const isLoadingData = {
  heading: "Processing your payment",
  color: "gray",
  subHeading: "We are verifying your payment. Please be patient.",
  logo: <ImSpinner2 className="h-6 w-6 animate-spin" />,
  btn: false,
};

const isSuccessData = {
  heading: "Payment Successfull!",
  color: "green",
  subHeading:
    "Hooray! You have completed the payment and your order is successfully placed.",
  logo: <FaCheck className="h-6 w-6 text-green-600" aria-hidden="true" />,
  btn: "Go to Orders Page",
};

const isCODSuccessData = {
  heading: "Order Placed!",
  color: "green",
  subHeading:
    "Hooray! Your order is successfully placed and we will keep updating you about the status of your order.",
  logo: <FaCheck className="h-6 w-6 text-green-600" aria-hidden="true" />,
  btn: "Go to Orders Page",
};

const isErrorData = {
  heading: "Payment Failed.",
  color: "red",
  subHeading:
    "Your payment has been failed. Please try again and if the problem persists, Please contact our support.",
  logo: (
    <img
      src="https://img.icons8.com/ios-filled/100/FA5252/error-cloud--v1.png"
      className="h-10 w-10"
    />
  ),
  btn: "Go Back to checkout",
};

interface Props {
  paymentType: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
  isError: boolean;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function PaymentModal({
  paymentType,
  isLoading,
  error,
  isError,
  isSuccess,
  open,
  setOpen,
}: Props) {
  const getHeading = () => {
    if (isLoading) {
      return isLoadingData;
    } else if (isError) {
      return isErrorData;
    } else {
      return paymentType === "Prepaid" ? isSuccessData : isCODSuccessData;
    }
  };

  //   else if (error) {
  //       return { ...isErrorData, message: error };
  //     }
  useEffect(() => {}, [isLoading, isError, isSuccess]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-50">
                  {getHeading().logo}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className={`text-lg leading-6 uppercase font-bold text-${
                      getHeading().color
                    }-600`}
                  >
                    {getHeading().heading}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-700">
                      {getHeading().subHeading}
                    </p>
                    {isError && (
                      <p className="text-sm text-gray-700">
                        Message:{" "}
                        <span className="text-red-600">
                          {error.response.data.message}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                {getHeading().btn && (
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm capitalize"
                    onClick={() => setOpen(false)}
                  >
                    {getHeading().btn}
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
