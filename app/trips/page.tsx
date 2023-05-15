import { getCurrentUser } from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripClient from "./TripClient";

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
        userId: currentUser.id
    })

    if (reservation.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                title="未发现旅程"
                subtitle="你看起来还未预订任何房间"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripClient
            reservations={reservation}
            currentUser={currentUser} 
            />
        </ClientOnly>
    )

}

export default TripsPage;  