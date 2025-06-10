'use client'

import { AdminContext } from "@/app/library/admin.context";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { signOut } from "next-auth/react";
import { useContext } from "react";

interface ISesssionUser{
  accessToken: string,
  email: string,
  id: string,
  name: string,
  role: string,
}

interface ISesssion{
  user: ISesssionUser;
}

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
    key: 'logout',
    label: (
      <span
        className="text-red-500"
      >Đăng xuất</span>
    ),
  },
];

function HeaderAdmin({ session }: {session: ISesssion}) {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("Không có collapseMenu!");
  }

  const { collapseMenu, setCollapseMenu } = context;

  return (
    <Header
      style={{
        padding: 0,
        background: "#ccc",
        display: "flex",
        paddingRight: "15px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapseMenu(!collapseMenu)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div>
        <div>
        </div>
        <Dropdown
          menu={{ 
            items,
            onClick: ({key}) => {
              if(key === 'logout') {
                signOut({callbackUrl: "/auth/login"}) // Đăng xuất và chuyển về trang đăng nhập
              }
            }
          }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button>{session?.user?.email}</Button>
        </Dropdown>
      </div>
    </Header>
  );
}


export default HeaderAdmin;