"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, message as antdMessage} from "antd";
import LoginForm from "@/components/auth/LoginForm";
import Loading from "@/components/Loading";

function Login() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setMessage("");

    try {
      const { email, password } = values;
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard"
      });

      if (result?.ok && !result.error) {
        antdMessage.success("Đăng nhập thành công!");
        router.push(result.url || '/dashboard');
      } else {
        const err = result?.error || "Đăng nhập thất bại";
        setMessage(err);
        antdMessage.error(err);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định";
      setMessage(errorMessage);
      antdMessage.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị trang loading riêng nếu đang loading
  if (loading) {
    return (
      <Loading message="đăng nhập"/>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Đăng nhập</h2>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
        >
          <LoginForm message={message}/>
        </Form>
      </div>
    </div>
  );
}

export default Login;