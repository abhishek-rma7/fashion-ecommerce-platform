import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useUpdateUserMutation,
  UpdateUserType,
} from "@framework/customer/use-update-customer";
import { useUI } from "@contexts/ui.context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "@framework/types";
import { toast } from "react-toastify";
import { UserProfileDetails } from "src/pages/my-account/account-details";

const AccountDetails: React.FC = () => {
  const { isAuthorized } = useUI();
  const [user, setUser] = useState<User | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  useEffect(() => {
    if (isAuthorized) {
      const user = JSON.parse(localStorage.getItem("profile") || "")!;
      setUser(user);
    }
  }, [isAuthorized]);

  if (!user) {
    return <div></div>;
  }
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      variants={fadeInTop(0.35)}
      className={`w-full flex flex-col`}
    >
      {isAuthorized && showDetails ? (
        <div>
          <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
            {"Account Details"}
          </h2>
          <h1 className="text-xl sm:text-md">
            <span className="font-bold">Name</span> : {user.firstName}{" "}
            {user.lastName}
          </h1>
          <h1 className="text-xl sm:text-md">
            <span className="font-bold">Email</span> : {user.email}
          </h1>
          <h1 className="text-xl sm:text-md">
            <span className="font-bold">Contact</span> : {user.phone}
          </h1>
          <h1 className="text-xl sm:text-md">
            <span className="font-bold">Address</span> :{" "}
            {user.address?.location}
          </h1>
          <h1 className="text-xl sm:text-md">
            <span className="font-bold">City</span> : {user.address?.city}
          </h1>
          <h1 className="text-xl sm:text-md">
            <span className="font-bold">State</span> : {user.address?.state}
          </h1>
          <div className="relative">
            <Button
              type="submit"
              className="h-12 mt-3 w-full sm:w-32"
              onClick={() => setShowDetails(false)}
            >
              {"Edit"}
            </Button>
          </div>
        </div>
      ) : (
        <UserProfileDetails setShowDetails={setShowDetails} />
      )}
    </motion.div>
  );
};

export default AccountDetails;
