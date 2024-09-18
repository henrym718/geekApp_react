import axiosPublic from "../api/axiosPublic";

export const getUserByCookie = async () => {
  const { data } = await axiosPublic.get("/user/getuserbycookie");
  return data;
};
