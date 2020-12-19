import React from "react";
import { Provider } from "react-redux"
import ApiUtils from "../src/ApiUtils"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "./App.scss";
import { store } from "./redux";
import { getSetAccountBalanceAction, getSetEthAccountsAction, getSetEthNetworkIdAction, getSetLoansAction } from "./redux/actions";
import { LoanList } from "./components/LoanList/LoanList";
import { AppHeader } from "./components/AppHeader";

interface IAppState {
  isLoadingApp: boolean
}

class App extends React.Component<{}, IAppState> {
  state: IAppState = { isLoadingApp: true };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      
      await ApiUtils.initWeb3()

      const accounts = await ApiUtils.getAccounts()
      const networkId = await ApiUtils.getNetworkId()
      store.dispatch(getSetEthNetworkIdAction(networkId.toString()))
      store.dispatch(getSetEthAccountsAction(accounts))
      this.setState({isLoadingApp: false})
      
      const loans = await ApiUtils.getLoans(networkId.toString())
      const accountBalance = await ApiUtils.getBalanceInContract(networkId.toString(), accounts[0])
      store.dispatch(getSetLoansAction(loans))
      store.dispatch(getSetAccountBalanceAction(accountBalance))
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    const {isLoadingApp } = this.state
    if (isLoadingApp) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Provider store={store}>
        <div className="app">
         <AppHeader />
          <Card className="app__content">
            <CardContent>
              <LoanList />
            </CardContent>
          </Card>
        </div>
      </Provider>
    );
  }
}

export default App;
