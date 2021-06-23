import { Text, View } from "react-native";
import { instructionStyles } from "../../../../global_styles/InstructionStyles";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import CoinBox from "../../../../global_building_blocks/coin_box/CoinBox";

export const welcomeContent = (
    <Text style={instructionStyles.instructionText}>
        Welcome to Digitari!{"\n\n"}
        Ready to conquer the platform? Let's get started!
    </Text>
);

export const explainDigitariContent = (
    <Text style={instructionStyles.instructionText}>
        Like other social media, people post content to Digitari, and other
        people like or respond to posts.{"\n\n"}
        However, there's one main thing that makes Digitari unique...
    </Text>
);

export const hypeDigicoinContent = (
    <>
        <Text style={instructionStyles.instructionText}>DIGICOIN!</Text>
        <View style={instructionStyles.centralContentContainer}>
            <CoinBox showAmount={false} coinSize={50} paddingVertical={0} />
        </View>
    </>
);

export const introduceDigicoinContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Digicoin is Digitari's in-game currency. We'll talk about how you
            earn digicoin in a second, but first let's talk about how you use
            it. {"\n\n"}
            Hit "Next," then tap the blue post button on the bottom right side
            of your screen.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <FontAwesome name="pencil" size={35} color={palette.white} />
        </View>
    </>
);

/*
 * New post screens
 */
export const introduceNewPostContent = (
    <Text style={instructionStyles.instructionText}>
        You use digicoin to post on Digitari.{"\n\n"}
        Posting is super easy. You just write a quick message as the post
        content, and you can optionally include an add-on.{"\n\n"}
        Now then, there are two special fields when posting...
    </Text>
);

export const explainTargetContent = (
    <Text style={instructionStyles.instructionText}>
        In the "Target" field, you get to decide who's going to receive your
        post. {"\n\n"}
        You can either send your post to your followers or the members of a
        Community.
    </Text>
);

export const explainRecipientsContent = (
    <Text style={instructionStyles.instructionText}>
        The "Recipients" field is one of the coolest parts of Digitari -- you
        get to choose how many people receive your post! {"\n\n"}
        Posting costs 10 digicoin per recipient, so if you want 10k people to
        see your post, you need 100k digicoin.
    </Text>
);

/*
 * Return to feed
 */
export const earningCoinContent = (
    <Text style={instructionStyles.instructionText}>
        There are a bunch of ways to earn digicoin, but the easiest way is by
        viewing posts.
    </Text>
);

export const explainFeedRewardContent = (
    <Text style={instructionStyles.instructionText}>
        After a couple posts, you'll see a message like the one you see at the
        bottom of your screen.{"\n\n"}
        Press "Next," and then hit "Next posts" to earn the reward after the
        time is up.
    </Text>
);

export const promptOpenWalletContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Ok, now let's collect the digicoin you just earned!{"\n\n"}
            Hit "Next," then tap the wallet icon in the bottom tab bar.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <Entypo name="wallet" size={30} color={palette.white} />
        </View>
    </>
);

/*
 * Wallet
 */
export const explainWalletContent = (
    <Text style={instructionStyles.instructionText}>
        This is your wallet! On this page you'll collect the digicoin you've
        earned.
        {"\n\n"}
        Every time you earn coin, it will show up as a transaction.
    </Text>
);

export const promptCollectContent = (
    <Text style={instructionStyles.instructionText}>
        Hit "Next," then tap "Collect" to collect the digicoin you've earned.
    </Text>
);

export const explainDigicoinUsesContent = (
    <Text style={instructionStyles.instructionText}>
        Great! Now you can use that coin to create posts, like we just talked
        about. {"\n\n"}
        You can also use digicoin to like and respond to posts.
    </Text>
);

export const backToFeedContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Let's go back to your feed!{"\n\n"}
            Hit "Next," then tap the home icon in the bottom tab bar.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <Entypo name="home" size={30} color={palette.white} />
        </View>
    </>
);

/*
 * First profile screens
 */
export const profileDescriptionContent = (
    <Text style={instructionStyles.instructionText}>
        Here's your profile on Digitari! {"\n\n"}On this page, you can set your
        profile pic and your bio, and you can review your activity on Digitari.
    </Text>
);

export const openTierPromptContent = (
    <Text style={instructionStyles.instructionText}>
        You might have noticed the 🙂 by your name. This is your tier! {"\n\n"}
        This is the same emoji that you saw on all the posts.
        {"\n\n"}
        We'll talk more about tiers and rankings in a bit, but for now, hit
        "Next," then tap on the 🙂 to see all the tiers.
    </Text>
);

export const explainRankingTierContent = (
    <Text style={instructionStyles.instructionText}>
        Your ranking increases when you have successful Convos and decreases if
        your messages are blocked.{"\n\n"}
        Your ranking then qualifies you for different tiers, like 🙂 or 😎.
    </Text>
);

export const rankingTier2Content = (
    <Text style={instructionStyles.instructionText}>
        Not only does your tier show other users whether you're nice or mean,
        but having a higher ranking and tier helps other users see and respond
        to your Convos.{"\n\n"}
        Basically, it'll really help you to increase your ranking and tier!
    </Text>
);

export const almostFinishedContent = (
    <Text style={instructionStyles.instructionText}>
        Alright, we're almost finished! Before you start using Digitari, there
        are two more things you should know.
    </Text>
);

