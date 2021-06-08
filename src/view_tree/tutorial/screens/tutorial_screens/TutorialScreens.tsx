import { Text, View } from "react-native";
import { instructionStyles } from "../../../../global_styles/InstructionStyles";
import React from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";

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
