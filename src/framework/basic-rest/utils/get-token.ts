export const getToken = () => {
  if (typeof window === undefined) {
    return null;
  } else {
    return global.localStorage?.getItem("profile") ? true : false;
  }
};
