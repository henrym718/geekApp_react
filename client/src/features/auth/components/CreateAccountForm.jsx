import { useState } from "react";
import { Button, Form, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useAuthStore } from "../store/auth";
import authService from "../services/authService";
import { useUserStore } from "../../../store/userStore";

export default function CreateAccountForm() {
  const [error, setError] = useState();
  const email = useAuthStore((state) => state.email);
  const setAccion = useAuthStore((state) => state.setAccion);
  const retryRequest = useUserStore((state) => state.retryRequest);
  const setRetryRequest = useUserStore((state) => state.setRetryRequest);

  const handleStateForm = async ({ password, repeatPassword, name }) => {
    try {
      const credentials = { email, password, repeatPassword, name };
      await authService.createUser(credentials);
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
      <h2 className='mb-2 font-extrabold text-lg'>Crear una cuenta</h2>
      <span>Enter your email below to create your account</span>
      <div className='mt-8'>
        <Form onFinish={handleStateForm}>
          <span className='font-semibold text-base custom-span'>Nombre</span>
          <Form.Item name='name' rules={[{ required: true }]}>
            <Input className='h-10' type='text' />
          </Form.Item>
          <span className='font-semibold text-base custom-span'>
            Contrasena
          </span>
          <Form.Item name='password' rules={[{ required: true }]}>
            <Input className='h-10' type='password' />
          </Form.Item>
          <span className='font-semibold text-base custom-span'>
            Repetir Contrasena
          </span>
          <Form.Item name='repeatPassword' rules={[{ required: true }]}>
            <Input className='h-10' type='password' />
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
