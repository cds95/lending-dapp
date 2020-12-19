import React from 'react'
import { ILoan } from '../../../types/models'
import { LoanListItem } from './LoanListItem'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { CURRENCY } from '../../constants'
import { connect } from 'react-redux'
import { IReduxAppState } from '../../../types/redux'
import ApiUtils from '../../ApiUtils'
import { isNotEmptyAddress } from '../../AppUtils'

interface ILoanListRowProps {
    loan: ILoan
    className?: string
}

interface ILoanListRowPropsReduxStateProps {
    currUserAccount: string
    networkId: string | null 
}

type TLoanListRowProps = ILoanListRowProps & ILoanListRowPropsReduxStateProps

export const LoanListRowComp: React.FunctionComponent<TLoanListRowProps> = ({
    loan,
    className,
    currUserAccount,
    networkId,
}) => {
    const elemClassName = clsx('loan-list-row', {
        [`${className}`]: !!className,
    })
    const { borrowerAddress, lenderAddress, id } = loan

    let button
    if (isNotEmptyAddress(lenderAddress) && currUserAccount === borrowerAddress) {
        button = (
            <Button variant="outlined" color="primary">
                Pay back loan
            </Button>
        )
    } else if (currUserAccount === borrowerAddress) {
        button = (
            <Button variant="outlined" color="primary">
                Withdraw Loan
            </Button>
        )
    } else if(lenderAddress !== currUserAccount) {
        button = (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => networkId && 
                    ApiUtils.giveLoan(
                        networkId.toString(),
                        currUserAccount,
                        parseInt(id)
                    )
                }
            >
                Give Loan
            </Button>
        )
    }
    return (
        <li className={elemClassName}>
            <LoanListItem
                label="Id"
                text={loan.id.toString()}
                className="loan-list-row__item"
            />
            <LoanListItem
                label="Amount"
                text={loan.amount.toString()}
                className="loan-list-row__item"
            />
            <LoanListItem
                label="Currency"
                text={CURRENCY}
                className="loan-list-row__item"
            />
            <div className="loan-list-row__button-wrapper">{button}</div>
        </li>
    )
}

const mapStateToProps = (
    state: IReduxAppState
): ILoanListRowPropsReduxStateProps => {
    return {
        networkId: state.app.networkId,
        currUserAccount: state.app.accounts[0],
    }
}

export const LoanListRow = connect(mapStateToProps)(LoanListRowComp)
