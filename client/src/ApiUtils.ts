import Web3 from 'web3'
import getWeb3 from './getWeb3'
import LoanerContract from './contracts/Loaner.json'
import { ILoan } from '../types/models'
import { convertApiResponseToLoans } from './AppUtils'
import { BigNumber } from 'bignumber.js'

export class ApiUtils {
    private web3: Web3 | null

    constructor() {
        this.web3 = null
    }

    public async initWeb3(): Promise<void> {
        this.web3 = await getWeb3()
    }

    public listenToOnLoanProvidedEvent(
        networkdId: string,
        fn: (e: any) => void
    ) {
        this.checkWeb3Initialized()
        if (this.web3) {
            const contract = this.getContract(networkdId)
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                contract.address
            )
            instance.events.LoanProvided().on('data', fn)
        }
    }

    public listenToOnLoanAskedEvent(networkdId: string, fn: (e: any) => void) {
        this.checkWeb3Initialized()
        if (this.web3) {
            const contract = this.getContract(networkdId)
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                contract.address
            )
            instance.events.LoanAsked().on('data', fn)
        }
    }

    public listenToOnBalanceWithdrawnEvent(
        networkdId: string,
        fn: (e: any) => void
    ) {
        this.checkWeb3Initialized()
        if (this.web3) {
            const contract = this.getContract(networkdId)
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                contract.address
            )
            instance.events.FundsWithdrawn().on('data', fn)
        }
    }

    public listenToFundsDepositedEvent(
        networkdId: string,
        fn: (e: any) => void
    ) {
        this.checkWeb3Initialized()
        if (this.web3) {
            const contract = this.getContract(networkdId)
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                contract.address
            )
            instance.events.FundsDeposited().on('data', fn)
        }
    }

    public async getAccounts(): Promise<string[]> {
        this.checkWeb3Initialized()
        if (this.web3) {
            return await this.web3.eth.getAccounts()
        }
        return []
    }

    public async getNetworkId(): Promise<number> {
        this.checkWeb3Initialized()
        if (this.web3) {
            return await this.web3.eth.net.getId()
        }
        return -1
    }

    public async getLoans(networkId: string): Promise<ILoan[]> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkId)
        if (this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
            )
            const response = await instance.methods.getLoans().call()
            return convertApiResponseToLoans(response)
        }
        return []
    }

    public async payoffLoan(
        networkdId: string,
        account: string,
        loanId: number
    ): Promise<void> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkdId)
        if (this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
            )
            await instance.methods.payoffLoan(loanId).send({
                from: account,
            })
        }
    }

    public async withdrawBalance(
        networkdId: string,
        account: string,
        amountInEther: string
    ): Promise<void> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkdId)
        if (this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
            )
            const amountInWei = this.convertEtherToWei(amountInEther)
            await instance.methods.withdrawBalance(amountInWei).send({
                from: account,
            })
        }
    }

    public async askForLoan(
        networkId: string,
        account: string,
        amountInEther: string
    ): Promise<void> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkId)
        if (this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
            )
            const amountInWei = this.convertEtherToWei(amountInEther)
            await instance.methods.askForLoan(amountInWei).send({
                from: account,
            })
        }
    }

    public async giveLoan(
        networkId: string,
        account: string,
        loanId: number
    ): Promise<void> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkId)
        if (this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
            )
            await instance.methods.giveLoan(loanId).send({
                from: account,
            })
        }
    }

    public async getBalanceInContract(
        networkId: string,
        account: string
    ): Promise<number> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkId)
        if (this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
            )
            const balanceInWei = await instance.methods.getBalance().call({
                from: account,
            })
            const balanceInEther: number = parseFloat(
                this.web3.utils.fromWei(balanceInWei, 'ether')
            )
            return balanceInEther
        }
        return -1
    }

    public async topupBalance(
        networkId: string,
        account: string,
        amountOfEther: string
    ): Promise<void> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkId)
        if (this.web3) {
            const amountInWei = this.convertEtherToWei(amountOfEther)
            const currBalanceInWei = await this.web3.eth.getBalance(account)
            const currBalanceInWeiBigNum = new BigNumber(currBalanceInWei)
            if (amountInWei.isGreaterThan(currBalanceInWeiBigNum)) {
                throw new Error(
                    `Cannot topup balance as account ${account} has insufficient funds.`
                )
            }
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
            )
            await instance.methods.inputFunds().send({
                from: account,
                value: amountInWei.toString(),
            })
        }
    }

    public convertEtherToWei(ether: string): BigNumber {
        this.checkWeb3Initialized()
        if (this.web3) {
            const wei = this.web3.utils.toWei(ether, 'ether')
            return new BigNumber(wei)
        }
        return new BigNumber('0')
    }

    public convertWeiToEther(wei: number): number {
        this.checkWeb3Initialized()
        if (this.web3) {
            return parseFloat(this.web3.utils.fromWei(wei.toString(), 'ether'))
        }
        return -1
    }

    private getContract(networkId: string): any {
        return LoanerContract.networks[networkId]
    }

    private checkWeb3Initialized() {
        if (!this.web3) {
            throw new Error('Web3 not initialized yet')
        }
    }
}

const ApiUtilsObj = new ApiUtils()
export default ApiUtilsObj
