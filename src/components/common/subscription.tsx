import Button from "@components/ui/button";
import { useState } from "react";
import http from "@framework/utils/http";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Subscription() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await http.post("/inbox/subscribe", { email });
      router.push(`/subscribed?email=${data.email}`);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 5000,
      });
    }
  };
  return (
    <div className="">
      <div className="mx-auto py-12 lg:py-16">
        <div className="py-10 px-6 bg-gray-700 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="uppercase text-2xl font-extrabold tracking-tight text-white">
              Sign up for our newsletter
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-indigo-100">
              Drop your Email ID to stay updated with the latest CropOffs
              Trends!
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            <form className="sm:flex" onSubmit={handleSubmit}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-white rounded-md"
                placeholder="Enter your email"
              />

              <button
                type="submit"
                className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
              >
                Notify me
              </button>
            </form>
            <p className="mt-3 text-sm text-indigo-100">
              We care about the protection of your data. Read our{" "}
              <a
                href="/privacy"
                target={"_blank"}
                className="text-white font-medium underline"
              >
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
