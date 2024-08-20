import { useState } from "react";
import { useProfileStore } from "../store/profile";
import profileServices from "../services/profileServices";

export default function useAvatarHandle() {
  const [error, setError] = useState();
  const setDataStoreFn = useProfileStore((state) => state.setDataStoreFn);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const data = await profileServices.uploadAvatar(file);
      console.log(data);
      setDataStoreFn({ avatar: data });
      onSuccess();
    } catch (err) {
      setError(err.response?.data.message);
      onError();
    }
  };

  // const beforeUpload = (file) => {
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) message.error("Image must smaller than 2MB!");

  //   const isJpgOrPng = file.type == "image/jpeg" || file.type == "image/png";
  //   if (!isJpgOrPng) message.error("Seleccione imágenes en formato JPEG o PNG");

  //   return isJpgOrPng && isLt2M ? false : Upload.LIST_IGNORE;
  // };

  /*
-------IMPLEMENTAR LUEGO ESTA ACCION-----------
const onRemove = async (file) => {
  const obj = { url: store.avatar };
  await instanceAxios.post("/image/remove", obj, {
    headers: {
      "Content-Type": "aplication/json",
      Authorization: `Bearer ${token}`,
    },
  });
  setDataStoreFn({ avatar: "" });
};*/

  return { customRequest, error };
}
