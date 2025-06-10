import { Spin } from "antd";

function Loading({message}: {message?: string}) {
    return (  
         <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
            <Spin size="large" />
            <h1 className="mt-4 text-xl font-semibold text-gray-700">
                Đang xử lý {message}...
            </h1>
            </div>
        </div>
    );
}

export default Loading;