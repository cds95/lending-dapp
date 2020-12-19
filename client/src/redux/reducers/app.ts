import { SET_ACCOUNT_BALANCE_ACTION, SET_ETH_ACCOUNTS_ACTION, SET_ETH_NETWORK_ID_ACTION, SET_LOANS_ACTION } from "../actions"
import {IAppReducerState, IReduxAction } from "../../../types/redux"

const initialState: IAppReducerState = {
    accounts: [ ],
    loans: [],
    networkId: null,
    currAccountBalance: 0
}

export const appReducer = (state: IAppReducerState = initialState, action: IReduxAction): IAppReducerState => {
    switch(action.type) {
        case SET_ETH_ACCOUNTS_ACTION:
            return {
                ...state,
                accounts: action.accounts
            }
        case SET_LOANS_ACTION:
            return {
                ...state,
                loans: action.loans
            }
        case SET_ETH_NETWORK_ID_ACTION:
            return {
                ...state,
                networkId: action.networkId
            }
        case SET_ACCOUNT_BALANCE_ACTION:
            return {
                ...state,
                currAccountBalance: action.accountBalance
            }
    }
    return state 
}