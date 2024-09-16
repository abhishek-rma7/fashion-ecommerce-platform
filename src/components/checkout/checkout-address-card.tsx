import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { FaCheckCircle } from "react-icons/fa";

const initialState = {
  location: "",
  city: "",
  state: "",
  pincode: "",
};

export default function Example({ address, setAddressType }) {
  const [selected, setSelected] = useState(address);

  useEffect(() => {
    setSelected(address);
    setAddressType("saved");
  }, [address]);

  if (!selected) {
    return <div></div>;
  }

  return (
    <div className="w-full py-4">
      <div className="mx-auto w-full ">
        <RadioGroup
          value={selected}
          onChange={(value) => {
            if (value.location === "") {
              setAddressType("another");
            } else {
              setAddressType("saved");
            }
            setSelected(value);
          }}
        >
          <div className="space-y-2">
            <RadioGroup.Option
              key={address.location}
              value={address}
              className={({ active, checked }) =>
                `${
                  checked
                    ? "border-2 border-indigo-400 bg-indigo-600 bg-opacity-5"
                    : ""
                }
                    relative flex border border-gray-900 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-full mr-3 min-h-28`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label as="p" className={`text-gray-900`}>
                          {address.location}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`text-gray-900}`}
                        >
                          <span>
                            {address.city} - {address.state}
                          </span>{" "}
                          <span aria-hidden="true">&middot;</span>{" "}
                          <span>{address.pincode}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>

                    <div
                      className={`shrink-0 ${
                        checked ? "text-black" : "text-gray-300"
                      } pr-4`}
                    >
                      <FaCheckCircle size={28} />
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              key={initialState.location}
              value={initialState}
              className={({ active, checked }) =>
                `${
                  checked
                    ? "border-2 border-indigo-400 bg-indigo-600 bg-opacity-5"
                    : ""
                }
                    relative flex border border-gray-900 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-full`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-base">
                        <RadioGroup.Label as="p" className={`text-gray-900`}>
                          Ship to a different address ?
                        </RadioGroup.Label>
                      </div>
                    </div>

                    <div
                      className={`shrink-0 ${
                        checked ? "text-black" : "text-gray-300"
                      } pr-4`}
                    >
                      <FaCheckCircle size={28} />
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
