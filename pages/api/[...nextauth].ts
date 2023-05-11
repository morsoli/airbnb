import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, {AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    // 使用 PrismaAdapter 来将用户数据存储到 prisma 数据库中。
    adapter: PrismaAdapter(prisma),
    // 其中 Google 和 Github 提供者使用 OAuth2.0 协议来进行认证，而 Credentials 提供者则使用用户名和密码进行认证。
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type:'text'},
                password: {label: 'password', type:'password'},
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials');
                }
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });
                if (!user || !user?.hashedPassword){
                    throw new Error("Invalid credentials");
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password, user.hashedPassword
                )
                if (! isCorrectPassword){
                    throw new Error("Invalid credentials");
                }
                return user;
            }
            
        })
    ],
    // 配置了认证页面的路由地址。这里将登录页面的路由设置为根路径。
    pages:{
        signIn: '/',
    },
    // 在开发环境下启用调试模式
    debug: process.env.NODE_ENV == "development",
    // 设置认证策略，这里使用 JWT
    session: {
        strategy: "jwt"
    },
    // 设置用于生成 JWT 的密钥
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);