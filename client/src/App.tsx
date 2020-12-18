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
import { AskLoanModal } from "./components/AskLoanModal/AskLoanModal";

interface IAppState {
  isLoadingApp: boolean
  isAskForLoanModalOpen: boolean 
}

class App extends React.Component<{}, IAppState> {
  state: IAppState = { isLoadingApp: true, isAskForLoanModalOpen: false };

  constructor(props: any) {
    super(props)

    this.openAskLoanModal = this.openAskLoanModal.bind(this)
    this.closeAskLoanModal = this.closeAskLoanModal.bind(this)
  }

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
  
  openAskLoanModal() {
    this.setState({isAskForLoanModalOpen: true})
  }

  closeAskLoanModal() {
    this.setState({isAskForLoanModalOpen: false})
  }

  render() {
    const {isLoadingApp, isAskForLoanModalOpen} = this.state
    if (isLoadingApp) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Provider store={store}>
        <div className="app">
          <div className="app__header">
              <Typography variant="h3">Lending Tree</Typography>
              <Button variant="contained" onClick={this.openAskLoanModal}>Get Loan</Button>
              <AskLoanModal isOpen={isAskForLoanModalOpen} onClose={this.closeAskLoanModal}/>
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
