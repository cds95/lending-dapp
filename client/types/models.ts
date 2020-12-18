export interface ILoan {
    id: string,
    amount: number;
    borrowerAddress: string;
    lenderAddress?: string;
    interest?: number;
    hasBeenSettled: boolean;
}