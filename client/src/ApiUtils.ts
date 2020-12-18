import Web3 from "web3";
import getWeb3 from "./getWeb3";
import LoanerContract from "./contracts/Loaner.json";
import { ILoan } from "../types/models";
import { convertApiResponseToLoans } from "./AppUtils";

export class ApiUtils {
    private web3: Web3 | null;

    constructor() {
        this.web3 = null
    }

    public async initWeb3(): Promise<void> {
        this.web3 = await getWeb3()
    }

    public async getAccounts(): Promise<string[]> {
        this.checkWeb3Initialized()
        if(this.web3) {
            return await this.web3.eth.getAccounts();
        }
        return []
    }

    public async getNetworkId(): Promise<number> {
        this.checkWeb3Initialized();
        if(this.web3) {
            return await this.web3.eth.net.getId();
        }
        return -1
    }

    public async getLoans(networkId: string): Promise<ILoan[]> {
        this.checkWeb3Initialized();
        const deployedLoanerContract = this.getContract(networkId)
        if(this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
              )
              const response = await instance.methods.getLoans().call();
              return convertApiResponseToLoans(response)
        }
        return []
    }

    public async askForLoan(networkId: string, account: string, amount: number): Promise<void> {
        this.checkWeb3Initialized()
        const deployedLoanerContract = this.getContract(networkId)
        if(this.web3) {
            const instance = new this.web3.eth.Contract(
                LoanerContract.abi as any,
                deployedLoanerContract.address
              )
              await instance.methods.askForLoan(amount).send({
                from: account
              })
        }
    }

    private getContract(networkId: string): any {
        return LoanerContract.networks[networkId]
    }

    private checkWeb3Initialized() {
        if(!this.web3) {
            throw new Error("Web3 not initialized yet");
        }
    }
}

const ApiUtilsObj = new ApiUtils()
export default ApiUtilsObj;