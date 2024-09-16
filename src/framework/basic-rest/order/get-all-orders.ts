import { CheckoutInputType, Order } from "@framework/types";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

export const fetchOrders = async () => {
  // const [_key, _params] = queryKey;
  const { data } = await http.get(`/users/orders`);
  return data.data;
};
export const useOrdersQuery = () => {
  return useQuery<Order[], Error>([`http://localhost:5500/users/orders`], () =>
    fetchOrders()
  );
};
