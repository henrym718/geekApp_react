import { useRef } from "react";
import { Form, Button, Select } from "antd";
import useOptionsSelector from "../hooks/useOptionsSelector";
import useCleanOptionsSelector from "../hooks/useCleanOptionsSelector";
import useHandleData from "../hooks/useHandleData";

export default function TwoStepFrom({ next, previous }) {
  /**Referencia al Form para trabajar con los initialvalues  */
  const formRef = useRef();
  /**Hook del manejo del boton enviar del formulario */
  const { handleDataForm, store, setDataStoreFn, initialValuesTwoStep } =
    useHandleData({ next });
  /**Hook para transformar las options en lo selectores */
  const { citiesOp, sectorsOp, setCity } = useOptionsSelector(places);
  /**Hook para resetear los values de los selectors */
  const { onChangeSelectorCity } = useCleanOptionsSelector(
    setCity,
    store,
    setDataStoreFn,
    formRef
  );

  return (
    <div>
      <Form
        ref={formRef}
        onFinish={handleDataForm}
        initialValues={initialValuesTwoStep}
      >
        <Form.Item
          label='Municipio'
          name='city'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Select options={citiesOp} onChange={onChangeSelectorCity} />
        </Form.Item>
        <Form.Item
          label='Localidad'
          name='sector'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Select
            options={sectorsOp}
            onChange={(item) => setDataStoreFn({ sector: item })}
          />
        </Form.Item>
        <Button onClick={previous}>Anterior</Button>
        <Button htmlType='submit'>Siguiente</Button>
      </Form>
    </div>
  );
}

const places = [
  { id: 1, city: "Troncal", sector: ["H", "Ningbo", "Wenzhou"] },
  { id: 2, city: "Triunfo", sector: ["G", "Ningbo", "Wenzhou"] },
];
