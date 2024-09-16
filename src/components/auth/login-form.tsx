import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import { signInWithGoogle } from "@framework/firebase.service";

const LoginForm: React.FC = () => {
  const { setModalView, openModal, closeModal } = useUI();
  const {
    mutate: login,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useLoginMutation(closeModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ email, password, remember_me }: LoginInputType) {
    login({
      email,
      password,
      remember_me,
      loginType: "jwt",
    });
  }

  function handleSignUp() {
    setModalView("SIGN_UP_VIEW");
    return openModal();
  }
  function handleForgetPassword() {
    setModalView("FORGET_PASSWORD");
    return openModal();
  }

  return (
    <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
      <div className=" mb-6">
        <div onClick={closeModal} className="text-center">
          <Logo />
        </div>
      </div>
      <div className="login-buttons">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
          onClick={() => signInWithGoogle(login)}
        >
          <img
            src="https://img.icons8.com/color/96/000000/google-logo.png"
            width={28}
            className="mr-2"
          />
          <span> Continue with Google</span>
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center pt-5"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <Input
            labelKey="Email"
            type="email"
            variant="solid"
            {...register("email", {
              required: `${"Email Required"}`,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email Error",
              },
            })}
            errorKey={errors.email?.message}
          />
          <PasswordInput
            labelKey="Password"
            errorKey={errors.password?.message}
            {...register("password", {
              required: `${"Password Required"}`,
            })}
          />
          <div className="flex items-center justify-center">
            <div className="flex items-center flex-shrink-0">
              <label className="switch relative inline-block w-10 cursor-pointer">
                <input
                  id="remember"
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  {...register("remember_me")}
                />
                <span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
              </label>
              <label
                htmlFor="remember"
                className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
              >
                {"Remember Me"}
              </label>
            </div>
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                {"Forgot Password"}
              </button>
            </div>
          </div>
          {isError && <Alert message={(error as any).response.data.message} />}
          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-11 md:h-12 w-full mt-1.5"
            >
              {"Login"}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
        {"Don't have any account?"}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleSignUp}
        >
          {"Register"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
