** NextJS

    - Sử dụng thư viện giao diện người dùng Ant Design
    - Sử dụng next-auth để thực hiện xử lý đăng nhập
    - Cài đặt gói npm install @auth/core: nó được dùng bởi NextAuth đê hỗ trợ middleware
        // middleware.ts
        import { withAuth } from 'next-auth/middleware'

        // Hàm này sẽ tự động kiểm tra session
        export default withAuth({
        pages: {
            signIn: '/api/auth/signin', // đường dẫn đăng nhập
        },
        })

        // Chỉ áp dụng middleware cho các route cần bảo vệ
        export const config = {
            matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*'],
        }
    - widthAuth là hàm do NextAuth cung cấp để dùng với middleware, nó sé tự kiểm tra JWT hoặc session cookie để xác định người dùng đã đăng nhập hay chưa
