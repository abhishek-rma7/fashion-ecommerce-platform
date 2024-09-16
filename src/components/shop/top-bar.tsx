import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import Text from "@components/ui/text";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";

interface SearchTopBarProps {
  length: number;
}

const SearchTopBar: React.FC<SearchTopBarProps> = ({ length }) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  return (
    <div className="flex justify-between items-center mb-7">
      <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
        {"Our Show Stoppers"}
      </Text>
      <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ps-2.5">{"Filters"}</span>
      </button>
      <div className="flex items-center justify-end">
        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
          {length} {"Items"}
        </div>
        <ListBox
          options={[
            { name: "Sorting options", value: "options" },
            { name: "Newest First", value: "-createdAt" },
            { name: " Price low to high", value: "price" },
            { name: " Price high to low", value: "-price" },
            { name: " Sort By Name: A - Z", value: "name" },
            { name: " Sort By Name: A - Z", value: "-name" },
          ]}
        />
      </div>
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displayFilter}
        onClose={closeFilter}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <FilterSidebar length={length} />
      </Drawer>
    </div>
  );
};

export default SearchTopBar;
