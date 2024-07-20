import { useEffect } from "react";
export default function useCleanOptionsSelector(
  setCity,
  store,
  setDataStoreFn,
  formRef
) {
  useEffect(() => {
    setCity(store?.city);
  }, []);

  const onChangeSelectorCity = (values) => {
    setCity(values);
    setDataStoreFn({ sector: null, city: values });
    formRef.current.resetFields(["sector"]);
    formRef.current.setFieldsValue({
      sector: null,
    });
  };

  return { onChangeSelectorCity };
}
