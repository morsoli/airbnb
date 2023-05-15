import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser){
       return NextResponse.error();
    }
    const body = await request.json();
    
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if (!listingId||!startDate||!endDate||!totalPrice){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        // 将 reservations.create 作为 data 参数中的 create 方法，将其作为 reservations 字段的值。
        // 这样，prisma.listing.update 方法就会在数据库中更新指定 id 的 Listing 记录，并将新创建的 Reservation 记录与该 Listing 记录进行关联。
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice

                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}