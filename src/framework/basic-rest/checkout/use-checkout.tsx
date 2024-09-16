import http from "@framework/utils/http";
import { useMutation } from "@tanstack/react-query";
import { useUI } from "@contexts/ui.context";

async function checkout(input, authorize: () => void) {
  let response;

  if (input.paymentType === "Prepaid") {
    const { data } = await http.post(`/orders/finish-order`, input);
    response = data;
  } else {
    const { data } = await http.post(`/orders/create-cod`, input);
    response = data;
  }

  return response.data;
}

export const useCheckoutMutation = () => {
  const { authorize } = useUI();
  return useMutation((input) => checkout(input, authorize), {
    onSuccess: ({ data }) => {
      return data;
    },
  });
};
