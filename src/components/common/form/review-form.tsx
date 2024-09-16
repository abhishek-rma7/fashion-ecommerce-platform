import Input from "@components/ui/input";
import Modal from "@components/common/modal/modal";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import ReactStars from "react-rating-stars-component";
import { ReactNode, useEffect, useState } from "react";
import { useUI } from "@contexts/ui.context";
import http from "@framework/utils/http";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface ReviewFormValues {
  comment: string;
}

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const { isAuthorized, setModalView, openModal, closeModal } = useUI();

  async function onSubmit(values: ReviewFormValues) {
    const review = { ...values, rating };
    const productId = router.query.id;
    if (rating === 0) {
      return toast.error("Please select a rating.");
    }
    try {
      await http.post(`/reviews?product=${productId}`, review);
      toast.success(`Thank you for your precious review.`, {
        autoClose: 1500,
        onClose: () => router.reload(),
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };

  const handleSignIn = () => {
    closeModal();
    setModalView("LOGIN_VIEW");
    setOpen(false);
    openModal();
  };

  const handleOpenModal = () => {
    setModalView("REVIEW_FORM");
    openModal();
  };

  useEffect(() => {}, [isAuthorized]);

  return (
    <>
      <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
        {isAuthorized ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md w-full mx-auto flex flex-col justify-center mt-6 lg:mt-8 bg-white"
            noValidate
          >
            <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
              <div className="pb-1.5">
                <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                  Your rating
                </label>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={20}
                  color="#c6c6c6"
                  activeColor="#202020"
                />
              </div>
              <TextArea
                rows={2}
                labelKey="Comment"
                {...register("comment", {
                  required: "Your comment is required",
                })}
                errorKey={(errors as any).message?.message}
              />
              <div className="w-full">
                <Button
                  type="submit"
                  className="h-12 md:mt-1 text-sm lg:text-base w-full"
                >
                  {"Post Review"}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-lg"> Please login to write a review! </h1>
            <Button className="mt-4" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewForm;
