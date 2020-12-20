import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IReduxAction, IReduxAppState } from '../../../types/redux'
import {
    FormGroup,
    Typography,
    TextField,
    FormLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core'
import ApiUtils from '../../ApiUtils'

interface IWithdrawBalanceModalOwnProps {
    isOpen: boolean
    onClose: () => void
}

interface IWithdrawBalanceModalReduxStateProps {
    account: string
    networkId: string | null
}

interface IWithdrawBalanceModalDispatchProps {}

type TWithdrawBalanceModalProps = IWithdrawBalanceModalOwnProps &
    IWithdrawBalanceModalDispatchProps &
    IWithdrawBalanceModalReduxStateProps

export const WithdrawBalanceModalComp: React.FunctionComponent<TWithdrawBalanceModalProps> = ({
    isOpen,
    onClose,
    account,
    networkId,
}) => {
    const [amountToWithdraw, setAmountToWithdraw] = useState(0)

    const handleOnWithdraw = () => {
        if (networkId) {
            ApiUtils.withdrawBalance(networkId, account, amountToWithdraw)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Withdraw Balance</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <FormLabel>
                        <Typography variant="body1">
                            Enter how much you want to withdraw.
                        </Typography>
                        <TextField
                            type="number"
                            value={amountToWithdraw || ''}
                            onChange={(e) =>
                                setAmountToWithdraw(parseInt(e.target.value))
                            }
                        ></TextField>
                    </FormLabel>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleOnWithdraw}>
                    Withdraw
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (
    state: IReduxAppState
): IWithdrawBalanceModalReduxStateProps => {
    return {
        account: state.app.accounts[0],
        networkId: state.app.networkId,
    }
}

const mapDispatchToProps = (
    dispatch: Dispatch<IReduxAction>
): IWithdrawBalanceModalDispatchProps => {
    return {}
}

export const WithdrawBalanceModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(WithdrawBalanceModalComp)
