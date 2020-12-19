import Web3 from 'web3'

declare global {
    interface Window {
        ethereum: any // TODO:  Figure out type
        web3: Web3
    }
}
