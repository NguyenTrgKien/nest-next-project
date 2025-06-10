"use client"; // Thêm dòng này ngay đầu file

import Loading from "@/components/Loading";
import { Button, Form, Input} from "antd";
import { useState } from "react";
import {toast, TypeOptions} from 'react-toastify';


interface IRegisterData{
    name: string;
    phone: string;
    email: string;
    password: string;
}

function Register() {  // Đổi tên thành Register cho đúng với chức năng
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const notify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type
        });
    };

    const onFinish = async(values: IRegisterData) => {
        setLoading(true);
        try{
            const res = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            const data = await res.json();
            if (!res.ok) {
                // Nếu HTTP status là 4xx, 5xx thì vào đây
                throw new Error(data.message || "Đăng ký thất bại!");
            }

            notify(data.message || "Đăng ký thành công!", "success");
            setLoading(false);
        }catch(error) {
            const err = error as Error;
            notify(String(err) || "Đã có lỗi xảy ra!", "error");
            setLoading(false);
        }
    };

    if(loading) {
        return <Loading message="đăng kí"/>
    }

    return (  
        <div className="max-w-md mx-auto p-4">
            <Form
                form={form}
                name="register"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="Tên người dùng"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập sđt!' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;