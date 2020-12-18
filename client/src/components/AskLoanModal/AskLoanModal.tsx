import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { IReduxAction, IReduxAppState } from "../../../types/redux"
import { FormGroup, Typography, TextField, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import ApiUtils from "../../ApiUtils";

interface IAskLoanModalOwnProps {
    isOpen: boolean 
    onClose: () => void
}

interface IAskLoanModalReduxStateProps {
    account: string,
    networkId: string | null
}

interface IAskLoanModalDispatchProps {
    
}

type TAskLoanModalProps = IAskLoanModalOwnProps & IAskLoanModalDispatchProps & IAskLoanModalReduxStateProps

export const AskLoanModalComp: React.FunctionComponent<TAskLoanModalProps> = ({isOpen, onClose, account, networkId}) => {
    const [loanAmount, setLoanAmount] = useState(0)

    const handleOnLoanSubmit = () => {
        if(networkId) {
            ApiUtils.askForLoan(networkId, account, loanAmount)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Loan Application</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <FormLabel>
                        <Typography variant="body1">How much do you need to borrow?</Typography>
                        <TextField type="number" value={loanAmount || ""} onChange={e => setLoanAmount(parseInt(e.target.value))}></TextField>
                    </FormLabel>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleOnLoanSubmit}>Get Loan!</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state: IReduxAppState): IAskLoanModalReduxStateProps => {
    return {
        account: state.app.accounts[0],
        networkId: state.app.networkId
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IReduxAction>): IAskLoanModalDispatchProps => {
    return {

    }
}

export const AskLoanModal = connect(mapStateToProps, mapDispatchToProps)(AskLoanModalComp)