import { Product, Variations } from "@framework/types";
import cn from "classnames";
interface Props {
  className?: string;
  variations: Product["variations"];
  active: {
    color: string;
    image: string;
  };
  onClick: any;
}

export const ProductAttributes: React.FC<Props> = ({
  className = "mb-4",
  variations,
  active,
  onClick,
}) => {
  return (
    <div className={className}>
      <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
        Color {active ? `- ${active?.color}` : ""}
      </h3>
      <ul className="colors flex flex-wrap -me-3">
        {variations?.map(({ value, meta, image }) => {
          const options = {
            backgroundColor: meta,
          };

          return (
            <li
              key={`${value}`}
              className={cn(
                "cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
                {
                  "border-black": value === active?.color,
                }
              )}
              onClick={() => onClick({ color: value, image })}
            >
              <span className="h-full w-full rounded block" style={options} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
