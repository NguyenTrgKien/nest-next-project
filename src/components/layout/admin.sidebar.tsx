'use client'

import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useContext } from "react";
import { AdminContext } from "@/app/library/admin.context";

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

function SidebarAdmin() {
    const context = useContext(AdminContext);
    if(!context) {
        throw new Error("Không có collapseMenu!");
    }
    const {collapseMenu} = context;

    return (  
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            collapsed={collapseMenu}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
    );
}

export default SidebarAdmin;