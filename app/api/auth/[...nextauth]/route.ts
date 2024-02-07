import { prisma } from "@/db"
import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',

        credentials: {
          email: { label: "Email", type: "email" },
          password: {  label: "Password", type: "password" }
        },

        async authorize(credentials, req) {
          try {
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email,
                    password: credentials?.password,
                },
            });

            if (!user) return null;

            return user;
          } catch (error) {
            console.error('Error during authentication:', error);
            return null;
          }
        }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',

    maxAge: 1 * 24 * 60 * 60
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
    async session({ session, token }: { session: Session, token: any }) { 
      session.user = token.user
      return session
    },

    async jwt({ token, user }) { 
      user && (token.user = user)
        return token
    }
  },

  debug: false,
})

export { handler as GET, handler as POST }