import React from "react"
import { connect } from "react-redux"
import { ILoan } from "../../../types/models"
import { IReduxAppState } from "../../../types/redux"
import { LoanListRow } from "./LoanListRow"

interface ILoanListCompReduxStateProps {
    loans: ILoan[]
}

type TLoanListProps = ILoanListCompReduxStateProps


export class LoanListComp extends React.Component<TLoanListProps> {

    render() {
        const {loans} = this.props 
        return (
            <ul>
                {
                    loans.map(loan => (<LoanListRow key={loan.id} loan={loan} />))
                }
            </ul>
        )
    }
}

const mapStateToProps = (state: IReduxAppState): ILoanListCompReduxStateProps => {
    return {
        loans: state.app.loans
    }
}

export const LoanList = connect(mapStateToProps)(LoanListComp)