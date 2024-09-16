import { useUI } from "@contexts/ui.context";
import { auth } from "@framework/firebase.service";
import http from "@framework/utils/http";
import Router from "next/router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function logout(unauthorize) {
  // return http.post(API_ENDPOINTS.LOGIN, input);

  const user = JSON.parse(localStorage.getItem("profile") || "");
  try {
    await http.get("/users/logout");
    if (user.loginType === "google") {
      auth.signOut();
    }
    localStorage.removeItem("profile");
    unauthorize();
    toast.dark("Logout successfull", {
      autoClose: 2000,
      onClose: () => Router.push("/"),
    });
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
  return {
    ok: true,
    message: "Logout Successful!",
  };
}
export const useLogoutMutation = () => {
  const { unauthorize } = useUI();
  return useMutation(() => logout(unauthorize));
};
