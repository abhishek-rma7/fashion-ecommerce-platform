import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
const priceFilterItems = [
  {
    id: "1",
    name: "Under ₹300",
    gt: "0",
    lt: "300",
    slug: "0-300",
  },
  {
    id: "2",
    name: "₹300 to ₹400",
    slug: "300-400",
  },
  {
    id: "3",
    name: "₹400 to ₹500",
    slug: "400-500",
  },
  {
    id: "4",
    name: "₹500 to ₹600",
    slug: "500-600",
  },
  {
    id: "5",
    name: "₹600 to ₹700",
    slug: "600-700",
  },
  {
    id: "6",
    name: "₹700 to ₹800",
    slug: "700-800",
  },
  {
    id: "7",
    name: "₹800 to ₹900",
    slug: "800-900",
  },
  {
    id: "8",
    name: "Over ₹1000",
    slug: "1000-10000",
  },
];
export const PriceFilter = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedPrices = query?.price ? (query.price as string).split(",") : [];

  const [formState, setFormState] = React.useState<string[]>(selectedPrices);
  React.useEffect(() => {
    setFormState(selectedPrices);
  }, [query?.price]);
  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value) ? [] : [value];
    setFormState(currentFormState);

    const { price, ...restQuery } = query;

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { price: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  const items = priceFilterItems;

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {"Price"}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
