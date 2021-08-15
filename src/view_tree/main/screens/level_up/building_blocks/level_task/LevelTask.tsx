import React, { useState } from "react";
import { Text, View } from "react-native";
import { LevelTask } from "../../../../../../global_types/LevelTypes";
import { UserType } from "../../../../../../global_types/UserTypes";
import { styles } from "./LevelTaskStyles";
import { GENERAL_CONTENT_WIDTH } from "../../../../../../global_constants/screen_constants";
import { palette } from "../../../../../../global_styles/Palette";
import { toRep } from "../../../../../../global_utils/ValueRepUtils";
import { getTaskDescription } from "../../utils/task_description_utils";
import { getTaskProgress } from "../../utils/task_progress_utils";

interface Props {
    task: LevelTask;
    user: UserType;
}

const LevelTaskComp: React.FC<Props> = (props) => {
    const [barWidth, setBarWidth] = useState(GENERAL_CONTENT_WIDTH - 40);

    const progress = getTaskProgress(props.task, props.user);

    const barColor =
        progress / props.task.quantity >= 1
            ? palette.quasiLightForestGreen
            : palette.deepBlue;

    const finalProgress = Math.min(progress, props.task.quantity);

    return (
        <View style={styles.container}>
            <Text style={styles.taskDescription}>
                {getTaskDescription(props.task)}
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
                                    (finalProgress / props.task.quantity) *
                                    barWidth,
                                backgroundColor: barColor,
                            },
                        ]}
                    />
                </View>
                <View style={styles.numericContainer}>
                    <Text style={styles.numericText}>
                        {toRep(finalProgress)} / {toRep(props.task.quantity)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LevelTaskComp;
