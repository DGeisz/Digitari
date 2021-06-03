import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./NewPostStyles";
import {
    COST_PER_RECIPIENT,
    POST_ADD_ON_CONTENT_MAX_LEN,
    POST_CONTENT_MAX_LEN,
    PostAddOn,
    PostTarget,
} from "../../../../../../global_types/PostTypes";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../../../global_styles/Palette";
import { useAuthKeyboardBuffer } from "../../../../../auth/building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import {
    GET_POST_COMMUNITY,
    GET_SELF,
    GetPostCommunityData,
    GetPostCommunityVariables,
    GetSelfData,
    GetSelfVariables,
} from "./gql/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { localUid } from "../../../../../../global_state/UserState";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";
import {
    NewPostNavProp,
    NewPostRouteProp,
} from "../../../../MainEntryNavTypes";
import SelectCommunityModal from "./building_blocks/select_community_modal/SelectCommunityModal";
import {
    CREATE_POST,
    CreatePostData,
    CreatePostVariables,
} from "./gql/Mutations";
import { cache } from "../../../../../../global_state/Cache";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import InfoModal from "./building_blocks/info_modal/InfoModal";
import LinkPreview from "../../../../../../global_building_blocks/link_preview/LinkPreview";
import { challengeCheck } from "../../../../../../global_gql/challenge_check/challenge_check";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../context/tutorial_context/TutorialContext";
import { tutorialUser } from "../../../../routes/tab_nav/screens/profile/data/tutorial_user/tutorial_user";
import { tutorialCommunity } from "./data/tutorial_community/tutorial_community";

interface Props {
    navigation: NewPostNavProp;
    route: NewPostRouteProp;
}

