import {
    ACTIVE_CONVOS,
    ActiveConvosData,
    ActiveConvosVariables,
} from "../../../../routes/tab_nav/screens/convos/sub_screens/active_convos/gql/Queries";
import { ApolloCache } from "@apollo/client";

export function sort_active_convos(cache: ApolloCache<any>) {
    const activeConvosData = cache.readQuery<
        ActiveConvosData,
        ActiveConvosVariables
    >({
        query: ACTIVE_CONVOS,
    });

    if (!!activeConvosData?.activeConvos) {
        let convos = [...activeConvosData.activeConvos];
        convos.sort((a, b) => parseInt(b.lastTime) - parseInt(a.lastTime));

        cache.writeQuery<ActiveConvosData, ActiveConvosVariables>({
            query: ACTIVE_CONVOS,
            data: {
                activeConvos: convos,
            },
        });
    }
}
