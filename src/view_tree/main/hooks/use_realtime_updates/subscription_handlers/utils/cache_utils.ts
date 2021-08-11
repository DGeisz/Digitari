import {
    ACTIVE_CONVOS,
    ActiveConvosData,
    ActiveConvosVariables,
} from "../../../../routes/tab_nav/screens/convos/sub_screens/active_convos/gql/Queries";
import { ApolloCache } from "@apollo/client";
import { TransactionType } from "../../../../../../global_types/TransactionTypes";
import {
    BOLT_TRANSACTIONS,
    BoltTransData,
    BoltTransVariables,
    TRANSACTIONS,
    TransactionsData,
    TransactionsVariables,
} from "../../../../routes/tab_nav/screens/wallet/gql/Queries";
import { QUERY_TYPENAME } from "../../../../../../global_gql/Schema";

export function sort_active_convos(cache: ApolloCache<any>) {
    const activeConvosData = cache.readQuery<
        ActiveConvosData,
        ActiveConvosVariables
    >({
        query: ACTIVE_CONVOS,
    });

    if (!!activeConvosData?.activeConvos) {
        let convos = [...activeConvosData.activeConvos];
        convos.sort((a, b) => parseInt(b.lastTime) - parseInt(a.lastTime));

        cache.writeQuery<ActiveConvosData, ActiveConvosVariables>({
            query: ACTIVE_CONVOS,
            data: {
                activeConvos: convos,
            },
        });
    }
}

export function addTransaction(
    newTransaction: TransactionType,
    cache: ApolloCache<any>
) {
    /*
     * Now handle adding a transaction
     */
    const transData = cache.readQuery<TransactionsData, TransactionsVariables>({
        query: TRANSACTIONS,
    });

    if (!!transData?.transactions) {
        const transactions = [newTransaction, ...transData.transactions];

        cache.writeQuery<TransactionsData, TransactionsVariables>({
            query: TRANSACTIONS,
            data: {
                transactions,
            },
        });
    }
}

export function addBoltTransaction(
    newTransaction: TransactionType,
    cache: ApolloCache<any>
) {
    const transData = cache.readQuery<BoltTransData, BoltTransVariables>({
        query: BOLT_TRANSACTIONS,
    });

    if (!!transData?.boltTransactions) {
        const boltTransactions = [
            newTransaction,
            ...transData.boltTransactions,
        ];

        cache.writeQuery<BoltTransData, BoltTransVariables>({
            query: BOLT_TRANSACTIONS,
            data: {
                boltTransactions,
            },
        });
    }
}
