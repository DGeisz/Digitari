import * as React from "react";
import { styles } from "./PostStyles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { palette } from "../../global_styles/Palette";
import { PostType } from "../../global_types/PostTypes";

const digicoinSize = 12;

interface Props {
    post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={[basicLayouts.flexGrid2, basicLayouts.flexRow]}>
                    <View style={styles.tierContainer}>
                        <Text>
                            😊
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.postUserText}>
                            {post.user}
                            <Text style={styles.postTimeText}>{" · 1h"}</Text>
                        </Text>
                    </View>
                </View>
                <View style={[basicLayouts.grid8, basicLayouts.flexRow]}>
                    <Ionicons
                        name={"ios-chatbubbles"}
                        size={24}
                        color="black"
                    />
                    <Text>{post.convoCount}</Text>
                </View>
            </View>
            <View style={styles.postBodyContainer}>
                <Text style={styles.postBodyText}>{post.content}</Text>
            </View>
            <View>
                <View style={[basicLayouts.flexRow, basicLayouts.grid3]}>
                    <FontAwesome5 name="money-bill-wave" size={digicoinSize} />
                    <Text style={styles.postCoinText}>{post.coin}</Text>
                </View>
                <View style={basicLayouts.grid9}>
                    <TouchableOpacity style={styles.postResponseButton}>
                        <Entypo
                            name="pencil"
                            size={digicoinSize}
                            color="black"
                        />
                        <View style={styles.postRewardContainer}>
                            <FontAwesome5
                                name="money-bill-wave"
                                size={digicoinSize}
                                color={palette.darkForestGreen}
                            />
                            <Text style={styles.postRewardText}>
                                {post.convoReward}
                            </Text>
                        </View>
                        <View style={styles.postCostContainer}>
                            <FontAwesome5
                                name="money-bill-wave"
                                size={digicoinSize}
                                color={palette.white}
                            />
                            <Text style={styles.postCostText}>
                                {post.responseCost}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Post;
