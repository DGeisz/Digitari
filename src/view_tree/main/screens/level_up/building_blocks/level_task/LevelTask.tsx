import React, { useState } from "react";
import { Text, View } from "react-native";
import { LevelTask } from "../../../../../../global_types/LevelTypes";
import { UserType } from "../../../../../../global_types/UserTypes";
import { styles } from "./LevelTaskStyles";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../global_constants/screen_constants";
import { palette } from "../../../../../../global_styles/Palette";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";

interface Props {
    task: LevelTask;
    user: UserType;
}

const LevelTaskComp: React.FC<Props> = (props) => {
    const [barWidth, setBarWidth] = useState(GENERAL_CONTENT_WIDTH - 40);

    const progress = Math.min(50, props.task.quantity);

    const barColor =
        progress / props.task.quantity >= 1
            ? palette.quasiLightForestGreen
            : palette.deepBlue;

    return (
        <View style={styles.container}>
            <Text style={styles.taskDescription}>
                Get 11 Orcas to call your name
            </Text>
            <View style={styles.progressContainer}>
                <View
                    style={[
                        styles.progressBar,
                        {
                            borderColor: barColor,
                        },
                    ]}
                    onLayout={(e) => {
                        setBarWidth(e.nativeEvent.layout.width);
                    }}
                >
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width:
                                    (progress / props.task.quantity) * barWidth,
                                backgroundColor: barColor,
                            },
                        ]}
                    />
                </View>
                <View style={styles.numericContainer}>
                    <Text style={styles.numericText}>
                        {toRep(progress)} / {toRep(props.task.quantity)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LevelTaskComp;
