import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./PostStyles";
import Tier from "../tier/Tier";
import CoinBox from "../coin_box/CoinBox";
import { Entypo } from "@expo/vector-icons";
import ConvoCover from "../convo_cover/ConvoCover";
import { PostType } from "../../global_types/PostTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import { palette } from "../../global_styles/Palette";

interface Props {
    post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.postContentContainer}>
                <View style={styles.postSideBuffer}>
                    <View style={styles.sideBufferTop}>
                        <Tier size={30} ranking={post.ranking} />
                        <View style={styles.sideBufferDivider} />
                    </View>
                    <View style={styles.sideBufferBottom}>
                        <CoinBox
                            amount={post.coin}
                            coinSize={22}
                            fontSize={14}
                        />
                    </View>
                </View>
                <View style={styles.postMain}>
                    <View style={styles.postHeader}>
                        <Text style={styles.postUserText}>{post.user}</Text>
                        <Text style={styles.postDotText}>·</Text>
                        <Text style={styles.postTimeText}>
                            {millisToRep(Date.now() - post.time)}
                        </Text>
                    </View>
                    <View style={styles.postMainBody}>
                        <Text style={styles.postMainText}>{post.content}</Text>
                    </View>
                    <View style={styles.postMainFooter}>
                        <View style={styles.mainFooterLeft}>
                            <TouchableOpacity>
                                <CoinBox
                                    amount={0}
                                    showAmount={false}
                                    coinSize={25}
                                    active={post.coinDonated}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainFooterRight}>
                            <TouchableOpacity
                                style={styles.responseButton}
                                activeOpacity={0.5}
                            >
                                <View style={styles.costContainer}>
                                    <Entypo
                                        name="pencil"
                                        size={24}
                                        style={styles.pencil}
                                        color={palette.beneathTheWaves}
                                    />
                                    <CoinBox
                                        amount={post.convoReward}
                                        coinSize={17}
                                        showCoinPlus
                                        boxColor={palette.lightForestGreen}
                                    />
                                </View>
                                <CoinBox
                                    amount={post.responseCost}
                                    coinSize={17}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.postConvosContainer}>
                {post.convos.map((convo, index) => {
                    const showBottom = index != post.convos.length - 1;
                    return (
                        <ConvoCover
                            key={post.id + post.time + index}
                            convoCover={convo}
                            showBottomBorder={showBottom}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Post;
