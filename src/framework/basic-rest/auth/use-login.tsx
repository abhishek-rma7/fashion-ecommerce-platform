import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { promisify } from "util";
import { useLocalStorage } from "react-use";

export interface LoginInputType {
  email: string;
  password: string;
  loginType: string;
  remember_me: boolean;
}

async function login(input: LoginInputType, closeModal: any, authorize) {
  let user;
  if (input.loginType === "jwt") {
    const { data } = await http.post("/users/login/", input);
    user = data.data;
  }

  if (input.loginType === "google") {
    const { data } = await http.post("/users/google/", input);
    user = data.data;
  }
  // useLocalStorage("profile", user);
  localStorage.setItem("profile", JSON.stringify(user));
  closeModal();
  authorize();
  toast.dark(`Welcome, ${user.firstName}`, {
    autoClose: 2000,
    onClose: () => window.location.reload(),
  });
}
export const useLoginMutation = (closeModal) => {
  const { authorize } = useUI();
  return useMutation((input: LoginInputType) =>
    login(input, closeModal, authorize)
  );
};
