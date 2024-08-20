import { Button, Form, Input } from "antd";
import { useAuthStore } from "../store/auth";
import { LeftOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import authService from "../services/authService";
import { useUserStore } from "../../../store/userStore";
import { useState } from "react";

export default function LoginUserForm() {
  const [error, setError] = useState();
  const email = useAuthStore((state) => state.email);
  const setAccion = useAuthStore((state) => state.setAccion);
  const retryRequest = useUserStore((state) => state.retryRequest);
  const setRetryRequest = useUserStore((state) => state.setRetryRequest);

  const handleStateForm = async ({ password }) => {
    try {
      const credentials = { email, password };
      await authService.loginUser(credentials);
      setRetryRequest(!retryRequest);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='m-auto mt-11'>
      <Button
        className='ml-[-15px] border-none mb-4'
        onClick={() => setAccion("CHECK_EMAIL")}
      >
        <LeftOutlined />
      </Button>
      <h2 className='mb-2 font-extrabold'>Iniciar Sesion</h2>
      <span>Enter your email below to create your account</span>
      <div className='mt-8'>
        <Form onFinish={handleStateForm}>
          <Form.Item name='password' rules={[{ required: true }]}>
            <Input
              className='h-10'
              type='password'
              placeholder='digite su contrasena'
            />
          </Form.Item>
          <div className='flex flex-col'>
            <span>{error && error} </span>
            <Button htmlType='submit' size={"large"}>
              Continuar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
