import NextAuth, { NextAuthOptions, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"
import { JWT } from "next-auth/jwt"

// Extend the default User type to include isPro
declare module "next-auth" {
    interface User extends DefaultUser {
        isPro?: boolean
    }
    interface Session {
        user: {
            id: string
            isPro?: boolean
        } & DefaultUser
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        isPro?: boolean
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                    const user = await prisma.user.findUnique({ where: { email: credentials.email } })
                    if (!user || !user.password) return null

                        const isMatch = await bcrypt.compare(credentials.password, user.password)
                        if (!isMatch) return null

                            return { id: user.id, email: user.email, name: user.name, isPro: user.isPro }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.isPro = user.isPro
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string
                (session.user as any).isPro = token.isPro
            }
            return session
        }
    }
}

export default NextAuth(authOptions)
