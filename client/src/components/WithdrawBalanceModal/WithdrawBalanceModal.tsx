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
import { CurrencyModalForm } from '../CurrencyModalForm'

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
    const handleOnWithdraw = (amount: string, currencyUnit: string) => {
        if (networkId) {
            ApiUtils.withdrawBalance(networkId, account, amount)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <CurrencyModalForm
                title="Withdraw Balance"
                formLabel="Enter how much you want to withdraw."
                submitLabel="Withdraw"
                onSubmit={handleOnWithdraw}
            />
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
