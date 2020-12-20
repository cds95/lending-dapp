import React from 'react'
import { Provider } from 'react-redux'
import ApiUtils from '../src/ApiUtils'
import { LinearProgress, Typography } from '@material-ui/core'
import './App.scss'
import { store } from './redux'
import {
    getAddNewLoanAction,
    getSetAccountBalanceAction,
    getSetEthAccountsAction,
    getSetEthNetworkIdAction,
    getSetLoansAction,
} from './redux/actions'
import { AppHeader } from './components/AppHeader'
import { ILoan } from '../types/models'
import { AppTabs } from './components/AppTabs'

interface IAppState {
    isLoadingApp: boolean
}

class App extends React.Component<{}, IAppState> {
    state: IAppState = { isLoadingApp: true }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.

            await ApiUtils.initWeb3()

            const accounts = await ApiUtils.getAccounts()
            const networkId = await ApiUtils.getNetworkId()
            store.dispatch(getSetEthNetworkIdAction(networkId.toString()))
            store.dispatch(getSetEthAccountsAction(accounts))
            this.setState({ isLoadingApp: false })

            const loans = await ApiUtils.getLoans(networkId.toString())
            const accountBalance = await ApiUtils.getBalanceInContract(
                networkId.toString(),
                accounts[0]
            )
            store.dispatch(getSetLoansAction(loans))
            store.dispatch(getSetAccountBalanceAction(accountBalance))

            ApiUtils.listenToOnLoanAskedEvent(
                networkId.toString(),
                ({ returnValues }) => {
                    const { borrower, loanAmount, loanId } = returnValues
                    const loan: ILoan = {
                        id: loanId,
                        borrowerAddress: borrower,
                        amount: ApiUtils.convertWeiToEther(loanAmount),
                        hasBeenSettled: false,
                    }
                    store.dispatch(getAddNewLoanAction(loan))
                }
            )

            ApiUtils.listenToFundsDepositedEvent(
                networkId.toString(),
                async () => this.updateBalance(networkId, accounts[0])
            )

            ApiUtils.listenToOnLoanProvidedEvent(
                networkId.toString(),
                async () => this.updateBalance(networkId, accounts[0])
            )

            ApiUtils.listenToOnBalanceWithdrawnEvent(
                networkId.toString(),
                async () => this.updateBalance(networkId, accounts[0])
            )
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            )
            console.error(error)
        }
    }

    async updateBalance(networkId: number, account: string) {
        const updatedAccountBalance = await ApiUtils.getBalanceInContract(
            networkId.toString(),
            account
        )
        store.dispatch(getSetAccountBalanceAction(updatedAccountBalance))
    }

    render() {
        const { isLoadingApp } = this.state
        if (isLoadingApp) {
            return (
                <div className="app--loading">
                    <Typography variant="h3">Loading Lending App</Typography>
                    <LinearProgress className="app--loading__indicator" />
                </div>
            )
        }
        return (
            <Provider store={store}>
                <div className="app">
                    <AppHeader />
                    <AppTabs />
                </div>
            </Provider>
        )
    }
}

export default App
