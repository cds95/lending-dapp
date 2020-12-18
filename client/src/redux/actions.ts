export interface IReduxAction {
    "type": string,
    [key: string]: any
}

export const SET_ETH_ACCOUNTS_ACTION = "SET_ETH_ACCOUNTS";
export const getSetEthAccountsAction = (accounts: string[]): IReduxAction => {
    return {
        type: SET_ETH_ACCOUNTS_ACTION,
        accounts
    }
}