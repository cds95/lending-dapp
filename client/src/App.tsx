import React from "react";
import { Provider } from "react-redux"
import ApiUtils from "../src/ApiUtils"
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import "./App.scss";
import { store } from "./redux";
import { getSetEthAccountsAction, getSetEthNetworkIdAction, getSetLoansAction } from "./redux/actions";
import { LoanList } from "./components/LoanList/LoanList";

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
        <div className="app">
          <div className="app__header">
              <Typography variant="h3">Lending Tree</Typography>
              <Button variant="contained">Get Loan</Button>
              
            </div>
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
