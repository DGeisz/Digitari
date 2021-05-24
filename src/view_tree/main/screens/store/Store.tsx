import React from "react";
import { ScrollView, View } from "react-native";
import StoreItem from "./building_blocks/store_item/StoreItem";
import { globalScreenStyles } from "../../../../global_styles/GlobalScreenStyles";

/*
 * The ejection culprit
 */
const Store: React.FC = () => {
    return (
        <ScrollView>
            <StoreItem
                title={"Pinch o' coins"}
                coinAmount={1500}
                price={"0.99"}
            />
            <StoreItem
                title={"Handful o' coins"}
                coinAmount={8000}
                price={"4.99"}
            />
            <StoreItem
                title={"Bag o' coins"}
                coinAmount={17000}
                price={"9.99"}
            />
            <StoreItem
                title={"Chest o' coins"}
                coinAmount={35000}
                price={"19.99"}
            />
            <StoreItem
                title={"Barrel o' coins"}
                coinAmount={90000}
                price={"49.99"}
            />
            <StoreItem
                title={"Truckload o' coins"}
                coinAmount={200000}
                price={"99.99"}
            />
            <View style={globalScreenStyles.listFooterBuffer} />
        </ScrollView>
    );
};

export default Store;
