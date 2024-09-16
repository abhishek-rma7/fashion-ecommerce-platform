import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import AccountDetails from "@components/my-account/account-details";
import { User } from "@framework/types";
import React, { useEffect, useRef, useState } from "react";
import { useUI } from "@contexts/ui.context";
import { useUpdateUserMutation } from "@framework/customer/use-update-customer";
import { Id, toast } from "react-toastify";
import Button from "@components/ui/button";

export default function AccountDetailsPage() {
  return (
    <AccountLayout>
      <AccountDetails />
      {/* <Example /> */}
    </AccountLayout>
  );
}

export function UserProfileDetails({ setShowDetails }) {
  const [user, setUser] = useState<User>();
  const {
    mutate: updateUser,
    isSuccess,
    isError,
    error,
  } = useUpdateUserMutation();
  const { isAuthorized } = useUI();
  const toastId = useRef<Id>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toastId.current = toast.loading("Saving Changes...");
    updateUser(user!);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile") || "");
    setUser(user);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      //@ts-ignore
      address: { ...user?.address, [e.target.name]: e.target.value },
    });
  };

  if (isSuccess) {
    toast.update(toastId.current!, {
      render: "Profile successfully updated",
      isLoading: false,
      type: "success",
      autoClose: 2500,
      onClose: () => window.location.reload(),
    });
  }

  if (isError) {
    toast.update(toastId.current!, {
      render: (error as any).response.data.message,
      type: "error",
      closeOnClick: true,
    });
  }

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-3">
            <div className="px-4 sm:px-0">
              <img
                src="https://ik.imagekit.io/abhishekrma7/icons8-male-user_sAknw-QXW.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1659526330579"
                width={48}
              />{" "}
              <h3 className="text-lg font-medium leading-6 text-gray-900 uppercase flex items-center">
                Edit Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                From here can edit your information.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={onSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="py-5 bg-white">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        onChange={handleChange}
                        value={user?.firstName}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        value={user?.lastName}
                        onChange={handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email-address"
                        autoComplete="email"
                        value={user?.email}
                        onChange={handleChange}
                        disabled={true}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone (*no country code)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        pattern="[0-9]{10}"
                        id="phone"
                        onInvalid={(e) =>
                          (e.target as HTMLInputElement).setCustomValidity(
                            "Please enter a valid number."
                          )
                        }
                        autoComplete="phone"
                        value={user?.phone}
                        onChange={handleChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="location"
                        onChange={handleAddressChange}
                        id="street-address"
                        value={user?.address?.location}
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={user?.address?.city}
                        onChange={handleAddressChange}
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="region"
                        value={user?.address?.state}
                        onChange={handleAddressChange}
                        autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / PIN code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        id="postal-code"
                        value={user?.address?.pincode}
                        onChange={handleAddressChange}
                        autoComplete="postal-code"
                        pattern="[0-9]*"
                        onInvalid={(e) =>
                          (e.target as HTMLInputElement).setCustomValidity(
                            "Pin Code should only contain alphabets."
                          )
                        }
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button className="mr-3" onClick={() => setShowDetails(true)}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}

AccountDetailsPage.Layout = Layout;
