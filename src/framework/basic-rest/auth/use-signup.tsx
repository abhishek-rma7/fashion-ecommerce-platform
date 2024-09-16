import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import http from "@framework/utils/http";

export interface SignUpInputType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface DataResponseType {
  data: {
    result: {
      name: string;
      email: string;
    };

    token: string;
  };
}

async function signUp(input: SignUpInputType) {
  const { data } = await http.post("/users/signup/", input);
  localStorage.setItem("profile", JSON.stringify(data.result));
  Cookies.set("auth_token", data.token);
  authorize();
  closeModal();
}
export const useSignUpMutation = () => {
  return useMutation((input: SignUpInputType) => signUp(input));
};
