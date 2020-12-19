import React from "react"
import { ILoan } from "../../../types/models"
import { LoanListItem } from "./LoanListItem"
import Button from "@material-ui/core/Button"
import clsx from "clsx";
import { CURRENCY } from "../../constants";

interface ILoanListRowProps {
    loan: ILoan
    className?: string 
}

export const LoanListRow: React.FunctionComponent<ILoanListRowProps> = ({loan, className}) => {
    const elemClassName = clsx("loan-list-row", {
        [`${className}`]: !!className
    })
    return (
        <li className={elemClassName}>
            <LoanListItem label="Id" text={loan.id.toString()} className="loan-list-row__item"/>
            <LoanListItem label="Amount" text={loan.amount.toString()} className="loan-list-row__item" />
            <LoanListItem label="Currency" text={CURRENCY} className="loan-list-row__item" />
            <div className="loan-list-row__button-wrapper">
                <Button variant="outlined" color="primary">Give Loan</Button>
            </div>
        </li>
    )
}