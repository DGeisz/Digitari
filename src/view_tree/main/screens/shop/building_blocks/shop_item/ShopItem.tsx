import React from "react";
import { Text, View } from "react-native";
import { styles } from "./ShopItemStyles";
import LockBuySelect from "../lock_buy_select/LockBuySelect";
import { ItemRequirement } from "../../../../../../global_types/ShopTypes";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";

interface Props {
    title: string;
    alreadyOwns: boolean;
    userBolts: number;
    level: number;
    ranking: number;
    price: number;
    requirement: ItemRequirement;
    purchaseTitle: string;
    description: string;
    alreadySelected: boolean;
    onConfirm: () => void;
    onSelect: () => void;
    loading?: boolean;
}

const ShopItem: React.FC<Props> = (props) => {
    let visible = true;
    let requirementText = "";

    if (
        !props.alreadyOwns &&
        !!props.requirement.ranking &&
        props.ranking < props.requirement.ranking
    ) {
        visible = false;
        requirementText = `Have a Convo Streak of ${toCommaRep(
            props.requirement.ranking
        )}`;
    } else if (
        !props.alreadyOwns &&
        !!props.requirement.level &&
        props.level < props.requirement.level
    ) {
        visible = false;
        requirementText = `Reach Level ${toCommaRep(props.requirement.level)}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{visible ? props.title : "???"}</Text>
            <View style={styles.childrenContainer}>
                {visible ? (
                    props.children
                ) : (
                    <Text style={styles.unknownText}>???</Text>
                )}
            </View>
            {visible ? (
                <LockBuySelect
                    alreadySelected={props.alreadySelected}
                    alreadyOwns={props.alreadyOwns}
                    purchaseTitle={props.purchaseTitle}
                    userBolts={props.userBolts}
                    description={props.description}
                    onSelect={props.onSelect}
                    onConfirm={props.onConfirm}
                    price={props.price}
                    loading={props.loading}
                />
            ) : (
                <View style={styles.unknownContainer}>
                    <Text style={styles.itemViewInstructions}>
                        {requirementText}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default ShopItem;
