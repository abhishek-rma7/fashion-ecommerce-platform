import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";

const category = [
  {
    title: "Drop Earrings",
  },
  {
    title: "Stud Earrings",
  },
  {
    title: "Abstract Earrings",
  },
  {
    title: "Floral Earrings",
  },
  {
    title: "Solid Earrings",
  },
];

export const CategoryFilter = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategory = query?.category
    ? (query.category as string).split(",")
    : [];
  const [formState, setFormState] = React.useState<string[]>(selectedCategory);
  React.useEffect(() => {
    setFormState(selectedCategory);
  }, [query?.category]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value) ? [] : [value];
    setFormState(currentFormState);
    const { category, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { category: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <div className="block border-b border-gray-300 pb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {"Category"}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {category?.map((item: any, idx) => (
          <CheckBox
            key={idx}
            label={<span className="flex items-center">{item.title}</span>}
            name={item.title.toLowerCase()}
            checked={formState.includes(item.title)}
            value={item.title}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
