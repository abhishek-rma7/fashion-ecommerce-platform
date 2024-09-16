import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useUI } from "@contexts/ui.context";
import { toast } from "react-toastify";

interface NewsLetterFormValues {
  email: string;
}
const defaultValues = {
  email: "",
};
export default function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  const { closeModal } = useUI();
  const [message, setMessage] = useState<{ message: string; error: boolean }>({
    message: "",
    error: false,
  });
  async function onSubmit(values: NewsLetterFormValues) {
    try {
      const { data: message } = await axios.post(
        "http://localhost:5500/subscribe",
        values
      );
      setMessage({ message: message.message, error: false });
      toast.dark(message.message);
      closeModal();
    } catch (error: any) {
      setMessage({ message: error.response.data.message, error: true });
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-full sm:w-[450px] md:w-[550px] lg:w-[980px] xl:w-[1170px] flex flex-col max-w-full max-h-full bg-white overflow-hidden rounded-md">
        <div className="flex items-center">
          <div className="flex-shrink-0 items-center justify-center bg-gray-200 hidden lg:flex lg:w-[520px] xl:w-auto">
            <Image
              src="/assets/images/newsletter.png"
              alt="Thumbnail"
              width={655}
              height={655}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col px-5 py-7 sm:p-10 md:p-12 xl:p-14 text-center w-full">
            <h4 className="uppercase font-semibold text-xs sm:text-sm text-body mb-2 lg:mb-4">
              {"Subscribe now"}
            </h4>
            <h2 className="text-heading text-lg sm:text-xl md:text-2xl leading-8 font-bold mb-5 sm:mb-7 md:mb-9">
              {"And never miss an update from CropOffs"}
            </h2>
            <p className="text-body text-sm leading-6 md:leading-7">
              {
                "Do subscribe to CropOffs to receive updates on new arrivals, special offers & our promotions"
              }
            </p>
            <form
              className="pt-8 sm:pt-10 md:pt-14 mb-1 sm:mb-0"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                placeholderKey="Write your email here"
                type="email"
                variant="solid"
                className="w-full"
                inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center bg-gray-50"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "forms:email-error",
                  },
                })}
                errorKey={errors.email?.message}
              />
              <Button className="w-full h-12 lg:h-14 mt-3 sm:mt-4">
                {"Subscribe"}
              </Button>
            </form>
            {message ? (
              <h2
                className=""
                style={{ color: `${message.error ? "red" : "green"}` }}
              >
                {message.message}
              </h2>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
