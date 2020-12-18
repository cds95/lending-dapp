import { SET_ETH_ACCOUNTS_ACTION, SET_ETH_NETWORK_ID_ACTION, SET_LOANS_ACTION } from "../actions"
import {IAppReducerState, IReduxAction } from "../../../types/redux"

const initialState: IAppReducerState = {
    accounts: [ ],
    loans: [],
    networkId: null 
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
    }
    return state 
}