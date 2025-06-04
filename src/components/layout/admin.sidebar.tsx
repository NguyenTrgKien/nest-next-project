import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React from "react";

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

function SidebarAdmin() {
    return (  
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
    );
}

export default SidebarAdmin;