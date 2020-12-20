import { ILoan } from '../../../types/models'
import { IReduxAppState } from '../../../types/redux'

export const getAllLoans = (state: IReduxAppState): ILoan[] => state.app.loans

export const getOpenUserLoans = (state: IReduxAppState): ILoan[] => {
    const currUserAccount = state.app.accounts[0]
    return state.app.loans.filter(
        (loan) =>
            loan.borrowerAddress === currUserAccount && !loan.hasBeenSettled
    )
}

export const getSettledUserLoans = (state: IReduxAppState): ILoan[] => {
    const currUserAccount = state.app.accounts[0]
    return state.app.loans.filter(
        (loan) =>
            loan.hasBeenSettled && loan.borrowerAddress === currUserAccount
    )
}

export const getUserLentLoans = (state: IReduxAppState): ILoan[] => {
    const currUserAccount = state.app.accounts[0]
    return state.app.loans.filter(
        (loan) => loan.lenderAddress && loan.lenderAddress === currUserAccount
    )
}
