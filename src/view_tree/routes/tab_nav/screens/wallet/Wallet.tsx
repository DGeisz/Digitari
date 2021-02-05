import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import WalletHeader from "./building_blocks/wallet_header/WalletHeader";
import {
    exampleWallet,
    WalletType,
} from "../../../../../global_types/WalletTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_FEED } from "../main_feed/gql/Queries";
import LoadingWheel from "../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../global_building_blocks/error_message/ErrorMessage";
import { GET_WALLET } from "./gql/Queries";
import Post from "../../../../../global_building_blocks/post/Post";
import { palette } from "../../../../../global_styles/Palette";
import WalletEntry from "../../../../../global_building_blocks/wallet_entry/WalletEntry";

interface Props {}

interface QueryData {
    getWallet: WalletType;
}

interface QueryVariables {
    id: string;
}

const Wallet: React.FC<Props> = () => {
    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_WALLET, {
        variables: { id: "stacksonstacks" },
        notifyOnNetworkStatusChange: true,
    });

    console.log(data?.getWallet.entries.length, error, networkStatus, refetch);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.getWallet && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <View style={basicLayouts.flexGrid1}>
            <FlatList
                ListHeaderComponent={
                    data?.getWallet && <WalletHeader wallet={data.getWallet} />
                }
                data={data?.getWallet.entries}
                renderItem={({ item }) => <WalletEntry walletEntry={item} />}
                keyExtractor={(item, index) =>
                    [item.time, "wallet", index].join(":")
                }
                refreshControl={
                    <RefreshControl
                        refreshing={
                            networkStatus === NetworkStatus.refetch || stillSpin
                        }
                        onRefresh={() => {
                            setStillSpin(true);
                            refetch && refetch();
                            setTimeout(() => {
                                setStillSpin(false);
                            }, 1000);
                        }}
                        colors={[
                            palette.deepBlue,
                            palette.darkForestGreen,
                            palette.oceanSurf,
                        ]}
                        tintColor={palette.deepBlue}
                    />
                }
            />
        </View>
    );
};

export default Wallet;