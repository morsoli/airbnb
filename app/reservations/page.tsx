import { getCurrentUser } from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const TripsPage = async ()=>{
    const currentUser = await getCurrentUser();
    if (!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title = "未授权"
                subtitle="请先登录"
                />
            </ClientOnly>
        )
    }
    const reservation = await getReservations({
        authorId: currentUser.id
    })

    if (reservation.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                title="未被预订"
                subtitle="看起来你发布的房源没有被预订"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient
            reservations={reservation}
            currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default TripsPage;  