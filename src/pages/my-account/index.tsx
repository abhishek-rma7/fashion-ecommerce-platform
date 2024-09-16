import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { ROUTES } from "@utils/routes";

export default function AccountPage() {
  return (
    <AccountLayout>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
        Dashboard
      </h2>
      <p className=" text-md leading-7 md:text-base md:leading-loose uppercase">
        From your account Dashboard you can view your{" "}
        <Link
          href={ROUTES.ORDERS}
          className="text-heading underline font-semibold"
        >
          Recent Orders{" "}
        </Link>
        manage your{" "}
        <Link
          href={ROUTES.ACCOUNT_DETAILS}
          className="text-heading underline font-semibold"
        >
          account details
        </Link>{" "}
        and{" "}
        <Link
          href={ROUTES.CHANGE_PASSWORD}
          className="text-heading underline font-semibold"
        >
          change your password
        </Link>
        .
      </p>
    </AccountLayout>
  );
}

AccountPage.Layout = Layout;
