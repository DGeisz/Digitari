import * as React from "react";
import { FlatList } from "react-native";
import { exampleConvoCover } from "../../../../global_types/ConvoCoverTypes";
import ConvoCover from "../../../../global_building_blocks/convo_cover/ConvoCover";
import Post from "../../../../global_building_blocks/post/Post";
import {
    postExampleWithLink,
    PostType,
} from "../../../../global_types/PostTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_POST } from "./gql/Queries";
import {
    PostScreenNavProp,
    PostScreenRouteProp,
} from "../../MainEntryNavTypes";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { localUid } from "../../../../global_state/UserState";

interface Props {
    route: PostScreenRouteProp;
    navigation: PostScreenNavProp;
}

interface QueryData {
    post: PostType;
}

interface QueryVariables {
    pid: string;
}

const PostScreen: React.FC<Props> = (props) => {
    const uid = localUid();

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_POST, {
        variables: {
            pid: props.route.params.pid,
        },
        notifyOnNetworkStatusChange: true,
    });

    const showFooter = !!(data?.post.uid && data.post.uid === uid);

    const openConvo = (cid: string) => {
        props.navigation.navigate("Convo", { cid });
    };

    const onMessage = (tid: string, tname: string, pid: string) => {
        props.navigation.navigate("NewResponse", { tid, tname, pid });
    };

    if (!data?.post && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <FlatList
            ListHeaderComponent={
                data?.post ? (
                    <Post
                        post={data.post}
                        showFullRespond
                        standAlone
                        showFooter={showFooter}
                        showConvos={false}
                        onMessage={onMessage}
                    />
                ) : null
            }
            data={data?.post.convos}
            renderItem={({ item, index }) => (
                <ConvoCover
                    showUnViewedDot={false}
                    openConvo={openConvo}
                    convoCover={item}
                    showBottomBorder={
                        !!data?.post.convos &&
                        index !== data.post.convos.length - 1
                    }
                />
            )}
            keyExtractor={(item, index) => [item.id, index].join(":")}
        />
    );
};

export default PostScreen;
