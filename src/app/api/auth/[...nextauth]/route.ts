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
        if (!credentials?.email || !credentials?.password) return null;
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
            if (res.status === 401) {
              throw new Error("Email hoặc mật khẩu không đúng");
            }
            if (res.status === 404) {
              throw new Error("Không tìm thấy tài khoản");
            }
            throw new Error("Lỗi máy chủ, vui lòng thử lại sau");
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
          console.error(error); // Log error for debugging
          return null; // Explicitly return null in case of error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as ExtendedUser; // Cast user to ExtendedUser
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as ExtendedUser; // Cast token.user to ExtendedUser
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };