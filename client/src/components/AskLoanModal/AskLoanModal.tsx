import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IReduxAction, IReduxAppState } from '../../types/redux'
import { Dialog } from '@material-ui/core'
import ApiUtils from '../../ApiUtils'
import { CurrencyModalForm } from '../CurrencyModalForm'
import { EEtherCurrencyUnit } from '../../types'

interface IAskLoanModalOwnProps {
    isOpen: boolean
    onClose: () => void
}

interface IAskLoanModalReduxStateProps {
    account: string
    networkId: string | null
}

interface IAskLoanModalDispatchProps {}

type TAskLoanModalProps = IAskLoanModalOwnProps &
    IAskLoanModalDispatchProps &
    IAskLoanModalReduxStateProps

export const AskLoanModalComp: React.FunctionComponent<TAskLoanModalProps> = ({
    isOpen,
    onClose,
    account,
    networkId,
}) => {
    const handleOnLoanSubmit = (
        amount: string,
        currencyUnit: EEtherCurrencyUnit
    ) => {
        if (networkId) {
            ApiUtils.askForLoan(networkId, account, amount, currencyUnit)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <CurrencyModalForm
                title="Loan Application"
                formLabel="How much do you need to borrow?"
                submitLabel="Get Loan!"
                onSubmit={handleOnLoanSubmit}
            />
        </Dialog>
    )
}

const mapStateToProps = (
    state: IReduxAppState
): IAskLoanModalReduxStateProps => {
    return {
        account: state.app.accounts[0],
        networkId: state.app.networkId,
    }
}

const mapDispatchToProps = (
    dispatch: Dispatch<IReduxAction>
): IAskLoanModalDispatchProps => {
    return {}
}

export const AskLoanModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(AskLoanModalComp)
