import {
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../../../global_types/TransactionTypes";
import { useContext, useEffect, useState } from "react";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import { getTierWage } from "../../../../../../../../global_types/TierTypes";

export function useTutorialWallet(): {
    accumulation: number;
    tierWage: number;
    dailyWage: number;
    resetCollectTrans: () => void;
    collectTransactions: () => void;
    transactionsCollected: boolean;
    transactions: TransactionType[];
} {
    const { tutorialScreen } = useContext(TutorialContext);

    useEffect(() => {
        if (tutorialScreen === TutorialScreen.Welcome) {
            setTransCollected(false);
        }
    }, [tutorialScreen]);

    const [transactionsCollected, setTransCollected] = useState<boolean>(false);

    const daily = getTierWage(0, "0")[1];

    const collectTransactions = () => setTransCollected(true);
    const resetCollectTrans = () => setTransCollected(false);

    const [time, setTime] = useState<string>("0");

    useEffect(() => {
        setTime(Date.now().toString());
    }, []);

    //
    // if (tutorialScreen < TutorialScreen.NewPostPrompt) {
    //     return {
    //         accumulation: 0,
    //         tierWage: tierWageCollected ? 0 : daily,
    //         dailyWage: daily,
    //         collectTransactions,
    //         resetCollectTrans,
    //         transactionsCollected,
    //         resetCollectTierWage,
    //         collectTierWage,
    //         transactions: [],
    //     };
    // }

    if (tutorialScreen >= TutorialScreen.ExplainWallet) {
        return {
            accumulation: transactionsCollected ? 0 : 80,
            tierWage: 0,
            dailyWage: daily,
            transactionsCollected,
            collectTransactions,
            resetCollectTrans,
            transactions: [
                {
                    tid: "",
                    time,
                    coin: 80,
                    message: "Viewed feed",
                    transactionType: TransactionTypesEnum.User,
                    data: "",
                },
                // {
                //     tid: "",
                //     time,
                //     coin: 15,
                //     message: `Your post received a new response: "No one cares that you joined.  Why would you even post that?"`,
                //     transactionType: TransactionTypesEnum.User,
                //     data: "",
                // },
                // {
                //     tid: "",
                //     time,
                //     coin: 15,
                //     message:
                //         `Your post received a new response: "Hi ${localFirstName()}! ` +
                //         `Welcome to Digitari! This is my favorite social platform, ` +
                //         `and I'm sure you'll enjoy it"`,
                //     transactionType: TransactionTypesEnum.User,
                //     data: "",
                // },
                // {
                //     tid: "",
                //     time,
                //     coin: 50,
                //     message: `Damion liked your post: ${postContent}`,
                //     transactionType: TransactionTypesEnum.User,
                //     data: "",
                // },
                // {
                //     tid: "",
                //     time,
                //     coin: 10,
                //     message: `Kaela liked your post: ${postContent}`,
                //     transactionType: TransactionTypesEnum.User,
                //     data: "",
                // },
                // {
                //     tid: "",
                //     time,
                //     coin: 10,
                //     message: `Sarah liked your post: ${postContent}`,
                //     transactionType: TransactionTypesEnum.User,
                //     data: "",
                // },
                // {
                //     tid: "",
                //     time,
                //     coin: 30,
                //     message: "Reward for your successful convo with Zariah",
                //     transactionType: TransactionTypesEnum.User,
                //     data: "",
                // },
            ],
        };
    }

    return {
        accumulation: 0,
        tierWage: 0,
        dailyWage: daily,
        transactionsCollected,
        collectTransactions,
        resetCollectTrans,
        transactions: [],
    };
}
