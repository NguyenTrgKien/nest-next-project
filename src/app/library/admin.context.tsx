'use client'

import React, { createContext, useState } from "react";

interface IAdminContext {
    collapseMenu: boolean;
    setCollapseMenu: (v: boolean) => void;
}

export const AdminContext = createContext<IAdminContext | null>(null);

function AdminContextProvider({children}: {children: React.ReactNode}) {
    const [collapseMenu, setCollapseMenu] = useState(false);

    return (  
        <AdminContext.Provider value={{collapseMenu, setCollapseMenu}}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;