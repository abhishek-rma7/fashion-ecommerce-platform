import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const getUrl = (initial: string, options: any) => {
  for (const key in options) {
    if (key === "price") {
      const [lt, gt] = options[key].split("-");
      options["price[gt]"] = lt;
      options["price[lt]"] = gt;
      delete options.price;
    }
  }

  let url = initial;

  options.status = "Published";

  for (const key in options) {
    url = url.concat(`${key}=${options[key]}&`);
  }

  return url;
};

const fetchProducts = async ({ queryKey }: any) => {
  const options = queryKey[1];
  const url = getUrl("/products/?", options);
  const { data } = await http.get(url);

  // Return Data
  return {
    products: data.data,
    length: data.length,
  };
};

const fetchProductsForInfiniteQuery = async ({ pageParam = 1, queryKey }) => {
  const options = queryKey[1];
  const url = getUrl(`/products?page=${pageParam}&`, options);
  const { data } = await http.get(url);

  // Return Data
  return {
    products: data.data,
    length: data.length,
    pageParam,
    hasNextPage: data.hasNextPage,
  };
};
const useInfiniteProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery(
    ["/products-infinite", options],
    fetchProductsForInfiniteQuery,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNextPage) {
          return lastPage.pageParam + 1;
        } else {
          return false;
        }
      },
      refetchOnWindowFocus: false,
    }
  );
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<{ products: Product[]; length: number }, Error>(
    ["/products", options],
    fetchProducts,
    { keepPreviousData: true }
  );
};

export { useProductsQuery, fetchProducts, useInfiniteProductsQuery };
