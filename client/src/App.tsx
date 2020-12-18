import React from "react";
import { Provider } from "react-redux"
import ApiUtils from "../src/ApiUtils"

import "./App.css";
import { store } from "./redux";
import { getSetEthAccountsAction, getSetEthNetworkIdAction, getSetLoansAction } from "./redux/actions";

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
      store.dispatch(getSetLoansAction(loans))
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (this.state.isLoadingApp) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Welcome to the Lending App!</h1>
        </div>
      </Provider>
    );
  }
}

export default App;
