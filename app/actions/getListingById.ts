import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try{
        const {listingId} = params;
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if(!listing){
            return null;
        }
        // 对象展开语法（Object Spread Syntax）和可选链运算符（Optional Chaining Operator）的组合。
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ... listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toDateString() || null,
            }
        };
    }catch(error: any){
        throw new Error(error);
    }
}