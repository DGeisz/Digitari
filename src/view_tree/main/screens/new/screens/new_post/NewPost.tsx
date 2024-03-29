import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    LayoutAnimation,
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
import { Entypo, Feather } from "@expo/vector-icons";
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
import {
    toCommaRep,
    toRep,
} from "../../../../../../global_utils/ValueRepUtils";
import {
    NewPostNavProp,
    NewPostRouteProp,
} from "../../../../MainEntryNavTypes";
import SelectCommunityModal from "./building_blocks/select_community_modal/SelectCommunityModal";
import {
    CREATE_POST,
    CreatePostData,
    CreatePostVariables,
    DISTRIBUTE_POST,
    DistributePostData,
    DistributePostVariables,
} from "./gql/Mutations";
import { cache } from "../../../../../../global_state/Cache";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import LinkPreview from "../../../../../../global_building_blocks/link_preview/LinkPreview";
import { firstPost } from "../../../../../../global_state/FirstImpressionsState";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import BoltBox from "../../../../../../global_building_blocks/bolt_box/BoltBox";
import FlyingBolt from "../../../../../../global_building_blocks/flying_bolt/FlyingBolt";
import { addBoltTransaction } from "../../../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import {
    TransactionIcon,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";

interface Props {
    navigation: NewPostNavProp;
    route: NewPostRouteProp;
}

