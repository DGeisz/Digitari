import { Text, View } from "react-native";
import { instructionStyles } from "../../../../global_styles/InstructionStyles";
import React from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import CoinBox from "../../../../global_building_blocks/coin_box/CoinBox";

/*
 * First profile screens
 */
export const welcomeContent = (
    <Text style={instructionStyles.instructionText}>
        Welcome to Digitari!{"\n\n"}Ready to gain a massive following, connect
        with fascinating people, or just find some top-notch content? Let's get
        started!
    </Text>
);

export const profileDescriptionContent = (
    <Text style={instructionStyles.instructionText}>
        Here's your profile on Digitari! {"\n\n"}On this page, you can set your
        profile pic and your bio, and you can review your activity on Digitari.
    </Text>
);

export const openTierPromptContent = (
    <Text style={instructionStyles.instructionText}>
        You might have noticed the 🙂 by your name. This is your tier! {"\n\n"}
        There are 10 different tiers, and you can increase your tier by having
        good interactions with other people.{"\n\n"}We'll talk more about tiers
        and rankings in a bit, but for for now hit "Next" and then tap on the 🙂
        to see all the tiers.
    </Text>
);

export const openWalletPromptContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Don't worry about tier info (like tier wage) for now, just remember
            that the different emojis like 😎, 😍, and 😇 correspond to
            different tiers. {"\n\n"}Alright, let's actually do some stuff! Hit
            "Next," and then tap the wallet icon at the bottom of the screen.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <Entypo name="wallet" size={30} color={palette.white} />
        </View>
    </>
);

/*
 * First Wallet screens
 */
export const explainDigicoinContent = (
    <Text style={instructionStyles.instructionText}>
        This is your wallet where you'll collect the digicoin you've earned!
        {"\n\n"}Digicoin is Digitari's in-game currency, and you'll use it to
        create, like, and respond to posts.
        {"\n\n"}
        You earn digicoin when other people like and respond to your posts.
    </Text>
);

export const explainTierWageContent = (
    <Text style={instructionStyles.instructionText}>
        Your account also naturally generates a certain amount of digicoin per
        day called your "Tier Wage."{"\n\n"}Higher tiers like 😎 or 😍 make a
        higher Tier Wage than lower tiers like 🙁 or 👿, so always try to
        improve your tier!
    </Text>
);

export const collectTierWageContent = (
    <Text style={instructionStyles.instructionText}>
        Alright, let's collect your earnings so you can create some content!
        {"\n\n"}
        Hit "Next," then tap on the "Collect" button.
    </Text>
);

export const newPostPromptContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Awesome! Now let's use that digicoin to create a post!
            {"\n\n"}
            Hit "Next" and then tap the blue post button on the bottom right
            side of your screen.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <FontAwesome name="pencil" size={35} color={palette.white} />
        </View>
    </>
);

/*
 * New post screens
 */
export const newPostContentContent = (
    <Text style={instructionStyles.instructionText}>
        When you create a post, first you input the post's main content, and
        then you can optionally include an add-on (text, image, or link).{" "}
        {"\n\n"}
        For this post's content, introduce yourself and write out your favorite
        place on earth. We'll leave "Add-on" as "None" for now.{"\n\n"}
        (This post is just for the tutorial and won't actually go online)
    </Text>
);

export const newPostTargetContent = (
    <Text style={instructionStyles.instructionText}>
        In Digitari, you get to decide who's going to receive your post in their
        main feed by choosing "Target."{"\n\n"}
        You can either send your post to your followers or members of a
        Community.{"\n\n"}
        You don't have followers yet, so we selected the "New members" Community
        as your post target.
    </Text>
);

export const newPostRecipientsContent = (
    <Text style={instructionStyles.instructionText}>
        Finally, you get to choose how many people are going to receive your
        post by entering "Recipients." Pretty neat, huh?
        {"\n\n"}
        Posting costs 10 digicoin per recipient, so if you want more people to
        see your content, you need to earn more digicoin!
        {"\n\n"}
        Hit next, and enter "20" into the "Recipients" field.
    </Text>
);

export const postFinishedContent = (
    <Text style={instructionStyles.instructionText}>
        Alright, we're finally ready to post this content! (Again, this is just
        for the tutorial, and nothing will go online).
        {"\n\n"}
        Hit "Next", and then tap the "Post" button at the bottom of the screen!
    </Text>
);

/*
 * Return to wallet from new post,
 * let's go to feed
 */
