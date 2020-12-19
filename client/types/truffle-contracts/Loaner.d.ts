/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from 'bn.js'
import { EventData, PastEventOptions } from 'web3-eth-contract'

export interface LoanerContract extends Truffle.Contract<LoanerInstance> {
    'new'(meta?: Truffle.TransactionDetails): Promise<LoanerInstance>
}

type AllEvents = never

export interface LoanerInstance extends Truffle.ContractInstance {
    inputFunds: {
        (txDetails?: Truffle.TransactionDetails): Promise<
            Truffle.TransactionResponse<AllEvents>
        >
        call(txDetails?: Truffle.TransactionDetails): Promise<void>
        sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>
        estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>
    }

    withdrawBalance: {
        (
            amount: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<Truffle.TransactionResponse<AllEvents>>
        call(
            amount: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<void>
        sendTransaction(
            amount: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<string>
        estimateGas(
            amount: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<number>
    }

    getLoans(txDetails?: Truffle.TransactionDetails): Promise<BN[]>

    getNumLoans(txDetails?: Truffle.TransactionDetails): Promise<BN>

    askForLoan: {
        (
            loanAmountInWei: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<Truffle.TransactionResponse<AllEvents>>
        call(
            loanAmountInWei: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<void>
        sendTransaction(
            loanAmountInWei: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<string>
        estimateGas(
            loanAmountInWei: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<number>
    }

    giveLoan: {
        (
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<Truffle.TransactionResponse<AllEvents>>
        call(
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<void>
        sendTransaction(
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<string>
        estimateGas(
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<number>
    }

    payoffLoan: {
        (
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<Truffle.TransactionResponse<AllEvents>>
        call(
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<void>
        sendTransaction(
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<string>
        estimateGas(
            loanId: number | BN | string,
            txDetails?: Truffle.TransactionDetails
        ): Promise<number>
    }

    methods: {
        inputFunds: {
            (txDetails?: Truffle.TransactionDetails): Promise<
                Truffle.TransactionResponse<AllEvents>
            >
            call(txDetails?: Truffle.TransactionDetails): Promise<void>
            sendTransaction(
                txDetails?: Truffle.TransactionDetails
            ): Promise<string>
            estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>
        }

        withdrawBalance: {
            (
                amount: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<Truffle.TransactionResponse<AllEvents>>
            call(
                amount: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<void>
            sendTransaction(
                amount: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<string>
            estimateGas(
                amount: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<number>
        }

        getLoans(txDetails?: Truffle.TransactionDetails): Promise<BN[]>

        getNumLoans(txDetails?: Truffle.TransactionDetails): Promise<BN>

        askForLoan: {
            (
                loanAmountInWei: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<Truffle.TransactionResponse<AllEvents>>
            call(
                loanAmountInWei: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<void>
            sendTransaction(
                loanAmountInWei: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<string>
            estimateGas(
                loanAmountInWei: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<number>
        }

        giveLoan: {
            (
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<Truffle.TransactionResponse<AllEvents>>
            call(
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<void>
            sendTransaction(
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<string>
            estimateGas(
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<number>
        }

        payoffLoan: {
            (
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<Truffle.TransactionResponse<AllEvents>>
            call(
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<void>
            sendTransaction(
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<string>
            estimateGas(
                loanId: number | BN | string,
                txDetails?: Truffle.TransactionDetails
            ): Promise<number>
        }
    }

    getPastEvents(event: string): Promise<EventData[]>
    getPastEvents(
        event: string,
        options: PastEventOptions,
        callback: (error: Error, event: EventData) => void
    ): Promise<EventData[]>
    getPastEvents(
        event: string,
        options: PastEventOptions
    ): Promise<EventData[]>
    getPastEvents(
        event: string,
        callback: (error: Error, event: EventData) => void
    ): Promise<EventData[]>
}
