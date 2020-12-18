import { ILoan } from "../types/models"

export const convertApiResponseToLoans = (response: any): ILoan[] => {
    const loanAmounts: string[] = response["0"]
    const borrowers: string[] = response["1"]
    const loans: ILoan[] = []
    for(let i = 0; i < loanAmounts.length; i++) {
        loans[i] = {
            id: i.toString(), //TODO:  Generate in contract
            borrowerAddress: borrowers[i],
            amount: parseInt(loanAmounts[i]),
            hasBeenSettled: false
        }
    }
    return loans
}