import { Text, View } from "react-native";
import { instructionStyles } from "../../../../global_styles/InstructionStyles";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";

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
