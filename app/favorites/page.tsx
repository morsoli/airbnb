import { getCurrentUser } from "../actions/getCurrentUser"
import getFavorites from "../actions/getFavorites";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const FavoritePage = async ()=>{
    const currentUser = await getCurrentUser();
    const favorites = await getFavorites();
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

    if (favorites.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                title="未收藏"
                subtitle="你看起来没有收藏任何房间"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoriteClient 
            favorites={favorites}
            currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default FavoritePage;  