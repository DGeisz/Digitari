import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { AllPostsNavProp } from "../../MainFeedNavTypes";
import { FeedContext, FeedType } from "../../MainFeedContext";

interface Props {
    navigation: AllPostsNavProp;
}

const AllPosts: React.FC<Props> = (props) => {
    const { feedType, setType } = useContext(FeedContext);

    useEffect(() => {
        return props.navigation.addListener("focus", (e) => {
            setType(FeedType.AllPosts);
        });
    }, []);

    return <View />;
};

export default AllPosts;
