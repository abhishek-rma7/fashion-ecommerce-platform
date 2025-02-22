import Text from "@components/ui/text";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import axios from "axios";
import { useState } from "react";

interface Props {
  className?: string;
}

type FormValues = {
  email: string;
};

const defaultValues = {
  email: "",
};

const SubscriptionWithBg: React.FC<Props> = ({
  className = "px-5 sm:px-8 md:px-16 2xl:px-24",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const [message, setMessage] = useState<{ message: string; error: boolean }>({
    message: "",
    error: false,
  });
  const { locale } = useRouter();
  const dir = getDirection(locale);
  async function onSubmit(input: FormValues) {
    try {
      const { data: message } = await axios.post(
        "http://localhost:5500/subscribe",
        input
      );
      setMessage({ message: message.message, error: false });
    } catch (error: any) {
      setMessage({ message: error.response.data.message, error: true });
    }
  }
  return (
    <div
      className={`${className} relative overflow-hidden flex flex-col sm:items-center lg:items-start rounded-lg bg-gray-200 py-10 md:py-14 lg:py-16`}
    >
      <div className="-mt-1.5 lg:-mt-2 xl:-mt-0.5 text-center xl:text-start mb-7 md:mb-8 lg:mb-9 xl:mb-0">
        <Text
          variant="mediumHeading"
          className="mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5"
        >
          Get CropOffs Updates In Your Inbox
        </Text>
        <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
          Subscribe to our newsletter and stay updated.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-shrink-0 w-full sm:w-96 md:w-[545px] md:mt-7 z-10"
        noValidate
      >
        <div className="flex flex-col sm:flex-row items-start justify-end">
          <Input
            placeholderKey="Write your email here"
            type="email"
            variant="solid"
            className="w-full"
            inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center sm:text-start bg-white"
            {...register("email", {
              required: "Email Required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email Error",
              },
            })}
            errorKey={errors.email?.message}
          />
          <Button className="mt-3 sm:mt-0 w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0">
            <span className="lg:py-0.5">Subscribe</span>
          </Button>
        </div>
      </form>
      {message ? (
        <h2 style={{ color: `${message.error ? "red" : "green"}` }}>
          {message.message}
        </h2>
      ) : (
        ""
      )}
      <div
        style={{
          backgroundImage:
            dir === "rtl"
              ? "url(/assets/images/subscription-bg-reverse.png)"
              : "url(/assets/images/subscription-bg.png)",
        }}
        className={`hidden z-0 xl:block bg-no-repeat ${
          dir === "rtl"
            ? "bg-left 2xl:-left-12 3xl:left-0"
            : "bg-right xl:-right-24 2xl:-right-20 3xl:right-0"
        } bg-contain xl:bg-cover 3xl:bg-contain absolute h-full w-full top-0`}
      />
    </div>
  );
};

export default SubscriptionWithBg;
