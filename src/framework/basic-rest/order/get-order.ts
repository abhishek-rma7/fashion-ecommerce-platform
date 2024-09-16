import { CheckoutInputType, Order } from "@framework/types";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

export const fetchOrder = async (_id: string) => {
  const { data } = await http.get(`/orders/${_id}`);
  return data.data;
};
export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>([`/orders/${id}`, id], () => fetchOrder(id));
};
