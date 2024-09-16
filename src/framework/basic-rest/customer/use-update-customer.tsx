// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { User } from "@framework/types";
import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  _id: string;
  address: string;
  contact: string;
  zipcode: string;
  city: string;
  state: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

async function updateUser(input): Promise<User> {
  const { data } = await http.patch(`/users/updateUser`, input);
  localStorage.setItem("profile", JSON.stringify(data.data));
  return data.data;
}
export const useUpdateUserMutation = () => {
  return useMutation((input: User) => updateUser(input));
};
