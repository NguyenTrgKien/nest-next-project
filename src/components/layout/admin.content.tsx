'use client'

import { Layout } from "antd";
import React from "react";

function ContentAdmin({children}: {children: React.ReactNode}) {
    return (  
        <Layout.Content style={{ margin: '24px 16px 0' }}>
            <div
                style={{
                padding: 24,
                minHeight: "100%",
                background: "#ccc",
                borderRadius: "8px",
                }}
            >
                {children}
            </div>
        </Layout.Content>
    );
}

export default ContentAdmin;