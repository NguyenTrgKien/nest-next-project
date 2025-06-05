'use client'

import { AdminContext } from "@/app/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { useContext } from "react";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

function HeaderAdmin() {
    const context = useContext(AdminContext);
    if(!context) {
        throw new Error("Không có collapseMenu!");
    }
    const {collapseMenu, setCollapseMenu} = context;

    return (  
        <Header 
            style={{ 
                padding: 0,
                background: "#ccc",
                display: "flex",
                paddingRight: "15px",
                justifyContent: "space-between",
                alignItems: "center"
            }} 
        >
            <Button
                type="text"
                icon={collapseMenu ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => setCollapseMenu(!collapseMenu)}
                style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64
                }}
            />

            <Dropdown 
                menu={{ items }} 
                placement="bottomRight" 
                arrow={{ pointAtCenter: true }}
            >
                <Button>Admin</Button>
            </Dropdown>
        </Header>        
    );
}

export default HeaderAdmin;