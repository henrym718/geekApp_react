import { Form, Input, Button, DatePicker, Select } from "antd";
import useHandleData from "../hooks/useHandleData";
import dayjs from "dayjs";

export default function PersonalDataFrom({ next }) {
  const { setDataStoreFn, handleDataForm, initialValuesOneStep } =
    useHandleData({ next });

  return (
    <div>
      <Form initialValues={initialValuesOneStep} onFinish={handleDataForm}>
        <Form.Item
          name='firstName'
          label='Nombre'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Input
            className='h-15 hover:border-slate-500 focus:border-slate-500 focus:ring-slate-500 !important'
            onChange={(e) =>
              setDataStoreFn({ [e.currentTarget.id]: e.currentTarget.value })
            }
          />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Apellidos'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Input
            className='h-10 w-15'
            onChange={(e) =>
              setDataStoreFn({ [e.currentTarget.id]: e.currentTarget.value })
            }
          />
        </Form.Item>
        <Form.Item
          name='dateOfBirth'
          label='Fecha Nacimiento'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <DatePicker
            format='DD-MM-YYYY'
            onChange={(date) => setDataStoreFn({ dateOfBirth: dayjs(date) })}
          />
        </Form.Item>
        <Form.Item
          name='gender'
          label='Genero'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Select
            onChange={(item) => setDataStoreFn({ gender: item })}
            options={[
              { value: "M", label: "Masculino" },
              { value: "F", label: "Femenino" },
              { value: "O", label: "Otro" },
            ]}
          />
        </Form.Item>
        <Button htmlType='submit'>Siguiente </Button>
      </Form>
    </div>
  );
}
