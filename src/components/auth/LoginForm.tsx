import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import Link from 'next/link';

function LoginForm({message}: {message: string}) {
    
    return (  
        <>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
                </Flex>
            </Form.Item>
            {
                message && (
                    <p 
                        style={{
                            color: 'red',
                            paddingBottom: '5px'
                        }}
                    >{message}</p>
                )
            }
            <Form.Item>
                <Button block type="primary" htmlType="submit">
                Log in
                </Button>
                or <Link href={'/auth/register'}>Register now!</Link>
            </Form.Item>
        </>
    );
}

export default LoginForm;