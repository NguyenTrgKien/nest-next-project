'use client'

// Dùng để cung cấp session Context từ next-auth cho toàn bộ ứng dụng để:
// + Xác định người dùng đã đăng nhập hay chưa
// + Truy cập thông tin phiên làm việc ở mọi component
import { SessionProvider } from "next-auth/react"
import React from "react";

const Providers = ({children}: {children: React.ReactNode}) => {
    return <SessionProvider>{children}</SessionProvider>
} 

export default Providers;