export const explainChallengesContent = (
    <Text style={instructionStyles.instructionText}>
        Here are challenges for you to complete!{"\n\n"}Completing challenges is
        a great way to make some extra coin, especially when you're starting
        out.
    </Text>
);

export const explainInvitesContent = (
    <Text style={instructionStyles.instructionText}>
        See "+Invite" at the very top left of your screen? That allows you to
        invite your friends to join Digitari!{"\n\n"}
        When someone you invite creates an account, you earn 500 digicoin!
        {"\n\n"}
        Inviting your friends is probably the easiest way to make a bunch of
        coin when you're just starting out.
    </Text>
);

export const lastRemarksContent = (
    <Text style={instructionStyles.instructionText}>
        Alright, you're ready to rock 'n roll!{"\n\n"}
        If you ever want to see this tutorial again, you can open it in your
        settings.{"\n\n"}
        Have fun!!
    </Text>
);

/*
 * Feed screens
 */
export const likeFirstPostContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Looks like Zariah just joined the platform and is introducing
            herself! Let's like Zariah's post to welcome her to Digitari!
            {"\n\n"}
            Hit "Next," then tap the coin icon under 🙂 to like her post.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <CoinBox
                showAmount={false}
                active={false}
                coinSize={35}
                paddingVertical={0}
            />
        </View>
    </>
);

export const explainDigicoinLikeContent = (
    <Text style={instructionStyles.instructionText}>
        As you might have noticed, liking a post automatically sends the post
        creator 10 of your digicoin.{"\n\n"}
        Because you receive digicoin when people like your posts, you can earn a
        ton of digicoin if people enjoy your content!
    </Text>
);

export const explainCustomLikeContent = (
    <Text style={instructionStyles.instructionText}>
        You can also send a post a custom amount of digicoin with a like!
        {"\n\n"}
        To send a custom like, all you do is tap and hold on the coin icon.
    </Text>
);

export const customLikePostContent = (
    <Text style={instructionStyles.instructionText}>
        Bennet's doge meme is pretty cute! To show him our appreciation, let's
        send him a custom like with 100 digicoin.{"\n\n"}
        Hit "Next," then tap and hold the coin on Bennet's post.{"\n\n"}
        In the pop-up, enter "100" for "Amount" and press "Like."
    </Text>
);

export const explainResponseContent = (
    <Text style={instructionStyles.instructionText}>
        Bennet's making a lot of dough!{"\n\n"}
        If you'd like, you can also respond to a post and chat with the post
        creator. {"\n\n"}
        Sending a response to a post costs digicoin, but if your convo goes
        well, you get a reward!
    </Text>
);

export const respondToPostContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            How 'bout we say hi to Zariah?{"\n\n"}
            To respond to Zariah's post, hit "Next" and then tap the light blue
            button on the bottom right side of her post.{"\n\n"}
            Hit "Ok" in the pop-up that appears.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <Entypo name="pencil" size={30} color={palette.white} />
        </View>
    </>
);

/*
 * New response screens
 */
export const explainIdentityContent = (
    <Text style={instructionStyles.instructionText}>
        When you respond to a post, you can respond anonymously or as yourself.{" "}
        {"\n\n"}
        For right now, let's respond non-anonymously so Zariah knows who she's
        talking to.
    </Text>
);

export const promptResponseMessageContent = (
    <Text style={instructionStyles.instructionText}>
        Hit "Next," then say hi to Zariah and ask her what she likes about
        Surfer's Paradise.
        {"\n\n"}
        After doing so, send the message!
    </Text>
);

/*
 * First convo screens
 */
export const introduceConvoContent = (
    <Text style={instructionStyles.instructionText}>
        This is a Digitari convo! {"\n\n"}
        Convos allow you to respond to posts and connect with post creators!
        {"\n\n"}
        You can think of a Digitari convo as a mini text conversation between
        you and the post creator.
    </Text>
);

export const explainConvoContent = (
    <Text style={instructionStyles.instructionText}>
        Internet comments sections can be very disorganized and toxic, so
        Digitari replaces comments with Convos!
        {"\n\n"}
        Like a comments section, all Convos associated with a post are visible
        to anyone on the platform and can be viewed by opening a post.
        {"\n\n"}
        However, Convos only become visible if the post creator responds to the
        Convo.
    </Text>
);

export const promptReplyContent = (
    <Text style={instructionStyles.instructionText}>
        Looks like Zariah just responded! {"\n\n"}
        Hit "Next," then answer her question and tell her whether you like
        beaches.
    </Text>
);

export const explainFinishContent = (
    <Text style={instructionStyles.instructionText}>
        After the post creator has sent two messages in a Convo, you have the
        opportunity to finish the Convo.{"\n\n"}
        When you finish a Convo, you earn the Convo reward!
    </Text>
);

export const promptFinishContent = (
    <Text style={instructionStyles.instructionText}>
        It seems like a good time to finish your Convo with Zariah!
        {"\n\n"}
        Hit "Next" and then tap the "Finish Convo" button at the end of the
        Convo.
        {"\n\n"}
        Then press "Finish" in the pop-up that appears.
    </Text>
);

export const explainSuccessContent = (
    <Text style={instructionStyles.instructionText}>
        Congratulations! You finished your first Convo!
        {"\n\n"}
        Once a Convo is finished, you can't send any more messages, so make sure
        the Convo has reached a good stopping point before you Finish it!
    </Text>
);
