import StarIcon from "@components/icons/star-icon";
import { Product } from "@framework/types";
import React from "react";
import ReviewBtn from "./reviewBtn";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Reviews: React.FC<{
  reviews: Product["reviews"];
  name: string;
  meta: { slug: string; id: string };
  count: number;
  rating: number;
}> = ({ reviews, count, rating }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-32 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <StarIcon
                    key={idx}
                    className={classNames(
                      rating > idx ? "text-yellow-400" : "text-gray-300",
                      "flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{count} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {count} reviews
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 py-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <ReviewBtn />
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-300">
              {reviews?.map((review) => (
                <div key={review._id} className="py-6">
                  <div className="flex items-center">
                    <div>
                      <h4 className="text-base font-bold text-gray-900">
                        {review.user.firstName} {review.user.lastName}
                      </h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-700"
                    dangerouslySetInnerHTML={{ __html: review.comment }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