export const openFeedPromptContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Way to go! You just created a post!{"\n\n"}
            While we wait for people to react to your post, let's see if you've
            received any new posts in your main feed.{"\n\n"}
            Hit "Next," and then tap the home icon at the bottom left side of
            your screen.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <Entypo name="home" size={30} color={palette.white} />
        </View>
    </>
);

/*
 * Feed screens
 */
export const introduceFeedContent = (
    <Text style={instructionStyles.instructionText}>
        Here's your feed on Digitari!{"\n\n"}
        This is where you'll receive posts from people or Communities you
        follow.
    </Text>
);

export const likeFirstPostContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Looks like Zariah just joined the platform and is introducing
            herself! Let's like Zariah's post to welcome her to the platform!
            {"\n\n"}
            To like her post, tap the coin icon underneath her tier emoji 🙂.
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
        ton digicoin if people enjoy your content!
    </Text>
);

export const explainCustomLikeContent = (
    <Text style={instructionStyles.instructionText}>
        You can also send a post a custom amount of digicoin with a like!
        {"\n\n"}
        To send a custom like, simply tap and hold on the coin icon.
    </Text>
);

export const customLikePostContent = (
    <Text style={instructionStyles.instructionText}>
        Bennet's doge meme is pretty cute! To show him our appreciation, let's
        send him a custom like with 100 digicoin.{"\n\n"}
        Tap and hold the coin underneath Bennet's tier emoji 😃, enter "100" for
        "Amount" in the pop-up, and press "Like."
    </Text>
);

export const explainResponseContent = (
    <Text style={instructionStyles.instructionText}>
        Bennet's making a lot of dough!{"\n\n"}
        If you want to, you can also respond to a post and chat with the post
        creator! {"\n\n"}
        Sending a response to a post costs digicoin, but if your convo goes
        well, you get a digicoin reward and you can improve your tier!
    </Text>
);

export const respondToPostContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            How 'bout we say hi to Zariah?{"\n\n"}
            To respond to Zariah's post, tap the light blue button on the bottom
            right side of her post and hit "Ok" in the pop-up that appears.
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
        In the message input at the bottom of the screen, say hi to Zariah and
        ask her what she likes about Surfer's Paradise.
        {"\n\n"}
        After doing so, send the message!
    </Text>
);

/*
 * Feed post convo
 */
export const promptReturnToWalletContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Woah, did you see that! It looks like you just received some
            Digicoin! {"\n\n"}
            Tap the wallet icon in the bottom bar collect your earnings!
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <Entypo name="wallet" size={30} color={palette.white} />
        </View>
    </>
);

/*
 * Back to wallet, collect transactions
 */
export const explainTransactionsContent = (
    <Text style={instructionStyles.instructionText}>
        Wow, looks like you made a ton of digicoin off transactions!
        {"\n\n"}
        Transactions are like notifications that contain digicoin for you to
        collect.{"\n\n"}
        Tap the "Collect" button to collect your earnings.
    </Text>
);

export const closerLookAtTransactionsContent = (
    <Text style={instructionStyles.instructionText}>
        Alright, now that you've collected your earnings, let's take a closer
        look at your transactions.
    </Text>
);

export const convoFinishedTransactionsContent = (
    <Text style={instructionStyles.instructionText}>
        Your reward for your successful Convo with Zariah is at the bottom of
        the list.{"\n\n"}
        Again, you'll receive a reward for every successful Convo you start with
        a post creator.
    </Text>
);

export const likeTransactionsContent = (
    <Text style={instructionStyles.instructionText}>
        If you look above your Convo reward, you'll see that your post has
        received some likes!{"\n\n"}
        Whenever your posts get liked, you receive digicoin through
        transactions.
    </Text>
);

export const newResponseTransactionsContent = (
    <Text style={instructionStyles.instructionText}>
        Finally, at the top of the list of transactions, it looks like your post
        has received some responses! {"\n\n"}
        In other words, people are trying to start Convos with you about your
        post!
    </Text>
);

export const promptOpenConvosContent = (
    <>
        <Text style={instructionStyles.instructionText}>
            Let's actually look at these new responses. {"\n\n"}
            Tap the Convo icon in the tab bar at the bottom of the screen.
        </Text>
        <View style={instructionStyles.centralContentContainer}>
            <Ionicons
                name={"ios-chatbubbles"}
                size={30}
                color={palette.white}
            />
        </View>
    </>
);
