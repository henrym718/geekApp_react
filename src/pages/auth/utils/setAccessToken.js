import axiosprivate from "../../../api/axiosPrivate";

const setAccessToken = (accessToken) => {
  axiosprivate.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export default setAccessToken;
