export interface ILoan {
    amount: number;
    borrowerAddress: string;
    lenderAddress?: string;
    interest?: number;
    hasBeenSettled: boolean;
}