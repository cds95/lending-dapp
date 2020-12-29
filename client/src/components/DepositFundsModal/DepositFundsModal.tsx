import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IReduxAction, IReduxAppState } from '../../types/redux'
import { Dialog } from '@material-ui/core'
import ApiUtils from '../../ApiUtils'
import { CurrencyModalForm } from '../CurrencyModalForm'
import { EEtherCurrencyUnit } from '../../types'

interface IDepositFundsModalOwnProps {
    isOpen: boolean
    onClose: () => void
}

interface IDepositFundsModalReduxStateProps {
    account: string
    networkId: string | null
}

interface IDepositFundsModalDispatchProps {}

type TDepositFundsModalProps = IDepositFundsModalOwnProps &
    IDepositFundsModalDispatchProps &
    IDepositFundsModalReduxStateProps

export const DepositFundsModalComp: React.FunctionComponent<TDepositFundsModalProps> = ({
    isOpen,
    onClose,
    account,
    networkId,
}) => {
    const handleOnSubmit = (
        amount: string,
        currencyUnit: EEtherCurrencyUnit
    ) => {
        if (networkId) {
            ApiUtils.topupBalance(networkId, account, amount, currencyUnit)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <CurrencyModalForm
                title="Deposit Funds to Lending App"
                formLabel="How much do you want to deposit?"
                submitLabel="Deposit!"
                onSubmit={handleOnSubmit}
            />
        </Dialog>
    )
}

const mapStateToProps = (
    state: IReduxAppState
): IDepositFundsModalReduxStateProps => {
    return {
        account: state.app.accounts[0],
        networkId: state.app.networkId,
    }
}

const mapDispatchToProps = (
    dispatch: Dispatch<IReduxAction>
): IDepositFundsModalDispatchProps => {
    return {}
}

export const DepositFundsModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(DepositFundsModalComp)
