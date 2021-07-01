import React, { useState } from "react";
import { LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./LockBuySelectStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";
import BoltBox from "../../../../../../bolt_box/BoltBox";

interface Props {
    userBolts: number;
    price: number;
    purchaseTitle: string;
    itemTitle?: string;
    description: string;

    onConfirm: () => void;

    active?: boolean;
    inactiveMessage?: string;

    /*
     * Indicates whether the user already has this
     * item
     */
    alreadyOwns: boolean;
    selectTitle?: string;
    onSelect: () => void;
}

const LockBuySelect: React.FC<Props> = (props) => {
    const [lockedError, setLockedError] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);

    const activateLockedError = () => {
        LayoutAnimation.easeInEaseOut();
        setLockedError(true);

        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            setLockedError(false);
        }, 4000);
    };

    if (props.alreadyOwns) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>
                        {props.selectTitle}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    } else if (props.userBolts < props.price && false) {
        return (
            <View style={styles.container}>
                {lockedError && (
                    <Text style={styles.errorText}>
                        You need {toCommaRep(props.price)} digibolts to{" "}
                        {props.description}
                    </Text>
                )}
                <TouchableOpacity
                    style={styles.lockedContainer}
                    activeOpacity={0.5}
                    onPress={activateLockedError}
                >
                    <View style={styles.lockedPriceContainer}>
                        <View style={styles.lockedTitleContainer}>
                            <Text style={styles.lockedTitle}>
                                {props.purchaseTitle}
                            </Text>
                        </View>
                        <MaterialIcons
                            name="bolt"
                            size={24}
                            color={palette.mediumGray}
                        />
                        <Text style={styles.lockedPrice}>{props.price}</Text>
                    </View>
                    <MaterialIcons
                        name="lock"
                        size={24}
                        color={palette.mediumGray}
                    />
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                {showConfirm ? (
                    <View style={styles.confirmContainer}>
                        <Text style={styles.confirmText}>
                            Are you sure you want to {props.description}?
                        </Text>
                        <View style={styles.confirmBar}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    LayoutAnimation.easeInEaseOut();
                                    setShowConfirm(false);
                                }}
                            >
                                <Text style={styles.cancelButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={() => {
                                    LayoutAnimation.easeInEaseOut();
                                    setShowConfirm(false);
                                    props.onConfirm();
                                }}
                            >
                                <Text style={styles.confirmButtonText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity
                            style={[
                                styles.buyButton,
                                {
                                    borderColor: props.active
                                        ? palette.deepBlue
                                        : palette.notDeepBlue,
                                },
                            ]}
                            onPress={() => {
                                if (props.active) {
                                    LayoutAnimation.easeInEaseOut();
                                    setShowConfirm(true);
                                }
                            }}
                            activeOpacity={props.active ? 0.5 : 1}
                        >
                            <View
                                style={[
                                    styles.buyButtonTextContainer,
                                    {
                                        borderRightColor: props.active
                                            ? palette.mediumGray
                                            : palette.semiSoftGray,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.buyButtonText,
                                        {
                                            color: props.active
                                                ? palette.hardGray
                                                : palette.semiSoftGray,
                                        },
                                    ]}
                                >
                                    {props.purchaseTitle}
                                </Text>
                            </View>
                            <BoltBox
                                amount={props.price}
                                boltSize={23}
                                boltColor={
                                    props.active
                                        ? palette.deepBlue
                                        : palette.notDeepBlue
                                }
                                fontColor={
                                    props.active
                                        ? palette.hardGray
                                        : palette.semiSoftGray
                                }
                                moveTextRight={3}
                                fontSize={16}
                                fontWeight="bold"
                            />
                        </TouchableOpacity>
                        {!props.active && (
                            <Text style={styles.inactiveText}>
                                Change {props.itemTitle} to activate
                            </Text>
                        )}
                    </>
                )}
            </View>
        );
    }
};

LockBuySelect.defaultProps = {
    selectTitle: "Select",
    active: true,
    inactiveMessage: "",
    itemTitle: "",
};

export default LockBuySelect;
