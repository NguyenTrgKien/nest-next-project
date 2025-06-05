'use client'

import { useSession } from "next-auth/react";



function Dashboard() {
    const {data: session} = useSession();
    console.log(session);
    return (  
        <div className="">
            <div className="grid grid-cols-3 gap-5">
                {
                    [1,2,3,4,5,6].map((item, index) => (
                        <div key={index} className="w-full h-[30px] bg-white rounded-md flex items-center justify-center">
                            {item}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Dashboard;