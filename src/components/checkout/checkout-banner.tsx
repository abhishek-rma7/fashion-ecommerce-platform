import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`bg-gray-900 my-2 rounded-sm ${open ? "" : "hidden"}`}>
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center justify-center">
            <span className="flex rounded-lg bg-gray-600 p-2">
              <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              Get 5% Discount on prepiad orders. Use code{" "}
              <span className="font-bold">PREP5</span>
            </p>
          </div>

          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
