import * as React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import WalletHeader from "./building_blocks/wallet_header/WalletHeader";
import { WalletType } from "../../../../../../global_types/WalletTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { GET_WALLET } from "./gql/Queries";
import { palette } from "../../../../../../global_styles/Palette";
import WalletEntry from "../../../../../../global_building_blocks/wallet_entry/WalletEntry";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";

interface Props {}

interface QueryData {
    wallet: WalletType;
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

    const { openNew } = React.useContext(TabNavContext);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

    if (!data?.wallet && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <>
            <View style={basicLayouts.flexGrid1}>
                <FlatList
                    ListHeaderComponent={
                        data?.wallet && <WalletHeader wallet={data.wallet} />
                    }
                    data={data?.wallet ? data?.wallet.entries : []}
                    renderItem={({ item }) => (
                        <WalletEntry walletEntry={item} />
                    )}
                    keyExtractor={(item, index) =>
                        [item.time, "wallet", index].join(":")
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={
                                networkStatus === NetworkStatus.refetch ||
                                stillSpin
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
            <NewButton openNew={openNew} />
        </>
    );
};

export default Wallet;
