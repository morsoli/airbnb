import { getPriority } from "os";
import { getCurrentUser } from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesPage";
import getProperies from "../actions/getProperies";

const PropertiesPage = async ()=>{
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

    const properties = await getProperies();
    if (properties.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                title="未发布房源"
                subtitle="看起来你还没有发布过房源"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
            properies={properties}
            currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default PropertiesPage;  