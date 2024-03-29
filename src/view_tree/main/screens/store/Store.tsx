import React, { useState, useEffect } from "react";
import StoreItem from "./building_blocks/store_item/StoreItem";
import { IAPItemDetails } from "expo-in-app-purchases";
import Constants from "expo-constants";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import { FlatList } from "react-native-gesture-handler";
import { purchaseItems } from "./data/purchase_items";
import { extractCoinAmount } from "./utils/iap_item_utils";
import { globalScreenStyles } from "../../../../global_styles/GlobalScreenStyles";
import { View, Platform } from "react-native";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";

/*
 * The ejection culprit
 */
const Store: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<IAPItemDetails[]>([]);
    const [error, setError] = useState<boolean>(false);

    const [retryCount, setRetryCount] = useState<number>(0);

    useEffect(() => {
        setLoading(true);

        if (Constants.appOwnership !== "expo") {
            (async () => {
                const { getProductsAsync, IAPResponseCode } = await import(
                    "expo-in-app-purchases"
                );

                const { results, responseCode } = await getProductsAsync([
                    "coin0",
                    "coin1",
                    "coin2",
                    "coin3",
                    "coin4",
                    "coin5",
                ]);

                if (responseCode === IAPResponseCode.OK && !!results) {
                    const finalResults: IAPItemDetails[] = results as IAPItemDetails[];

                    setItems(finalResults);
                } else {
                    setError(true);
                }

                setLoading(false);
            })();
        } else {
            setItems(purchaseItems);

            setLoading(false);
        }
    }, [retryCount]);

    const finalItems = items.sort(
        (a, b) => a.priceAmountMicros - b.priceAmountMicros
    );

    if (error) {
        return (
            <ErrorMessage
                refresh={() => {
                    setRetryCount((count) => count + 1);
                    setLoading(true);
                    setError(false);
                }}
            />
        );
    }

    if (loading) {
        return <LoadingWheel />;
    }

    return (
        <FlatList
            data={finalItems}
            ListFooterComponent={
                <View style={globalScreenStyles.listFooterBuffer} />
            }
            renderItem={({ item }) => {
                return (
                    <StoreItem
                        title={item.title}
                        coinAmount={extractCoinAmount(item.description)}
                        price={item.price}
                        onSelect={async () => {
                            if (Constants.appOwnership !== "expo") {
                                const { purchaseItemAsync } = await import(
                                    "expo-in-app-purchases"
                                );

                                if (__DEV__) {
                                    console.log(
                                        "Beginning purchase transaction..."
                                    );
                                }

                                if (Platform.OS === "ios") {
                                    await purchaseItemAsync(item.productId);
                                } else {
                                    /*
                                     * Seems that this method never resolves on android...
                                     */
                                    purchaseItemAsync(item.productId).then();
                                }

                                if (__DEV__) {
                                    console.log(
                                        "Finishing purchase transaction"
                                    );
                                }
                            }
                        }}
                    />
                );
            }}
            keyExtractor={(_, index) => `store:${index}`}
        />
    );
};

export default Store;
