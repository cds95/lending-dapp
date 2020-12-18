import React from "react";
import getWeb3 from "./getWeb3";
import { Provider } from "react-redux"

import "./App.css";
import { store } from "./redux";
import { getSetEthAccountsAction, getSetEthNetworkIdAction } from "./redux/actions";

interface IAppState {
  isLoadingApp: boolean
}

class App extends React.Component<{}, IAppState> {
  state: IAppState = { isLoadingApp: true };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      store.dispatch(getSetEthNetworkIdAction(networkId.toString()))
      store.dispatch(getSetEthAccountsAction(accounts))
      this.setState({isLoadingApp: false})
      
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
