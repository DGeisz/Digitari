import { makeVar } from "@apollo/client";

export const challengeReceipts = makeVar<string[]>([]);

export function addNewChallengeReceipt(receipt: string) {
    const oldReceipts = challengeReceipts();
    challengeReceipts([...oldReceipts, receipt]);
}

export function removeChallengeReceipt(receipt: string) {
    const oldReceipts = challengeReceipts();
    challengeReceipts(oldReceipts.filter((r) => r !== receipt));
}
