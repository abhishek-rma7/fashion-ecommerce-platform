import { Product } from "@framework/types";
import { useQuery } from "@tanstack/react-query";
import http from "@framework/utils/http";

export const fetchProduct = async ({ queryKey }) => {
  const id = queryKey[1];
  if (id) {
    const { data } = await http.get(`/products/${id}`);
    return data.data;
  }
};
export const useProductQuery = (id: string) => {
  return useQuery<Product, Error>([`/products/${id}`, id], fetchProduct);
};
