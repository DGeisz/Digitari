import React, { useState } from "react";
import { Animated, RefreshControl, View } from "react-native";
import { NetworkStatus, useQuery } from "@apollo/client";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { GET_CHALLENGES } from "./gql/Queries";
import { UserType } from "../../../global_types/UserTypes";
import { ChallengeType } from "../../../global_types/ChallengeTypes";
import LoadingWheel from "../../loading_wheel/LoadingWheel";
import ErrorMessage from "../../error_message/ErrorMessage";
import Challenge from "../../challenge/Challenge";
import { palette } from "../../../global_styles/Palette";

interface Props {
    user: UserType;
    routeKey: string;
}

interface QueryData {
    challenges: ChallengeType[];
}

const UserChallenges: React.FC<Props> = ({ user, routeKey }) => {
    const { data, error, networkStatus, refetch } = useQuery<QueryData>(
        GET_CHALLENGES,
        {
            notifyOnNetworkStatusChange: true,
        }
    );

    const scrollPropsAndRef = useCollapsibleScene(routeKey);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (!data?.challenges && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <Animated.FlatList
            {...scrollPropsAndRef}
            data={data?.challenges}
            renderItem={({ item }) => (
                <Challenge challenge={item} user={user} />
            )}
            keyExtractor={(_, index) => [user.id, "chlng", index].join(":")}
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        refetch && refetch();
                        setTimeout(() => {
                            setStillSpin(false);
                        }, 1000);
                    }}
                    colors={[
                        palette.deepBlue,
                        palette.darkForestGreen,
                        palette.oceanSurf,
                    ]}
                    tintColor={palette.deepBlue}
                />
            }
        />
    );
};

export default UserChallenges;
