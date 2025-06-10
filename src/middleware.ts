// middleware.ts
import { withAuth } from 'next-auth/middleware'

// Hàm này sẽ tự động kiểm tra session xem người dùng có đăng nhập hay chưa
export default withAuth({
  pages: {
    signIn: '/auth/login', // Nếu người dùng chưa đăng nhập thì nó sẽ tự động redirect đến trang đăng nhập
  },
  // callbacks: {
  //   authorized({token}) { // Kiểm tra người dùng có phải là admin không
  //       // Nếu là admin thì mới được vào dashboard
  //       if(token?.role === 'admin') {
  //           return true;
  //       }
  //       return false;
  //   }
  // }
})

// Chỉ áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
