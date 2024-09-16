import React from "react";
import Link from "@components/ui/link";

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
}
type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  return (
    <div className="megaMenu shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
      <div className="grid grid-cols-4">
        {columns?.map((column) => (
          <ul
            className="even:bg-gray-150 pb-7 2xl:pb-8 pt-6 2xl:pt-7"
            key={column.id}
          >
            {column?.columnItems?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                <li className="mb-1.5 p-1">
                  <Link
                    href={columnItem.path}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading"
                  >
                    <div className="relative">
                      <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden ">
                        <img
                          src={columnItem.img}
                          alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
                          className="object-center object-cover"
                          width={256}
                          height={256}
                        />
                      </div>
                      <p className="mt-6 block text-base font-semibold text-gray-900">
                        <span
                          className="absolute z-10 inset-0 text-[rgb(17,24,39)]"
                          aria-hidden="true"
                        ></span>
                        {columnItem.label}
                      </p>
                      <p
                        aria-hidden="true"
                        className="mt-1 text-sm text-[rgb(107,114,128)]"
                      >
                        Shop now
                      </p>
                    </div>
                  </Link>
                </li>
                {/* {columnItem?.columnItemItems?.map((item: any) => (
                  <li
                    key={item.id}
                    className={
                      columnItem?.columnItemItems?.length === item.id
                        ? "border-b border-gray-300 pb-3.5 mb-3"
                        : ""
                    }
                  >
                    <Link
                      href={item.path}
                      className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))} */}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
