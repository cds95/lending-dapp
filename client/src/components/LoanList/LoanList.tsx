import React from 'react'
import { ILoan } from '../../../types/models'
import { LoanListRow } from './LoanListRow'
import './LoanList.scss'

interface ILoanListProps {
    loans: ILoan[]
}

export const LoanList: React.FunctionComponent<ILoanListProps> = ({
    loans,
}) => {
    return (
        <ul className="loan-list">
            {loans.map((loan) => (
                <LoanListRow key={loan.id} loan={loan} />
            ))}
        </ul>
    )
}
