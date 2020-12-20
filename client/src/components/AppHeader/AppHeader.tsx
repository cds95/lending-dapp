import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'
import { AskLoanModal } from '../AskLoanModal/AskLoanModal'
import { connect } from 'react-redux'
import { IReduxAppState } from '../../../types/redux'
import './AppHeader.scss'
import { DepositFundsModal } from '../DepositFundsModal'
import { CURRENCY } from '../../constants'
import { WithdrawBalanceModal } from '../WithdrawBalanceModal/WithdrawBalanceModal'

interface IAppHeaderReduxStateProps {
    accountBalance: number
}

type TAppHeaderProps = IAppHeaderReduxStateProps

export const AppHeaderComp: React.FunctionComponent<TAppHeaderProps> = ({
    accountBalance,
}) => {
    const [isAskForLoanModalOpen, setIsAskForLoanModalOpen] = useState(false)
    const [isDepositFundsModalOpen, setIsDepositFundsModalOpen] = useState(
        false
    )
    const [
        isWithdrawBalanceModalOpen,
        setIsWithdrawBalanceModalOpen,
    ] = useState(false)

    const openAskForLoanModal = () => setIsAskForLoanModalOpen(true)
    const closeAskForLoanModal = () => setIsAskForLoanModalOpen(false)
    const openDepositFundsModal = () => setIsDepositFundsModalOpen(true)
    const closeDepositFundsModal = () => setIsDepositFundsModalOpen(false)
    const openWithdrawBalanceModal = () => setIsWithdrawBalanceModalOpen(true)
    const closeWithdrawBalanceModal = () => setIsWithdrawBalanceModalOpen(false)

    return (
        <div className="app__header">
            <Typography variant="h3">Lending App</Typography>
            <div className="app__header-right">
                <Typography variant="h5" className="app__header-right-item">
                    Account Balance: {accountBalance} {CURRENCY}
                </Typography>
                <Button
                    variant="contained"
                    onClick={openAskForLoanModal}
                    className="app__header-right-item"
                >
                    Get Loan
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={openDepositFundsModal}
                    className="app__header-right-item"
                >
                    Deposit Funds
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={openWithdrawBalanceModal}
                    className="app__header-right-item"
                >
                    Withdraw Balance
                </Button>
            </div>
            <DepositFundsModal
                isOpen={isDepositFundsModalOpen}
                onClose={closeDepositFundsModal}
            />
            <AskLoanModal
                isOpen={isAskForLoanModalOpen}
                onClose={closeAskForLoanModal}
            />
            <WithdrawBalanceModal
                isOpen={isWithdrawBalanceModalOpen}
                onClose={closeWithdrawBalanceModal}
            />
        </div>
    )
}

const mapStateToProps = (state: IReduxAppState): IAppHeaderReduxStateProps => {
    return {
        accountBalance: state.app.currAccountBalance,
    }
}

export const AppHeader = connect(mapStateToProps)(AppHeaderComp)
