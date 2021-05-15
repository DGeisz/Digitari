import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./OptionsModalStyles";
import Modal from "react-native-modal";
import { BlockedSymbol } from "../../../big_three/BigThree";
import { localUid } from "../../../../global_state/UserState";
import {
    POST_BLOCK_COST,
    POST_TYPENAME,
    PostType,
} from "../../../../global_types/PostTypes";
import CoinBox from "../../../coin_box/CoinBox";
import { useMutation, useQuery } from "@apollo/client";
import { USER_COIN, UserCoinData, UserCoinVariables } from "./gql/Queries";
import {
    BLOCK_POST,
    BlockPostData,
    BlockPostVariables,
    DELETE_POST,
    DeletePostData,
    DeletePostVariables,
} from "./gql/Mutations";
import { QUERY_TYPENAME } from "../../../../global_gql/Schema";
import LoadingWheel from "../../../loading_wheel/LoadingWheel";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";

interface Props {
    post: PostType;
    canBlock: boolean;
    openReport: (pid: string) => void;
}

const OptionsModal: React.FC<Props> = (props) => {
    const uid = localUid();
    const pid = props.post.id;
    const canDelete = uid === props.post.uid;

    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
    const [blockVisible, setBlockVisible] = useState<boolean>(false);
    const [blockError, setBlockError] = useState<string>("");

    const [deleteVisible, setDeleteVisible] = useState<boolean>(false);

    const [blockPostMutation, { loading: blockLoading }] = useMutation<
        BlockPostData,
        BlockPostVariables
    >(BLOCK_POST, {
        optimisticResponse: {
            blockPost: props.post,
        },
        variables: {
            pid,
        },
        update(cache) {
            cache.modify({
                id: cache.identify({
                    __typename: QUERY_TYPENAME,
                }),
                fields: {
                    feed(existing, { readField }) {
                        return existing.filter(
                            (postRef: any) => readField("id", postRef) !== pid
                        );
                    },
                },
            });

            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    blocked(existing) {
                        return existing + 1;
                    },
                    ranking(existing) {
                        return existing - 1;
                    },
                },
            });
        },
    });

    const [deletePostMutation] = useMutation<
        DeletePostData,
        DeletePostVariables
    >(DELETE_POST, {
        variables: {
            pid,
        },
        optimisticResponse: {
            deletePost: true,
        },
        update(cache) {
            cache.evict({
                id: cache.identify({
                    __typename: POST_TYPENAME,
                    id: pid,
                }),
            });
        },
    });

    /*
     * Happy Doge post
{
  "pid": "03e3c333-71bd-4421-a20d-1ea6c30116ec",
  "time": 1620784903896,
  "uid": "ad248e9c-8406-435f-a2ad-97240c9d95ae"
}
     */

    const { data: userData } = useQuery<UserCoinData, UserCoinVariables>(
        USER_COIN,
        {
            variables: {
                uid,
            },
        }
    );

    const userCoin = !!userData?.user ? userData.user.coin : 0;

    const blockPost = () => {
        if (userCoin < POST_BLOCK_COST) {
            setBlockError("You don't have enough coin!");
        } else {
            blockPostMutation().then();
        }
    };

    const deletePost = () => {
        deletePostMutation().then();
    };

    return (
        <>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setOptionsVisible(true)}
            >
                <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color={palette.lightGray}
                />
            </TouchableOpacity>
            {/*
            Main options modal
            */}
            <Modal isVisible={optionsVisible}>
                <View style={styles.modalOuterContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderText}>
                                Post options
                            </Text>
                        </View>
                        {props.canBlock && (
                            <Text style={styles.modalInfoText}>
                                Block posts you don't like, report posts you
                                believe violate Digitari content policies.
                            </Text>
                        )}
                        <View style={styles.optionsContainer}>
                            {props.canBlock && (
                                <TouchableOpacity
                                    style={styles.optionContainer}
                                    onPress={() => {
                                        setOptionsVisible(false);

                                        setTimeout(() => {
                                            setBlockVisible(true);
                                        }, 700);
                                    }}
                                >
                                    <BlockedSymbol size={15} />
                                    <Text style={styles.blockText}>
                                        Block post
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                style={styles.optionContainer}
                                onPress={() => {
                                    setOptionsVisible(false);
                                    props.openReport(pid);
                                }}
                            >
                                <Text style={styles.reportText}>
                                    Report post
                                </Text>
                            </TouchableOpacity>
                            {canDelete && (
                                <TouchableOpacity
                                    style={styles.optionContainer}
                                    onPress={() => {
                                        setOptionsVisible(false);

                                        setTimeout(() => {
                                            setDeleteVisible(true);
                                        }, 700);
                                    }}
                                >
                                    <Text style={styles.deleteText}>
                                        Delete post
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setOptionsVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/*
            Block modal
            */}
            {props.canBlock && (
                <Modal isVisible={blockVisible}>
                    <View style={styles.modalOuterContainer}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text
                                    style={[
                                        styles.modalHeaderText,
                                        { color: palette.warning },
                                    ]}
                                >
                                    Block post
                                </Text>
                            </View>
                            {!!blockError && (
                                <Text style={styles.modalErrorText}>
                                    {blockError}
                                </Text>
                            )}
                            <Text style={styles.modalInfoText}>
                                Blocking this post will remove it from your
                                feed, and also decrease both the poster's
                                ranking and your ranking.
                            </Text>
                            <View style={styles.modalFooter}>
                                {blockLoading ? (
                                    <LoadingWheel />
                                ) : (
                                    <TouchableOpacity
                                        style={styles.blockButton}
                                        onPress={blockPost}
                                    >
                                        <View
                                            style={
                                                styles.blockButtonTextContainer
                                            }
                                        >
                                            <Text
                                                style={styles.blockButtonText}
                                            >
                                                Block
                                            </Text>
                                        </View>
                                        <CoinBox
                                            amount={POST_BLOCK_COST}
                                            showAbbreviated
                                            coinSize={23}
                                            fontSize={15}
                                        />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setBlockVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {/*
            Delete post modal
            */}
            {canDelete && (
                <Modal isVisible={deleteVisible}>
                    <View style={styles.modalOuterContainer}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text
                                    style={[
                                        styles.modalHeaderText,
                                        { color: palette.danger },
                                    ]}
                                >
                                    Delete post
                                </Text>
                            </View>
                            <Text style={styles.modalInfoText}>
                                Are you sure you want to delete this post? All
                                convos associated with this post will also be
                                deleted.
                            </Text>
                            <View style={styles.modalFooter}>
                                <View style={styles.footerBar}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setDeleteVisible(false)}
                                    >
                                        <Text style={styles.closeButtonText}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={deletePost}
                                    >
                                        <Text style={styles.deleteButtonText}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

export default OptionsModal;
