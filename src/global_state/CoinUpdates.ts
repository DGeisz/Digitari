import { makeVar } from "@apollo/client";
import { TransactionReceipt } from "../global_types/TransactionTypes";

export const transactionReceipts = makeVar<TransactionReceipt[]>([]);

export function addNewReceipt(amount: number) {
    const oldReceipts = transactionReceipts();
    transactionReceipts([
        ...oldReceipts,
        { id: Math.random().toString(), amount },
    ]);
}

export function removeTransactionReceipt(id: string) {
    const oldReceipts = transactionReceipts();
    transactionReceipts(oldReceipts.filter((receipt) => receipt.id !== id));
}
