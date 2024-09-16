import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import Alert from "@components/ui/alert";
import { siteSettings } from "@settings/site-settings";
import Image from "next/image";

const SignUpForm: React.FC = () => {
  const { mutate: signUp, isLoading, isError, error } = useSignUpMutation();
  const { setModalView, openModal, closeModal } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  function onSubmit({ firstName, lastName, email, password }: SignUpInputType) {
    signUp({
      firstName,
      lastName,
      email,
      password,
    });
  }
  return (
    <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-6">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mb-8 sm:mb-10">
          {"By signing up, you agree to our "}
          <Link
            href={ROUTES.TERMS}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {"terms"}
          </Link>{" "}
          &amp;{" "}
          <Link
            href={ROUTES.POLICY}
            className="text-heading underline hover:no-underline focus:outline-none"
          >
            {"policy"}
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
          <Input
            labelKey="First Name"
            type="text"
            variant="solid"
            {...register("firstName", {
              required: "First Name required",
            })}
            errorKey={errors.firstName?.message}
          />
          <Input
            labelKey="Last Name"
            type="text"
            variant="solid"
            {...register("lastName", {
              required: "Last Name required",
            })}
            errorKey={errors.lastName?.message}
          />
        </div>
        <div className="flex flex-col space-y-4 mt-3">
          <Input
            labelKey="Email"
            type="email"
            variant="solid"
            {...register("email", {
              required: `${"Email required"}`,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email error",
              },
            })}
            errorKey={errors.email?.message}
          />
          <PasswordInput
            labelKey="Password"
            errorKey={errors.password?.message}
            {...register("password", {
              required: `${"Password required"}`,
            })}
          />
          {isError ? (
            <Alert message={(error as any)?.response?.data?.message} />
          ) : (
            ""
          )}

          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-2"
            >
              {"Register"}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        {"Have an account?"}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {"Login"}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
