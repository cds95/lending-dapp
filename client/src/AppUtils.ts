import { ILoan } from './types/models'
import ApiUtils from './ApiUtils'

export const convertApiResponseToLoans = (response: any): ILoan[] => {
    const loanIds: string[] = response['0']
    const loanAmountsInWei: string[] = response['1']
    const borrowers: string[] = response['2']
    const lenders: string[] = response['3']
    const hasBeenSettledStates: boolean[] = response['4']
    const loans: ILoan[] = []
    for (let i = 0; i < loanAmountsInWei.length; i++) {
        const loanAmountInEther = ApiUtils.convertWeiToEther(
            parseInt(loanAmountsInWei[i])
        )
        loans[i] = {
            id: loanIds[i],
            borrowerAddress: borrowers[i],
            amount: loanAmountInEther,
            lenderAddress: lenders[i],
            hasBeenSettled: hasBeenSettledStates[i],
        }
    }
    return loans
}

export const isNotEmptyAddress = (address?: string): boolean =>
    !!address && address !== '0x0000000000000000000000000000000000000000'
