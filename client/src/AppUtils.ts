import { ILoan } from '../types/models'
import ApiUtils from './ApiUtils'

export const convertApiResponseToLoans = (response: any): ILoan[] => {
    const loanAmountsInWei: string[] = response['0']
    const borrowers: string[] = response['1']
    const loans: ILoan[] = []
    for (let i = 0; i < loanAmountsInWei.length; i++) {
        const loanAmountInEther = ApiUtils.convertWeiToEther(
            parseInt(loanAmountsInWei[i])
        )
        loans[i] = {
            id: i.toString(), //TODO:  Generate in contract
            borrowerAddress: borrowers[i],
            amount: loanAmountInEther,
            hasBeenSettled: false,
        }
    }
    return loans
}
