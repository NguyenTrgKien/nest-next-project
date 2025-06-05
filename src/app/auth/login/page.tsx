// Login.tsx
'use client'
import LoginForm from "@/components/auth/LoginForm";
import { Form } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
    const redirect = useRouter();
    const [message, setMessage] = useState("");
    const onFinish = async(values: {email: string, password: string}) => {
        const {email, password} = values; 
        const result = await signIn('credentials', {
            redirect: false, // Tự động chuyển trang nếu login thành công
            email,
            password,
            callbackUrl: "/dashboard" // Trang sẽ chuyển đến sau khi login
        });
        if(result?.error) {
            setMessage(result.error);
        }else{
            redirect.push("/dashboard");
        }
    };

    return (  
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Login</h2>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <LoginForm 
                        message={message}
                    />  
                </Form>
            </div>
        </div>
    );
}

export default Login;
