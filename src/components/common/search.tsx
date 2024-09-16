import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useUI } from "@contexts/ui.context";
import { useProductsQuery } from "@framework/product/get-all-products";
import { Product } from "@framework/types";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Search({}) {
  const [query, setQuery] = useState("");
  const { displaySearch, closeSearch } = useUI();
  const { push } = useRouter();
  const { data, isLoading } = useProductsQuery({
    name: query,
    limit: 5,
    fields: "name slug image category price salePrice discount",
  });

  return (
    <Transition.Root
      show={displaySearch}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-50 top-10 md:-top-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={closeSearch}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-3 ring-black ring-opacity-25 transition-all"
            onChange={(product) => {
              closeSearch();
              push(`/products/${product.slug}/${product._id}`);
            }}
          >
            {({ activeOption }: { activeOption: Product }) => (
              <>
                <div className="relative">
                  <HandRaisedIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-600 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === "" || data?.length! > 0) && (
                  <Combobox.Options
                    as="div"
                    static
                    hold
                    className="flex divide-x divide-gray-100"
                  >
                    <div
                      className={classNames(
                        "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                        activeOption && "sm:h-96"
                      )}
                    >
                      {query === "" && (
                        <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">
                          Recent searches
                        </h2>
                      )}
                      <div className="-mx-2 text-sm text-gray-700">
                        {data?.products.map((product) => (
                          <Combobox.Option
                            as="div"
                            key={product.id}
                            value={product}
                            className={({ active }) =>
                              classNames(
                                "flex cursor-default select-none items-center rounded-md p-2",
                                active && "bg-gray-100 text-gray-900"
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <img
                                  src={product.image.url}
                                  alt=""
                                  className="h-6 w-6 flex-none rounded-full"
                                />
                                <span className="ml-3 flex-auto truncate">
                                  {product.name}
                                </span>
                                {active && (
                                  <ChevronRightIcon
                                    className="ml-3 h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </div>
                    </div>

                    {activeOption && (
                      <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                        <div className="flex-none p-6 text-center">
                          <img
                            src={activeOption.image.url}
                            alt=""
                            className="mx-auto h-20 w-20 rounded-full"
                          />
                          <h2 className="mt-3 font-semibold text-gray-900">
                            {activeOption.name}
                          </h2>
                        </div>
                        <div className="flex flex-auto flex-col justify-between p-6 text-base">
                          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-gray-700">
                            <dt className="col-end-1 font-semibold text-gray-900">
                              Category:
                            </dt>
                            <dd>{activeOption.category}</dd>
                            <dt className="col-end-1 font-semibold text-gray-900">
                              Price:
                            </dt>
                            <dd className="truncate">
                              <span className="text-gray-900">
                                ₹ {activeOption.price}
                              </span>
                            </dd>
                            {activeOption.salePrice && (
                              <>
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  Sale Price
                                </dt>
                                <dd className="truncate">
                                  ₹ {activeOption.salePrice}{" "}
                                  <span className="font-segoe text-[#ff3f6c] ps-2">
                                    ({activeOption.discount}% OFF)
                                  </span>
                                </dd>
                              </>
                            )}
                          </dl>
                          <Button
                            type="button"
                            onClick={() => {
                              closeSearch();
                              push(
                                `/products/${activeOption.slug}/${activeOption._id}`
                              );
                            }}
                          >
                            View Product
                          </Button>
                        </div>
                      </div>
                    )}
                  </Combobox.Options>
                )}

                {query !== "" && data?.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <Image
                      src={"/assets/images/no_product.svg"}
                      width={48}
                      height={48}
                      className="mx-auto h-12 w-12 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No Product found
                    </p>
                    <p className="mt-2 text-gray-600">
                      We couldn’t find anything with that name. Please try
                      again.
                    </p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
