import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
  useChangePasswordMutation,
  ChangePasswordInputType,
} from "@framework/customer/use-change-password";

const defaultValues = {
  oldPassword: "",
  newPassword: "",
};

const ChangePassword: React.FC = () => {
  const { mutate: changePassword, isLoading } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    defaultValues,
  });
  function onSubmit(input: ChangePasswordInputType) {
    changePassword(input);
  }
  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {"Change password"}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex  h-full lg:w-8/12 flex-col`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center "
        >
          <div className="flex flex-col space-y-3">
            <PasswordInput
              labelKey="Old password"
              errorKey={errors.oldPassword?.message}
              {...register("oldPassword", {
                required: "forms:password-old-required",
              })}
              className="mb-4"
            />
            <PasswordInput
              labelKey="New password"
              errorKey={errors.newPassword?.message}
              {...register("newPassword", {
                required: "forms:label-new-password",
              })}
              className="mb-4"
            />

            <div className="relative">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="h-13 mt-3"
              >
                {"Change password"}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default ChangePassword;
