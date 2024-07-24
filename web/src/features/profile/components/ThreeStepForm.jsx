import { Form, Select, Input, Button } from "antd";
import useHandleData from "../hooks/useHandleData";

export default function ThreeStepForm({ next, previous }) {
  const { setDataStoreFn, handleDataForm, initialValuesThreeStep } =
    useHandleData({ next });

  return (
    <div>
      <Form onFinish={handleDataForm} initialValues={initialValuesThreeStep}>
        <Form.Item
          name='levelOfEducation'
          label='Nivel de Etudios'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Select
            onChange={(item) => setDataStoreFn({ levelOfEducation: item })}
            options={[
              { value: "Primaria" },
              { value: "Secundaria" },
              { value: "Tercer Nivel" },
              { value: "Post Grado" },
              { value: "Master" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name='profession'
          label='profesion'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Input
            placeholder='Ingeniero den sotware'
            type='text'
            onChange={(e) =>
              setDataStoreFn({ [e.currentTarget.id]: e.currentTarget.value })
            }
          />
        </Form.Item>
        <Button onClick={previous}>Anterior</Button>
        <Button htmlType='submit'>Enviar</Button>
      </Form>
    </div>
  );
}
