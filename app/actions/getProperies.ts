import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getProperies() {
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return [];
        }

        const properies = await prisma.listing.findMany({
            where: {
                userId: currentUser.id
            }
        });

        if(!properies){
            return [];
        }
        const saveProperies = properies.map((item)=>({
            ...item,
            createdAt: item.createdAt.toISOString(),
        }));

        return saveProperies
    }catch(error: any){
        throw new Error(error);
    }
}