import { useState } from "react";
import Link from "@components/ui/link";
import { siteSettings } from "@settings/site-settings";
import Scrollbar from "@components/common/scrollbar";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoClose,
  IoLogoPinterest,
} from "react-icons/io5";

const social = [
  {
    id: 1,
    title: "Facebook",
    path: "https://www.facebook.com/cropoffs-100477079319604/",
    icon: <IoLogoFacebook color="blue" />,
  },
  {
    id: 2,
    title: "Instagram",
    path: "https://www.instagram.com/cropoffs/",
    icon: <IoLogoInstagram color="red" />,
  },
  {
    id: 3,
    title: "Pinterest",
    path: "https://in.pinterest.com/cropoffs/",
    icon: <IoLogoPinterest color="red" />,
  },
];

export default function MobileMenu() {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { site_header } = siteSettings;
  const { closeSidebar } = useUI();
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = "",
  }: any) =>
    data.label && (
      <li className={`mb-0.5 ${className}`}>
        <div className="flex items-center justify-between">
          <Link
            href={data.path}
            className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-7 pe-4 transition duration-300 ease-in-out"
          >
            <span className="block w-full" onClick={closeSidebar}>
              {`${data.label}`}
            </span>
          </Link>
          {hasSubMenu && (
            <div
              className="cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${
                  activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subMenu}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className="pt-0.5">
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={dept > 1 && "ps-4"}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
          <Logo />

          <button
            className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-black mt-1 md:mt-0.5" />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow mb-auto">
          <div className="flex flex-col py-7 px-0 lg:px-2 text-heading">
            <ul className="mobileMenu">
              {site_header.mobileMenu.map((menu, index) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;

                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    hasSubMenu={menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
            </ul>
          </div>
        </Scrollbar>

        <div className="flex items-center justify-center bg-white border-t border-gray-100 px-7 flex-shrink-0 space-s-1">
          {social?.map((item, index) => (
            <a
              href={item.path}
              className={`text-heading p-5 opacity-60 first:-ms-4 transition duration-300 ease-in hover:opacity-100`}
              target="_blank"
              key={index}
            >
              <span className="sr-only">{`${item.title}`}</span>
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
