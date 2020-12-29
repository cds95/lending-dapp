import { ILoan } from '../types/models'
import { IReduxAction } from '../types/redux'

export const SET_ETH_ACCOUNTS_ACTION = 'SET_ETH_ACCOUNTS'
export const getSetEthAccountsAction = (accounts: string[]): IReduxAction => {
    return {
        type: SET_ETH_ACCOUNTS_ACTION,
        accounts,
    }
}

export const SET_ETH_NETWORK_ID_ACTION = 'SET_ETH_NETWORK_ID'
export const getSetEthNetworkIdAction = (networkId: string): IReduxAction => {
    return {
        type: SET_ETH_NETWORK_ID_ACTION,
        networkId,
    }
}

export const SET_LOANS_ACTION = 'SET_LOANS'
export const getSetLoansAction = (loans: ILoan[]): IReduxAction => {
    return {
        type: SET_LOANS_ACTION,
        loans,
    }
}

export const ADD_NEW_LOAN_ACTION = 'ADD_NEW_LOAN'
export const getAddNewLoanAction = (loan: ILoan): IReduxAction => {
    return {
        type: ADD_NEW_LOAN_ACTION,
        loan,
    }
}

export const SET_ACCOUNT_BALANCE_ACTION = 'SET_ACCOUNT_BALANCE'
export const getSetAccountBalanceAction = (
    accountBalance: number
): IReduxAction => {
    return {
        type: SET_ACCOUNT_BALANCE_ACTION,
        accountBalance,
    }
}
