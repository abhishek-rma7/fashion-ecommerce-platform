import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";
import { Banner } from "./types";

const fetchBanners = async ({ queryKey }): Promise<Banner[]> => {
  const options = queryKey[1];

  let url = "/banners/?";
  for (const key in options) {
    url = url.concat(`${key}=${options[key]}&`);
  }

  const { data } = await http.get(url);

  return data.data!;
};

const useBannersQuery = (options: { pageName: string; section?: string }) => {
  return useQuery(["/banners", options], fetchBanners);
};

export { useBannersQuery, fetchBanners };
