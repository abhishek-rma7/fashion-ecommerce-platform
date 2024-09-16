import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import http from "../../framework/basic-rest/utils/http";

export const ColorFilter = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedColors = query?.color ? (query.color as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedColors);
  React.useEffect(() => {
    setFormState(selectedColors);
  }, [query?.color]);
  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value) ? [] : [value];
    setFormState(currentFormState);
    const { color, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { color: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  const fetchColors = async () => {
    const res = await http.get("/products/colors");
    return res.data.data;
  };

  const { data, status } = useQuery(["colors"], fetchColors);

  return (
    <div className="block border-b border-gray-300 pb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {"Colors"}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {data?.map((item: any, idx) => (
          <CheckBox
            key={idx}
            label={
              <span className="flex items-center">
                <span
                  className={`w-5 h-5 rounded-full block me-3 mt-0.5 border border-black border-opacity-20`}
                  style={{ backgroundColor: item.toLowerCase() }}
                />
                {item}
              </span>
            }
            name={item.toLowerCase()}
            checked={formState.includes(item)}
            value={item}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
