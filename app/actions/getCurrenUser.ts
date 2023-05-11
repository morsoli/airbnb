import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try{
        const session = await getSession();
        if(!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        if (!currentUser){
            return null;
        }
        /* 
        ...currentUser 是 TypeScript 中的展开语法（spread syntax），它用于将一个对象或数组展开成一系列独立的值。
        在下面的代码中，..currentUser 将 currentUser 对象展开成一个新的对象，这个新的对象包含了 currentUser 对象中的所有属性和值。
        在展开对象时，如果存在重复的属性名，则后面的属性值会覆盖前面的属性值。
        在这个例子中，展开语法被用于将 currentUser 对象的属性和值复制到一个新的对象中。这样做的目的是为了创建一个新的对象，
        其中包含了 currentUser 对象的所有属性和值，并且可以对这个新的对象进行修改，而不会影响原始的 currentUser 对象。
        */
        return {
            ... currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    } catch (error: any) {
        return null;
    }
}