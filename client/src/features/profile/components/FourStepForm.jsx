import { Button, Form, Input, Upload, message } from "antd";
const { TextArea } = Input;
import { PlusOutlined } from "@ant-design/icons";
import useHandleData from "../hooks/useHandleData";
import useAvatarHandle from "../hooks/useAvatarHandle";

export default function FourStepForm({ previous }) {
  const { customRequest, error } = useAvatarHandle();
  const { setDataStoreFn, handleDataForm } = useHandleData({
    next: false,
    send: true,
  });

  return (
    <div>
      <Form onFinish={handleDataForm}>
        <Form.Item label='Avatar'>
          <Upload
            listType='picture-circle'
            maxCount={1}
            accept='.jpeg, .png'
            customRequest={customRequest}
          >
            <div>{<PlusOutlined />}</div>
          </Upload>
          {error && <span> {error} </span>}
        </Form.Item>
        <Form.Item
          name='displayName'
          label='Nombre de usuario'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <Input
            onChange={(e) =>
              setDataStoreFn({ [e.currentTarget.id]: e.currentTarget.value })
            }
          />
        </Form.Item>
        <Form.Item
          name='aboutMe'
          label='Acerca de mi'
          rules={[{ required: true, message: "Campo Requerido" }]}
        >
          <TextArea
            onChange={(e) =>
              setDataStoreFn({ [e.currentTarget.id]: e.currentTarget.value })
            }
          />
        </Form.Item>
        <Button onClick={previous}>Anterior</Button>
        <Button htmlType='submit'>Finalizar</Button>
      </Form>
    </div>
  );
}
