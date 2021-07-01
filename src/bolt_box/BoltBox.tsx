import React from "react";
import { Text, View } from "react-native";
import { toCommaRep, toRep } from "../global_utils/ValueRepUtils";
import { styles } from "./BoltBoxStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { palette } from "../global_styles/Palette";

interface Props {
    amount: number;
    active?: boolean;
    showAmount?: boolean;
    fontSize?: number;
    fontColor?: string;
    boltSize?: number;
    boltColor?: string;
    boxColor?: string;
    showBoltPlus?: boolean;
    showAbbreviated?: boolean;
    paddingVertical?: number;
    paddingRight?: number;
    outOfBolt?: number;
    moveTextRight?: number;
    fontWeight?: "bold";
}

const BoltBox: React.FC<Props> = (props) => {
    return (
        <View
            style={[
                styles.boltBoxContainer,
                { backgroundColor: props.boxColor },
                !!props.paddingVertical
                    ? { paddingVertical: props.paddingVertical }
                    : {},
                !!props.paddingRight
                    ? { paddingRight: props.paddingRight }
                    : {},
            ]}
        >
            <MaterialIcons
                name="bolt"
                size={props.boltSize}
                color={
                    !!props.boltColor
                        ? props.boltColor
                        : props.active
                        ? palette.deepBlue
                        : palette.semiSoftGray
                }
            />
            {!!props.showAmount ? (
                <Text
                    style={[
                        styles.boltBoxText,
                        {
                            fontSize: props.fontSize,
                            fontWeight: props.fontWeight,
                            color: props.fontColor,
                            transform: !!props.moveTextRight
                                ? [{ translateX: -1 * props.moveTextRight }]
                                : undefined,
                        },
                    ]}
                >
                    {(props.showBoltPlus ? "+" : "") +
                        (props.showAbbreviated
                            ? toRep(props.amount)
                            : toCommaRep(props.amount))}
                    {!!props.outOfBolt && (
                        <Text>
                            {" / "}
                            {props.showAbbreviated
                                ? toRep(props.outOfBolt)
                                : toCommaRep(props.outOfBolt)}
                        </Text>
                    )}
                </Text>
            ) : (
                <></>
            )}
        </View>
    );
};

BoltBox.defaultProps = {
    amount: 0,
    active: true,
    fontSize: 12,
    showAmount: true,
    fontColor: palette.hardGray,
    boltSize: 12,
    boxColor: palette.transparent,
    showBoltPlus: false,
    showAbbreviated: true,
};

export default BoltBox;
