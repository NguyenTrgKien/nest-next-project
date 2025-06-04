import React from "react";
import { Layout } from "antd";
import FooterAdmin from "@/components/layout/admin.footer";
import HeaderAdmin from "@/components/layout/admin.header";
import SidebarAdmin from "@/components/layout/admin.sidebar";
import ContentAdmin from "@/components/layout/admin.content";


function LayoutAdmin({children}: {children: React.ReactNode}) {
    return (  
        <Layout>
            <SidebarAdmin/>
            <Layout>
                <HeaderAdmin/>
                    <ContentAdmin>
                        {children}
                    </ContentAdmin>
                <FooterAdmin/>
            </Layout>
        </Layout>
    );
}

export default LayoutAdmin;