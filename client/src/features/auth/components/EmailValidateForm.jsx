import { Form, Input, Button } from "antd";
import { useAuthStore } from "../store/auth";
import AuthService from "../services/authService";

export default function EmailValidateForm() {
  const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setAccion = useAuthStore((state) => state.setAccion);

  const handleStateForm = async (value) => {
    setEmail(value.email);
    const data = await AuthService.isAuhenticated({ email: value.email });
    if (data) {
      setAccion("LOGGIN");
    } else {
      setAccion("CREATE_ACCOUNT");
    }
  };

  return (
    <div className='m-auto mt-11'>
      <Form onFinish={handleStateForm} initialValues={{ email: email || "" }}>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: "Por favor, introduce un correo válido",
            },
          ]}
        >
          <Input placeholder='email' />
        </Form.Item>
        <Button htmlType='submit'>Continuar</Button>
      </Form>
    </div>
  );
}
