import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import Link from "next/link";
import Divider from "@components/ui/divider";
import Button from "@components/ui/button";
import { useLogoutMutation } from "@framework/auth/use-logout";
import { User } from "@framework/types";
import { useUI } from "@contexts/ui.context";

const menus = [
  {
    title: "Dashboard",
    href: "/my-account",
    img: "https://img.icons8.com/external-bearicons-glyph-bearicons/96/000000/external-Dashboard-audio-and-video-bearicons-glyph-bearicons.png",
  },
  {
    title: "Orders",
    href: "/my-account/orders",
    img: "https://img.icons8.com/ios-glyphs/90/000000/shopping-basket-success.png",
  },
  {
    title: "Profile",
    href: "/my-account/account-details",
    img: "https://img.icons8.com/ios-glyphs/90/000000/user-menu-male.png",
  },
];

const UserDropdown = () => {
  const { mutate: logout } = useLogoutMutation();
  const [user, setUser] = useState<User | null>(null);
  const { isAuthorized, openModal, setModalView } = useUI();

  useEffect(() => {
    if (isAuthorized) {
      const user = JSON.parse(localStorage.getItem("profile") || "");
      setUser(user);
    } else {
      setUser(null);
    }
  }, [isAuthorized]);

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  if (!user) {
    return (
      <button
        className="text-sm xl:text-base text-heading font-semibold focus:outline-none"
        onClick={handleLogin}
      >
        Sign In
      </button>
    );
  }
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-5 px-4 py-2 text-base font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Hello, {user.firstName}
            <FaChevronCircleDown
              className="ml-2 -mr-1 h-5 w-5 text-gray-900"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {menus.map((item) => (
                <Menu.Item key={item.title}>
                  {({ active }) => (
                    <div className="flex items-center p-2">
                      <Link href={item.href} legacyBehavior>
                        <button
                          className={`${
                            active ? "bg-gray-100" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-1 py-2 text-sm`}
                        >
                          <img src={item.img} width={32} className="mr-2" />
                          {item.title}
                        </button>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                <div className="flex flex-col justify-start">
                  <Button onClick={() => logout()}>Sign Out</Button>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserDropdown;
