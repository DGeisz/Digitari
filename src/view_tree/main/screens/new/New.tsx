import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "./NewStyles";
import { NewPostNavProp, NewPostRouteProp } from "../../MainEntryNavTypes";
import { palette } from "../../../../global_styles/Palette";
import NewPost from "./screens/new_post/NewPost";
import NewCommunity from "./screens/new_community/NewCommunity";

enum NewOption {
    Post,
    Community,
}

interface Props {
    navigation: NewPostNavProp;
    route: NewPostRouteProp;
}

const New: React.FC<Props> = (props) => {
    const [option, setOption] = useState<NewOption>(NewOption.Post);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.topBarContainer}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        option === NewOption.Post
                            ? { backgroundColor: palette.deepBlue }
                            : {},
                    ]}
                    onPress={() => setOption(NewOption.Post)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            {
                                color:
                                    option === NewOption.Post
                                        ? palette.white
                                        : palette.hardGray,
                            },
                        ]}
                    >
                        Post
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.option,
                        option === NewOption.Community
                            ? { backgroundColor: palette.deepBlue }
                            : {},
                    ]}
                    onPress={() => setOption(NewOption.Community)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            {
                                color:
                                    option === NewOption.Community
                                        ? palette.white
                                        : palette.hardGray,
                            },
                        ]}
                    >
                        Community
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={option === NewOption.Post ? {} : styles.hide}>
                <NewPost navigation={props.navigation} route={props.route} />
            </View>
            <View style={option === NewOption.Community ? {} : styles.hide}>
                <NewCommunity navigation={props.navigation} />
            </View>
        </View>
    );
};

export default New;
