/// <reference path="../types/truffle-contracts/SimpleStorage.d.ts" />
import React from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import { Provider } from "react-redux"

import "./App.css";
import Web3 from "web3";
import { store } from "./redux";

interface IAppState {
  storageValue: number,
  web3: Web3 | null,
  accounts: string[] | null,
  contract: any 
}

class App extends React.Component<{}, IAppState> {
  state: IAppState = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId.toString()];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi as any, // TODO: Fix types
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    if(accounts && contract) {
      await contract.methods.set(5).send({ from: accounts[0] });
      const response = await contract.methods.get().call();
      this.setState({ storageValue: response });
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Good to Go!</h1>
          <p>Your Truffle Box is installed and ready.</p>
          <h2>Smart Contract Example</h2>
          <p>
            If your contracts compiled and migrated successfully, below will show
            a stored value of 5 (by default).
          </p>
          <p>
            Try changing the value stored on <strong>line 40</strong> of App.js.
          </p>
          <div>The stored value is: {this.state.storageValue}</div>
        </div>
      </Provider>
    );
  }
}

export default App;
