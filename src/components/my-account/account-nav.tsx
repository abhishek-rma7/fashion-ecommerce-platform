import Link from "next/link";
import { useRouter } from "next/router";
import {
  IoHomeOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { ROUTES } from "@utils/routes";
import { useLogoutMutation } from "@framework/auth/use-logout";

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT,
    name: "Dashboard",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: "Orders",
    icon: <IoCartOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_DETAILS,
    name: "Account Details",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: "Change password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
];

export default function AccountNav() {
  const { mutate: logout } = useLogoutMutation();
  const { pathname } = useRouter();
  const newPathname = pathname.split("/").slice(2, 3);
  const mainPath = `/${newPathname[0]}`;
  return (
    <nav className="flex flex-col md:w-2/6 2xl:w-4/12 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
      {accountMenu.map((item) => {
        const menuPathname = item.slug.split("/").slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          (<Link
            key={item.slug}
            href={item.slug}
            className={
              mainPath === menuPath
                ? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "
                : "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
            }>

            {item.icon}
            <span className="ps-2">{`${item.name}`}</span>

          </Link>)
        );
      })}
      <button
        className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
        onClick={() => logout()}
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span className="ps-2">{"Logout"}</span>
      </button>
    </nav>
  );
}
