import React from "react";
import { Layout } from "antd";
import FooterAdmin from "@/components/layout/admin.footer";
import HeaderAdmin from "@/components/layout/admin.header";
import SidebarAdmin from "@/components/layout/admin.sidebar";
import ContentAdmin from "@/components/layout/admin.content";
import AdminContextProvider from "../library/admin.context";


function LayoutAdmin({children}: {children: React.ReactNode}) {
    return (  
        <AdminContextProvider>
            <Layout
                style={{minHeight: "100vh"}}
            >
                <SidebarAdmin/>
                <Layout>
                    <HeaderAdmin/>
                    <ContentAdmin>
                        {children}
                    </ContentAdmin>
                    <FooterAdmin/>
                </Layout>
            </Layout>
        </AdminContextProvider>
    );
}

export default LayoutAdmin;