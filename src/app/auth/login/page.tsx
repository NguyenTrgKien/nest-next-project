'use client'
import LoginForm from "@/components/auth/LoginForm";
import { Form } from "antd";

function Login() {
    const onFinish = (values: unknown) => {
        console.log('Finish:', values);
    };
    return (  
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ width: "450px", height: "400px", boxShadow: "0 0 5px #ccc", padding: "20px" }}
            onFinish={onFinish}
            >
            <h2 className="text-[24px] font-semibold text-gray-600 text-center mb-5">Login</h2>
            <LoginForm/>

            </Form>
        </div>
    );
}

export default Login;