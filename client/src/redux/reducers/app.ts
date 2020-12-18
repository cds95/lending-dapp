import { IReduxAction, SET_ETH_ACCOUNTS_ACTION } from "../actions"

interface IAppState {
    accounts: string[]
}

const initialState: IAppState = {
    accounts: [ ]
}

export const appReducer = (state: IAppState = initialState, action: IReduxAction): IAppState => {
    switch(action.type) {
        case SET_ETH_ACCOUNTS_ACTION:
            return {
                accounts: action.accounts
            }
    }
    return state 
}