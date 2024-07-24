import profileServices from "../services/profileServices";
import { useProfileStore } from "../store/profile";
import dayjs from "dayjs";

export default function useHandleData({ next = null, send = null }) {
  const store = useProfileStore((state) => state.data);
  const setDataStoreFn = useProfileStore((state) => state.setDataStoreFn);

  const handleDataForm = async () => {
    if (send) {
      try {
        const user = await profileServices.updateDataUser(store);
        setDataStoreFn(user);
      } catch (error) {
        console.log(error); //gestionar el error y colocarlo en la ui
      }
    }
    next && next();
  };

  /**Valores de inicio de cada formulario */
  const initialValuesOneStep = {
    firstName: store.firstName,
    lastName: store.lastName,
    dateOfBirth: store.dateOfBirth ? dayjs(store.dateOfBirth) : "",
    gender: store.gender,
  };

  const initialValuesTwoStep = {
    city: store.city,
    sector: store.sector,
  };

  const initialValuesThreeStep = {
    levelOfEducation: store.levelOfEducation,
    profession: store.profession,
  };

  return {
    handleDataForm,
    store,
    setDataStoreFn,
    initialValuesOneStep,
    initialValuesTwoStep,
    initialValuesThreeStep,
  };
}
