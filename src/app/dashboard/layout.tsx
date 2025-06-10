import React from "react";
import { Layout } from "antd";
import FooterAdmin from "@/components/layout/admin.footer";
import HeaderAdmin from "@/components/layout/admin.header";
import SidebarAdmin from "@/components/layout/admin.sidebar";
import ContentAdmin from "@/components/layout/admin.content";
import AdminContextProvider from "../library/admin.context";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function LayoutAdmin({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions);
    
    return (  
        <AdminContextProvider>
            <Layout
                style={{minHeight: "100vh"}}
            >
                <SidebarAdmin/>
                <Layout>
                    <HeaderAdmin session={session}/>
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