const NewPost: React.FC<Props> = (props) => {
    const scrollRef = useRef<ScrollView>(null);

    const [fuse, setFuse] = useState<number>(0);

    /*
     * Instructions
     */
    const [instructionsVisible, showInstructions] = useState<boolean>(
        firstPost()
    );
    const [autoFocus, setAutoFocus] = useState<boolean>(true);

    useEffect(() => {
        if (instructionsVisible) {
            setAutoFocus(false);
        }
    }, []);

    /*
     * Content
     */
    const [content, setContent] = useState<string>("");

    /*
     * Add on
     */
    const [addOnVisible, showAddOn] = useState<boolean>(false);
    const [addOn, setAddOn] = useState<PostAddOn>(PostAddOn.None);
    const [addOnText, setAddOnText] = useState<string>("");
    const [addOnLink, setAddOnLink] = useState<string>("");

    useEffect(() => {
        if (!addOnVisible) {
            setAddOn(PostAddOn.None);
        }
    }, [addOnVisible]);

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
    const [editTarget, setEditTarget] = useState<boolean>(false);
    const [target, setTarget] = useState<PostTarget>(PostTarget.MyFollowers);

    useEffect(() => {
        if (
            !editTarget &&
            target === PostTarget.Community &&
            !postCommData?.community
        ) {
            setTarget(PostTarget.MyFollowers);
        }
    }, [editTarget]);

    const [recipientsVisible, showRecipients] = useState<boolean>(firstPost());
    const [recipients, setRecipients] = useState<number | undefined>(undefined);
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

    const [distributePost] = useMutation<
        DistributePostData,
        DistributePostVariables
    >(DISTRIBUTE_POST);

    const [createPost, { loading: postLoading }] = useMutation<
        CreatePostData,
        CreatePostVariables
    >(CREATE_POST, {
        update(_, { data }) {
            if (!!data?.createPost) {
                /*
                 * Immediately distribute the post
                 */
                distributePost({
                    variables: { pid: data.createPost.post.id },
                    optimisticResponse: { distributePost: true },
                }).then();

                if (!!data.createPost.presignedUrl && !!img) {
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
                            existing = parseInt(existing);

                            if (!!recipients) {
                                return Math.max(
                                    existing - COST_PER_RECIPIENT * recipients,
                                    0
                                ).toString();
                            }

                            return existing.toString();
                        },
                        boltTransTotal(existing) {
                            existing = parseInt(existing);

                            if (!!recipients) {
                                return (existing + recipients).toString();
                            }

                            return existing.toString();
                        },
                        coinSpent(existing) {
                            existing = parseInt(existing);

                            if (!!recipients) {
                                return (
                                    existing +
                                    COST_PER_RECIPIENT * recipients
                                ).toString();
                            }

                            return existing.toString();
                        },
                        postCount(existing) {
                            return existing + 1;
                        },
                    },
                });

                addBoltTransaction(
                    {
                        tid: uid,
                        time: Date.now().toString(),
                        bolts: recipients,
                        message: `You created a post: "${content}"`,
                        transactionType: TransactionTypesEnum.Post,
                        transactionIcon: TransactionIcon.Post,
                        data: data.createPost.post.id,
                    },
                    cache
                );
            }
        },
    });

    const post = async () => {
        if (!content) {
            setErrorMessage("Enter post content " + content);
            return;
        }

        if (typeof recipients === "undefined") {
            setErrorMessage("Enter number of recipients");
            !!recipientsRef.current && recipientsRef.current.focus();
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

        if (parseInt(data.user.coin) < COST_PER_RECIPIENT * recipients) {
            setErrorMessage(
                `You only have ${toCommaRep(parseInt(data.user.coin))} coin`
            );
            return;
        }

        /*
         * Target followers check.  Only allow posting to no-one if it's to
         * followers, and you have zero followers
         */
        if (
            !(
                target === PostTarget.MyFollowers &&
                data.user.followers === 0 &&
                recipients === 0
            ) &&
            recipients < 1
        ) {
            setErrorMessage("Post to at least one recipient");
            return;
        }

        if (recipients > data.user.maxPostRecipients) {
            if (data.user.maxPostRecipients === 1) {
                setErrorMessage("Level up to post to more than one person!");
            } else {
                setErrorMessage(
                    `Level up to post to more than ${toCommaRep(
                        data.user.maxPostRecipients
                    )} people!`
                );
            }

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

        setFuse(1 + Math.random());

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

    if (loading && !data?.user) {
        return <LoadingWheel />;
    }

    if (!!error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const user = data?.user;
    const community = postCommData?.community;

    let shortTarget = "My Followers";
    let shortFollowers = !!data?.user ? data.user.followers : 0;

    if (target === PostTarget.Community && !!community) {
        shortTarget = community.name;
        shortFollowers = community.followers;
    }

    const postReady = !!content && typeof recipients !== "undefined";

    if (!!user) {
        if (user.level === 0) {
            return (
                <View style={styles.newPostContainer}>
                    <Text style={styles.levelUpMessage}>
                        Reach level 1 to create a post!
                    </Text>
                </View>
            );
        }

        return (
            <>
                <InstructionsModal
                    hideModal={() => showInstructions(false)}
                    visible={instructionsVisible}
                />
                <ScrollView style={styles.newPostContainer} ref={scrollRef}>
                    {!editTarget ? (
                        <View style={styles.targetContainer}>
                            <View style={styles.arrowContainer}>
                                <Entypo
                                    name="arrow-right"
                                    size={18}
                                    color={palette.deepBlue}
                                />
                            </View>
                            <View style={styles.targetTextContainer}>
                                <Text style={styles.targetText}>
                                    {shortTarget}
                                    <Text
                                        style={styles.targetFollowersText}
                                    >{` · ${toRep(shortFollowers)} ${
                                        shortFollowers === 1
                                            ? "Follower"
                                            : "Followers"
                                    }`}</Text>
                                </Text>
                            </View>
                            <View style={styles.editTargetContainer}>
                                <TouchableOpacity
                                    style={styles.editTargetButton}
                                    onPress={() => {
                                        LayoutAnimation.easeInEaseOut();
                                        setEditTarget(true);
                                    }}
                                >
                                    <Text style={styles.editTargetText}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.targetSelectorContainer}>
                            <Text style={styles.sendToTitle}>Send to:</Text>
                            <View style={styles.postOptionBar}>
                                <TouchableOpacity
                                    style={
                                        target === PostTarget.MyFollowers
                                            ? styles.activeOption
                                            : styles.inactiveOption
                                    }
                                    onPress={() => {
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
                                    onPress={() =>
                                        setTarget(PostTarget.Community)
                                    }
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
                                                style={
                                                    styles.selectCommunityText
                                                }
                                            >
                                                Select Community
                                            </Text>
                                        ) : (
                                            <>
                                                <Text
                                                    style={styles.communityText}
                                                >
                                                    {community.name}
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.commFollowersText
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.commFollowerNumeral
                                                        }
                                                    >
                                                        {/*TODO Change for screenshots*/}
                                                        {toCommaRep(
                                                            community.followers
                                                        ) + " "}
                                                        {/*{toCommaRep(1326) + " "}*/}
                                                    </Text>
                                                    {community.followers === 1
                                                        ? "Followers"
                                                        : "Followers"}
                                                </Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )}
                    <View style={styles.postContentContainer}>
                        <TextInput
                            keyboardType="twitter"
                            autoFocus={autoFocus}
                            style={styles.contentInput}
                            placeholder="What's on your mind?"
                            multiline
                            onChangeText={(text) => {
                                setErrorMessage("");

                                setContent(
                                    text
                                        .replace(/\r?\n|\r/g, "")
                                        .substring(0, POST_CONTENT_MAX_LEN)
                                );
                            }}
                            value={content}
                            onFocus={() => {
                                if (editTarget) {
                                    LayoutAnimation.easeInEaseOut();
                                    setEditTarget(false);
                                }
                            }}
                            onBlur={() => {
                                if (!!content) {
                                    if (!recipientsVisible) {
                                        LayoutAnimation.easeInEaseOut();
                                        showRecipients(true);
                                    }

                                    !!recipientsRef.current &&
                                        recipientsRef.current.focus();
                                }
                            }}
                        />
                        {POST_CONTENT_MAX_LEN - content.length <= 20 && (
                            <Text style={styles.remainingText}>
                                {POST_CONTENT_MAX_LEN - content.length}
                            </Text>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                LayoutAnimation.easeInEaseOut();
                                showAddOn(!addOnVisible);
                            }}
                            style={[
                                styles.showAddOnButton,
                                addOnVisible ? { marginBottom: 10 } : {},
                            ]}
                        >
                            <Entypo
                                name="plus"
                                size={25}
                                style={
                                    addOnVisible
                                        ? { transform: [{ rotateZ: "45deg" }] }
                                        : {}
                                }
                                color={palette.deepBlue}
                            />
                            {addOnVisible && (
                                <Text style={styles.addOnTitle}>Add-on</Text>
                            )}
                        </TouchableOpacity>
                        {addOnVisible && (
                            <>
                                <View style={styles.postOptionBar}>
                                    <TouchableOpacity
                                        style={
                                            addOn === PostAddOn.None
                                                ? styles.activeOption
                                                : styles.inactiveOption
                                        }
                                        onPress={() => setAddOn(PostAddOn.None)}
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
                                        onPress={() => setAddOn(PostAddOn.Text)}
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
                                            setAddOn(PostAddOn.Image)
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
                                        onPress={() => setAddOn(PostAddOn.Link)}
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
                                        {POST_ADD_ON_CONTENT_MAX_LEN -
                                            content.length <=
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
                                        {POST_ADD_ON_CONTENT_MAX_LEN -
                                            content.length <=
                                            300 && (
                                            <Text style={styles.remainingText}>
                                                {POST_ADD_ON_CONTENT_MAX_LEN -
                                                    content.length}
                                            </Text>
                                        )}
                                        {!!addOnLink && (
                                            <LinkPreview url={addOnLink} />
                                        )}
                                    </>
                                ) : (
                                    addOn === PostAddOn.Image && (
                                        <View
                                            style={styles.outerImageContainer}
                                        >
                                            <View style={styles.imageContainer}>
                                                {imgUrl === null ? (
                                                    <View
                                                        style={
                                                            styles.placeHolderImage
                                                        }
                                                    >
                                                        <Feather
                                                            name="camera"
                                                            size={50}
                                                            color={
                                                                palette.semiSoftGray
                                                            }
                                                        />
                                                    </View>
                                                ) : (
                                                    <Image
                                                        source={{ uri: imgUrl }}
                                                        style={styles.image}
                                                    />
                                                )}
                                                <TouchableOpacity
                                                    style={
                                                        styles.selectImageButton
                                                    }
                                                    onPress={selectImage}
                                                >
                                                    <Text
                                                        style={
                                                            styles.selectImageText
                                                        }
                                                    >
                                                        Select image
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                )}
                            </>
                        )}
                    </View>
                    <View
                        style={
                            recipientsVisible
                                ? styles.recipientsContainer
                                : styles.recipientsHidden
                        }
                    >
                        <TextInput
                            ref={recipientsRef}
                            style={styles.recipientsInput}
                            placeholder="How many people should see this?"
                            onFocus={() => {
                                if (editTarget) {
                                    LayoutAnimation.easeInEaseOut();
                                    setEditTarget(false);
                                }

                                setTimeout(() => {
                                    !!scrollRef?.current &&
                                        scrollRef.current.scrollToEnd();
                                }, 100);
                            }}
                            keyboardType="numeric"
                            multiline
                            onChangeText={(raw) => {
                                setErrorMessage("");

                                const noCommas = raw.replace(/\D/g, "");
                                const num = parseInt(noCommas);

                                if (isNaN(num)) {
                                    setRecipients(undefined);
                                } else {
                                    setRecipients(num);
                                }
                            }}
                            value={
                                typeof recipients === "undefined"
                                    ? ""
                                    : toCommaRep(recipients)
                            }
                        />
                        {!!data?.user && (
                            <Text
                                style={[
                                    styles.maxRecipientsText,
                                    {
                                        color:
                                            !!recipients &&
                                            recipients >
                                                data.user.maxPostRecipients
                                                ? palette.danger
                                                : palette.semiSoftGray,
                                    },
                                ]}
                            >
                                Max: {toCommaRep(data?.user.maxPostRecipients)}
                            </Text>
                        )}
                        <SelectCommunityModal
                            visible={selectComVisible}
                            onHide={() => showSelectCom(false)}
                            selectCommunity={(id) => {
                                getPostCommunity({ variables: { id } });
                            }}
                        />
                    </View>
                    <View
                        style={[
                            styles.postFooter,
                            { opacity: postReady ? 1 : 0.4 },
                        ]}
                    >
                        <View style={styles.flyingBoltContainer}>
                            <FlyingBolt
                                animationHeight={200}
                                amount={!!recipients ? recipients : 0}
                                boltSize={50}
                                fontSize={35}
                                fuse={fuse}
                                paddingRight={5}
                                moveTextRight={8}
                            />
                        </View>
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
                                onPress={() => postReady && post()}
                                activeOpacity={postReady ? 0 : 1}
                            >
                                <View style={styles.postButtonTextContainer}>
                                    <Text style={styles.postButtonText}>
                                        Post
                                    </Text>
                                    <BoltBox
                                        amount={!!recipients ? recipients : 0}
                                        boltSize={22}
                                        showBoltPlus
                                        moveTextRight={2}
                                        paddingRight={8}
                                        boxColor={palette.lightForestGreen}
                                        fontSize={16}
                                    />
                                </View>
                                <CoinBox
                                    amount={
                                        COST_PER_RECIPIENT *
                                        (!!recipients ? recipients : 0)
                                    }
                                    showAbbreviated={false}
                                    showCoinMinus
                                    fontColor={palette.danger}
                                    fontSize={17}
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
        return null;
    }
};

export default NewPost;