const NewPost: React.FC<Props> = (props) => {
    const scrollRef = useRef<ScrollView>(null);

    /*
     * Content
     */
    const [content, setContent] = useState<string>("");
    const contentRef = useRef<TextInput>(null);

    /*
     * Add on
     */
    const [addOn, setAddOn] = useState<PostAddOn>(PostAddOn.None);
    const [addOnText, setAddOnText] = useState<string>("");
    const [addOnLink, setAddOnLink] = useState<string>("");

    /*
     * For image
     */
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [img, setImg] = useState<File | null>(null);

    const selectImage = async () => {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status === "granted") {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });

            if (!result.cancelled) {
                const blob = await (await fetch(result.uri)).blob();
                const typeSplit = blob.type.split("/");

                if (typeSplit.length === 2 && typeSplit[0] === "image") {
                    let file = new File([blob], `post.${typeSplit[1]}`);

                    setImgUrl(result.uri);
                    setImg(file);
                }
            }
        }
    };

    /*
     * Target
     */
    const [target, setTarget] = useState<PostTarget>(PostTarget.MyFollowers);
    const [recipients, setRecipients] = useState<number>(0);
    const recipientsRef = useRef<TextInput>(null);

    const uid = localUid();

    const { data, loading, error, refetch } = useQuery<
        GetSelfData,
        GetSelfVariables
    >(GET_SELF, {
        variables: {
            uid,
        },
    });

    const [selectComVisible, showSelectCom] = useState<boolean>(false);

    const [getPostCommunity, { data: postCommData }] = useLazyQuery<
        GetPostCommunityData,
        GetPostCommunityVariables
    >(GET_POST_COMMUNITY);

    useEffect(() => {
        if (!!props.route.params.cmid) {
            const id = props.route.params.cmid;

            getPostCommunity({ variables: { id } });
            setTarget(PostTarget.Community);
        }
    }, [props.route.params.cmid]);

    /*
     * Completing the post
     */
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [createPost, { loading: postLoading }] = useMutation<
        CreatePostData,
        CreatePostVariables
    >(CREATE_POST, {
        update(_, { data }) {
            if (!!data?.createPost && !!data.createPost.presignedUrl && !!img) {
                (async () => {
                    /*
                     * We'll try to add the picture 10 times
                     */
                    for (let i = 0; i < 10; i++) {
                        try {
                            await fetch(
                                data.createPost.presignedUrl as string,
                                {
                                    method: "PUT",
                                    body: img,
                                }
                            );

                            console.log("Image put successful treeya!");
                            break;
                        } catch (_) {
                            /*
                             * Wait a second between each attempt
                             */
                            await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                            );
                        }
                    }
                })();
            }

            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    coin(existing) {
                        return Math.max(
                            existing - COST_PER_RECIPIENT * recipients,
                            0
                        );
                    },
                    coinSpent(existing) {
                        return existing + COST_PER_RECIPIENT * recipients;
                    },
                    postCount(existing) {
                        return existing + 1;
                    },
                },
            });

            challengeCheck(cache);
        },
    });

    const post = async () => {
        if (tutorialActive) {
            if (tutorialScreen === TutorialScreen.TapPost) {
                advanceTutorial();
                setTimeout(props.navigation.goBack, 200);
            }

            return;
        }

        if (!content) {
            setErrorMessage("Enter post content " + content);
            return;
        }

        /*
         * Handle add on errors
         */
        if (addOn === PostAddOn.Text && !addOnText) {
            setErrorMessage("Enter post additional content");
            return;
        }

        if (addOn === PostAddOn.Link && !addOnLink) {
            setErrorMessage("Enter post link");
            return;
        }

        if (addOn === PostAddOn.Image && (!imgUrl || !img)) {
            setErrorMessage("Select post image");
            return;
        }

        /*
         * Coin check
         */
        if (!data?.user) {
            setErrorMessage("An error occurred, please try again");
            return;
        }

        if (data.user.coin < COST_PER_RECIPIENT * recipients) {
            setErrorMessage(`You only have ${toCommaRep(data.user.coin)} coin`);
            return;
        }

        /*
         * Target followers check
         */
        if (recipients === 0) {
            setErrorMessage("Post to at least one recipient");
            return;
        }

        if (
            target === PostTarget.MyFollowers &&
            recipients > data.user.followers
        ) {
            setErrorMessage(
                `You can only post to ${toCommaRep(
                    data.user.followers
                )} followers`
            );
            return;
        }

        if (target === PostTarget.Community && !postCommData?.community) {
            setErrorMessage("Please select a community");
            return;
        }

        if (
            target === PostTarget.Community &&
            postCommData?.community &&
            postCommData.community.followers < recipients
        ) {
            setErrorMessage(
                `You can only post to ${toCommaRep(
                    postCommData.community.followers
                )} followers`
            );
            return;
        }

        setErrorMessage("");

        let addOnContent = "";

        switch (addOn) {
            case PostAddOn.Image:
                if (!!img?.name) {
                    addOnContent = img.name;
                }
                break;
            case PostAddOn.Link:
                addOnContent = addOnLink;
                break;
            case PostAddOn.Text:
                addOnContent = addOnText;
                break;
        }

        await createPost({
            variables: {
                content,
                addOn,
                addOnContent,
                target,
                cmid:
                    target === PostTarget.Community
                        ? postCommData?.community.id
                        : undefined,
                recipients,
            },
        });

        props.navigation.goBack();
    };

    /*
     * Structure
     */
    const bufferHeight = useAuthKeyboardBuffer();

    /*
     * Tutorial
     */
    const { tutorialActive, tutorialScreen, advanceTutorial } = useContext(
        TutorialContext
    );

    useEffect(() => {
        if (tutorialActive) {
            setTarget(PostTarget.Community);

            if (tutorialScreen === TutorialScreen.InputPostContent) {
                setTimeout(() => {
                    !!contentRef.current && contentRef.current.focus();
                }, 700);
            } else if (tutorialScreen === TutorialScreen.InputPostRecipients) {
                setTimeout(() => {
                    !!recipientsRef.current && recipientsRef.current.focus();
                }, 700);
            }
        } else {
            !!contentRef.current && contentRef.current.focus();
        }

        const callback = (e: any) => {
            if (tutorialActive) {
                if (tutorialScreen !== TutorialScreen.OpenFeedPrompt) {
                    e.preventDefault();
                }
            }
        };

        props.navigation.addListener("beforeRemove", callback);

        return () => {
            props.navigation.removeListener("beforeRemove", callback);
        };
    }, [tutorialActive, tutorialScreen]);

    if (!tutorialActive && loading && !data?.user) {
        return <LoadingWheel />;
    }

    if (!tutorialActive && error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const user = tutorialActive ? tutorialUser : data?.user;
    const community = tutorialActive
        ? tutorialCommunity
        : postCommData?.community;

    if (!!user) {
        return (
            <>
                <InstructionsModal
                    goBack={() => {
                        setTimeout(() => props.navigation.goBack(), 500);
                    }}
                />
                <ScrollView style={styles.newPostContainer} ref={scrollRef}>
                    <View style={styles.postFieldContainer}>
                        <Text style={styles.fieldTitle}>Post</Text>
                        <TextInput
                            ref={contentRef}
                            editable={
                                !(
                                    tutorialActive &&
                                    tutorialScreen !==
                                        TutorialScreen.InputPostContent
                                )
                            }
                            onBlur={() => {
                                if (tutorialActive && content.length > 10) {
                                    advanceTutorial();
                                }
                            }}
                            keyboardType="twitter"
                            style={styles.contentInput}
                            placeholder="Content..."
                            multiline
                            onChangeText={(text) => {
                                setContent(
                                    text
                                        .replace(/\r?\n|\r/g, "")
                                        .substring(0, POST_CONTENT_MAX_LEN)
                                );
                            }}
                            value={content}
                        />
                        <Text style={styles.remainingText}>
                            {POST_CONTENT_MAX_LEN - content.length}
                        </Text>
                    </View>
                    <View style={styles.postFieldContainer}>
                        <Text style={styles.fieldTitle}>Add-on</Text>
                        <View style={styles.postOptionBar}>
                            <TouchableOpacity
                                style={
                                    addOn === PostAddOn.None
                                        ? styles.activeOption
                                        : styles.inactiveOption
                                }
                                onPress={() =>
                                    !tutorialActive && setAddOn(PostAddOn.None)
                                }
                            >
                                <Text
                                    style={
                                        addOn === PostAddOn.None
                                            ? styles.activeOptionText
                                            : styles.inactiveOptionText
                                    }
                                >
                                    None
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    addOn === PostAddOn.Text
                                        ? styles.activeOption
                                        : styles.inactiveOption
                                }
                                onPress={() =>
                                    !tutorialActive && setAddOn(PostAddOn.Text)
                                }
                            >
                                <Text
                                    style={
                                        addOn === PostAddOn.Text
                                            ? styles.activeOptionText
                                            : styles.inactiveOptionText
                                    }
                                >
                                    Text
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    addOn === PostAddOn.Image
                                        ? styles.activeOption
                                        : styles.inactiveOption
                                }
                                onPress={() =>
                                    !tutorialActive && setAddOn(PostAddOn.Image)
                                }
                            >
                                <Text
                                    style={
                                        addOn === PostAddOn.Image
                                            ? styles.activeOptionText
                                            : styles.inactiveOptionText
                                    }
                                >
                                    Image
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    addOn === PostAddOn.Link
                                        ? styles.activeOption
                                        : styles.inactiveOption
                                }
                                onPress={() =>
                                    !tutorialActive && setAddOn(PostAddOn.Link)
                                }
                            >
                                <Text
                                    style={
                                        addOn === PostAddOn.Link
                                            ? styles.activeOptionText
                                            : styles.inactiveOptionText
                                    }
                                >
                                    Link
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {addOn === PostAddOn.Text ? (
                            <>
                                <TextInput
                                    style={styles.addOnInput}
                                    placeholder="Additional content..."
                                    multiline
                                    onChangeText={(text) => {
                                        setAddOnText(
                                            text.substring(
                                                0,
                                                POST_ADD_ON_CONTENT_MAX_LEN
                                            )
                                        );
                                    }}
                                    value={addOnText}
                                />
                                {POST_ADD_ON_CONTENT_MAX_LEN - content.length <=
                                    300 && (
                                    <Text style={styles.remainingText}>
                                        {POST_ADD_ON_CONTENT_MAX_LEN -
                                            content.length}
                                    </Text>
                                )}
                            </>
                        ) : addOn === PostAddOn.Link ? (
                            <>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    style={styles.addOnInput}
                                    contextMenuHidden={false}
                                    multiline
                                    placeholder="Paste link..."
                                    onChangeText={(text) => {
                                        setAddOnLink(
                                            text.substring(
                                                0,
                                                POST_ADD_ON_CONTENT_MAX_LEN
                                            )
                                        );
                                    }}
                                    value={addOnLink}
                                />
                                {POST_ADD_ON_CONTENT_MAX_LEN - content.length <=
                                    300 && (
                                    <Text style={styles.remainingText}>
                                        {POST_ADD_ON_CONTENT_MAX_LEN -
                                            content.length}
                                    </Text>
                                )}
                                {!!addOnLink && <LinkPreview url={addOnLink} />}
                            </>
                        ) : (
                            addOn === PostAddOn.Image && (
                                <View style={styles.outerImageContainer}>
                                    <View style={styles.imageContainer}>
                                        {imgUrl === null ? (
                                            <View
                                                style={styles.placeHolderImage}
                                            >
                                                <Feather
                                                    name="camera"
                                                    size={50}
                                                    color={palette.semiSoftGray}
                                                />
                                            </View>
                                        ) : (
                                            <Image
                                                source={{ uri: imgUrl }}
                                                style={styles.image}
                                            />
                                        )}
                                        <TouchableOpacity
                                            style={styles.selectImageButton}
                                            onPress={selectImage}
                                        >
                                            <Text
                                                style={styles.selectImageText}
                                            >
                                                Select image
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        )}
                    </View>
                    <View style={styles.postFieldContainer}>
                        <SelectCommunityModal
                            visible={selectComVisible}
                            onHide={() => showSelectCom(false)}
                            selectCommunity={(id) => {
                                getPostCommunity({ variables: { id } });
                            }}
                        />
                        <View style={styles.fieldTitleContainer}>
                            <Text style={styles.fieldTitle}>Target</Text>
                            <InfoModal
                                title={"Target"}
                                content={
                                    'When you post to Digitari, you can either send your post to your personal followers ("My Followers"), or you ' +
                                    'can send your post to a community of users ("Community").'
                                }
                            />
                        </View>
                        <View style={styles.postOptionBar}>
                            <TouchableOpacity
                                style={
                                    target === PostTarget.MyFollowers
                                        ? styles.activeOption
                                        : styles.inactiveOption
                                }
                                onPress={() => {
                                    !tutorialActive &&
                                        setTarget(PostTarget.MyFollowers);
                                }}
                            >
                                <Text
                                    style={
                                        target === PostTarget.MyFollowers
                                            ? styles.activeOptionText
                                            : styles.inactiveOptionText
                                    }
                                >
                                    My Followers
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    target === PostTarget.Community
                                        ? styles.activeOption
                                        : styles.inactiveOption
                                }
                                onPress={() => setTarget(PostTarget.Community)}
                            >
                                <Text
                                    style={
                                        target === PostTarget.Community
                                            ? styles.activeOptionText
                                            : styles.inactiveOptionText
                                    }
                                >
                                    Community
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {target === PostTarget.MyFollowers ? (
                            <Text style={styles.followersText}>
                                <Text style={styles.followersNumeral}>
                                    {toCommaRep(user.followers) + " "}
                                </Text>
                                {user.followers === 1
                                    ? "Follower"
                                    : "Followers"}
                            </Text>
                        ) : (
                            <>
                                <TouchableOpacity
                                    style={styles.communityContainer}
                                    onPress={() => showSelectCom(true)}
                                >
                                    {!community ? (
                                        <Text
                                            style={styles.selectCommunityText}
                                        >
                                            Select Community
                                        </Text>
                                    ) : (
                                        <>
                                            <Text style={styles.communityText}>
                                                {community.name}
                                            </Text>
                                            <Text
                                                style={styles.commFollowersText}
                                            >
                                                <Text
                                                    style={
                                                        styles.commFollowerNumeral
                                                    }
                                                >
                                                    {toCommaRep(
                                                        community.followers
                                                    ) + " "}
                                                </Text>
                                                {community.followers === 1
                                                    ? "Follower"
                                                    : "Followers"}
                                            </Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.createCommunityButton}
                                    onPress={() =>
                                        !tutorialActive &&
                                        props.navigation.navigate(
                                            "NewCommunity"
                                        )
                                    }
                                >
                                    <Text style={styles.createCommunityText}>
                                        + Create Community
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                    <View style={styles.postFieldContainer}>
                        <View style={styles.fieldTitleContainer}>
                            <Text style={styles.fieldTitle}>Recipients</Text>
                            <InfoModal
                                title={"Recipients"}
                                content={
                                    "This is the number of users who will receive this post in their main feed. " +
                                    `\n\nEach post costs ${toCommaRep(
                                        COST_PER_RECIPIENT
                                    )} digicoin per recipient.` +
                                    '\n\nFor example, if you specify "My Followers" for Target and set recipients to 8, this post will go to 8 of your followers' +
                                    " and cost you 80 digicoin."
                                }
                            />
                        </View>
                        <TextInput
                            ref={recipientsRef}
                            style={styles.recipientsInput}
                            editable={
                                !(
                                    tutorialActive &&
                                    tutorialScreen !==
                                        TutorialScreen.InputPostRecipients
                                )
                            }
                            placeholder="Recipients..."
                            onFocus={() =>
                                setTimeout(() => {
                                    !!scrollRef?.current &&
                                        scrollRef.current.scrollToEnd();
                                }, 100)
                            }
                            onBlur={() => {
                                if (tutorialActive) {
                                    setRecipients(20);
                                    advanceTutorial();
                                }
                            }}
                            keyboardType="numeric"
                            onChangeText={(raw) => {
                                const noCommas = raw.replace(/,/g, "");
                                const num = parseInt(noCommas);

                                if (isNaN(num)) {
                                    setRecipients(0);
                                } else {
                                    setRecipients(num);
                                }
                            }}
                            value={!!recipients ? toCommaRep(recipients) : ""}
                        />
                    </View>
                    <View style={styles.postFooter}>
                        {!!errorMessage && (
                            <Text style={styles.postErrorMessage}>
                                {errorMessage}
                            </Text>
                        )}
                        {postLoading ? (
                            <LoadingWheel />
                        ) : (
                            <TouchableOpacity
                                style={styles.postButton}
                                onPress={post}
                            >
                                <View style={styles.postButtonTextContainer}>
                                    <Text style={styles.postButtonText}>
                                        Post
                                    </Text>
                                </View>
                                <CoinBox
                                    amount={COST_PER_RECIPIENT * recipients}
                                    fontColor={palette.hardGray}
                                    fontSize={20}
                                    coinSize={25}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ height: bufferHeight }} />
                </ScrollView>
            </>
        );
    } else {
        /*TODO: Make this better*/

        return null;
    }
};

export default NewPost;
