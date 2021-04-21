import React, { useEffect, useRef, useState } from "react";
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
import { useLazyQuery, useQuery } from "@apollo/client";
import { localUid } from "../../../../../../global_state/UserState";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";
import {
    NewPostNavProp,
    NewPostRouteProp,
} from "../../../../MainEntryNavTypes";
import SelectCommunityModal from "./building_blocks/select_community_modal/SelectCommunityModal";

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

    useEffect(() => {
        // contentRef.current && contentRef.current.focus();
    }, []);

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
                    let file = new File([blob], `p.${typeSplit[1]}`);
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
    const [targetComId, setTargetComId] = useState<string>("");

    const [getPostCommunity, { data: postCommData }] = useLazyQuery<
        GetPostCommunityData,
        GetPostCommunityVariables
    >(GET_POST_COMMUNITY);

    useEffect(() => {
        if (!!props.route.params.cmid) {
            const id = props.route.params.cmid;

            getPostCommunity({ variables: { id } });
            setTargetComId(id);
        }
    }, [props.route.params.cmid]);

    /*
     * Completing the post
     */
    const [errorMessage, setErrorMessage] = useState<string>("");

    const post = () => {
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

        if (data.user.coin < recipients) {
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
    };

    /*
     * Structure
     */
    const bufferHeight = useAuthKeyboardBuffer();

    if (loading || !data?.user) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <ScrollView style={styles.newPostContainer} ref={scrollRef}>
            <View style={styles.postFieldContainer}>
                <Text style={styles.fieldTitle}>Post</Text>
                <TextInput
                    ref={contentRef}
                    style={styles.contentInput}
                    placeholder="Content..."
                    multiline
                    onChangeText={(text) => {
                        setContent(text.substring(0, POST_CONTENT_MAX_LEN));
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
                        onPress={() => setAddOn(PostAddOn.Image)}
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
                        {POST_ADD_ON_CONTENT_MAX_LEN - content.length <=
                            300 && (
                            <Text style={styles.remainingText}>
                                {POST_ADD_ON_CONTENT_MAX_LEN - content.length}
                            </Text>
                        )}
                    </>
                ) : addOn === PostAddOn.Link ? (
                    <>
                        <TextInput
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
                                {POST_ADD_ON_CONTENT_MAX_LEN - content.length}
                            </Text>
                        )}
                    </>
                ) : (
                    addOn === PostAddOn.Image && (
                        <View style={styles.outerImageContainer}>
                            <View style={styles.imageContainer}>
                                {imgUrl === null ? (
                                    <View style={styles.placeHolderImage}>
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
                                    <Text style={styles.selectImageText}>
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
                        setTargetComId(id);
                    }}
                />
                <Text style={styles.fieldTitle}>Target</Text>
                <View style={styles.postOptionBar}>
                    <TouchableOpacity
                        style={
                            target === PostTarget.MyFollowers
                                ? styles.activeOption
                                : styles.inactiveOption
                        }
                        onPress={() => setTarget(PostTarget.MyFollowers)}
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
                            {toCommaRep(data.user.followers) + " "}
                        </Text>
                        {data.user.followers === 1 ? "Follower" : "Followers"}
                    </Text>
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.communityContainer}
                            onPress={() => showSelectCom(true)}
                        >
                            {!postCommData?.community ? (
                                <Text style={styles.selectCommunityText}>
                                    Select Community
                                </Text>
                            ) : (
                                <>
                                    <Text style={styles.communityText}>
                                        {postCommData.community.name}
                                    </Text>
                                    <Text style={styles.commFollowersText}>
                                        <Text
                                            style={styles.commFollowerNumeral}
                                        >
                                            {toCommaRep(
                                                postCommData.community.followers
                                            ) + " "}
                                        </Text>
                                        {postCommData.community.followers === 1
                                            ? "Follower"
                                            : "Followers"}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.createCommunityButton}
                            onPress={() =>
                                props.navigation.navigate("NewCommunity")
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
                <Text style={styles.fieldTitle}>Recipients</Text>
                <TextInput
                    style={styles.recipientsInput}
                    placeholder="0"
                    onFocus={() =>
                        setTimeout(() => {
                            !!scrollRef?.current &&
                                scrollRef.current.scrollToEnd();
                        }, 100)
                    }
                    keyboardType="numeric"
                    onChangeText={(raw) => {
                        const num = parseInt(raw);

                        if (isNaN(num)) {
                            setRecipients(0);
                        } else {
                            setRecipients(num);
                        }
                    }}
                    value={recipients.toString()}
                />
            </View>
            <View style={styles.postFooter}>
                {!!errorMessage && (
                    <Text style={styles.postErrorMessage}>{errorMessage}</Text>
                )}
                <TouchableOpacity style={styles.postButton} onPress={post}>
                    <View style={styles.postButtonTextContainer}>
                        <Text style={styles.postButtonText}>Post</Text>
                    </View>
                    <CoinBox
                        amount={recipients}
                        fontColor={palette.hardGray}
                        fontSize={20}
                        coinSize={25}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ height: bufferHeight }} />
        </ScrollView>
    );
};

export default NewPost;
