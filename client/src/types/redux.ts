import { ILoan } from './models'

export interface IReduxAppState {
    app: IAppReducerState
}

export interface IReduxAction {
    type: string
    [key: string]: any
}

export interface IAppReducerState {
    networkId: string | null
    accounts: string[]
    loans: ILoan[]
    currAccountBalance: number
}
