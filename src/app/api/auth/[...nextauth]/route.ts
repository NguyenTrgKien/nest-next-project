import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth's User type to match your IUser interface
interface ExtendedUser extends User {
  id: string;
  email: string;
  name?: string | null;
  role?: string | null;
  accessToken?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email", 
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Vui lòng nhập email và mật khẩu");
      }
      const { email, password } = credentials;
      try {
        const res = await fetch(`http://localhost:8080/api/v1/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          switch (res.status) {
            case 400:
              throw new Error(errorData.message || "Dữ liệu không hợp lệ");
            case 401:
              throw new Error("Email hoặc mật khẩu không đúng");
            case 403:
              throw new Error("Tài khoản bị khóa");
            case 404:
              throw new Error(`Email không tồn tại!`);
            default:
              throw new Error(errorData.message || "Lỗi máy chủ, vui lòng thử lại sau");
          }
        }

        const data = await res.json();
        const user = data.user;
        const accessToken = data.access_token;

        if (!user || !user._id || !user.email) {
          throw new Error("Dữ liệu người dùng không hợp lệ");
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name || null,
          role: user.role || null,
          accessToken: accessToken || null,
        };
      } catch (error) {
        // Ném lỗi với thông điệp tùy chỉnh
        throw new Error(error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định");
      }
},
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(token);
      if (user) {
        token.user = user as ExtendedUser;
      }
      return token; // Sau khi trả về token thì next-auth tự động lưu vào cookie của trình duyệt
    },
    async session({ session, token }) { // Khi client gọi thì hàm này sẽ hoạt động
      // tham số session là một phần mặt định của next-auth
      // token: chính là token JWT được lưu trong hàm jwt() ở trên, và đã được next-auth giải mã từ cookie
      if (token.user) {
        session.user = token.user as ExtendedUser; // Thêm thông tin user vào session để client có thể truy cập
      }
      console.log(session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };