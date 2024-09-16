import React, { useRef, useEffect, useState } from "react";
import { siteSettings } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { FaWhatsapp } from "react-icons/fa";
import UserDropdown from "@components/auth/user-auth-dropdown";
import SearchIcon from "@components/icons/search-icon";
import AuthMenu from "./auth-menu";
import { ROUTES } from "@utils/routes";
import UserIcon from "@components/icons/user-icon";
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;
const Header: React.FC = () => {
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    setDrawerView,
    openSearch,
    openModal,
    setModalView,
    isAuthorized,
  } = useUI();
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  function handleMobileMenu() {
    setDrawerView("MOBILE_MENU");
    return openSidebar();
  }

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
        <div className="flex items-center mx-auto max-w-[1920px] h-full w-full">
          <button
            aria-label="Menu"
            className="menuBtn hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <span className="menuIcon">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>
          <Logo />
          <div className="flex md:hidden absolute right-3 items-center space-x-3">
            <AuthMenu
              isAuthorized={isAuthorized}
              href={ROUTES.ACCOUNT}
              className="flex-shrink-0"
              btnProps={{
                className: "flex-shrink-0 focus:outline-none",
                children: <UserIcon width="24px" height="24px" />,
                onClick: handleLogin,
              }}
            >
              <UserIcon />
            </AuthMenu>
            <a href="https://wa.me/916351361244" target={"_blank"}>
              <FaWhatsapp
                className=" w-[32px] h-[32px] md:w-4 xl:w-6 md:h-4 xl:h-20"
                color="green"
              />
            </a>
          </div>

          <HeaderMenu
            data={site_header.menu}
            className="hidden lg:flex md:ms-6 xl:ms-10"
          />

          <div className="hidden md:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
            <button
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
              onClick={openSearch}
              aria-label="search-button"
            >
              <SearchIcon />
            </button>
            <div className="-mt-0.5 flex-shrink-0">
              <div className="text-sm xl:text-base text-heading">
                <UserDropdown />
              </div>
            </div>
            <CartButton />
            <a href="https://wa.me/916351361244" target={"_blank"}>
              <FaWhatsapp
                className="w-[18px] h-[18px] md:w-4 xl:w-6 md:h-4 xl:h-20"
                color="green"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
