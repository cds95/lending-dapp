import React from "react"
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

interface ILoanListItemProps {
    label: string 
    text: string 
    className?: string 
}

export const LoanListItem: React.FunctionComponent<ILoanListItemProps> = ({label, text, className}) => {
    const elemClassName = clsx("loan-list-item", {
        [`${className}`]: !!className
    })
    return (
        <div className={elemClassName}>
            <Typography variant="h5" className="loan-list-item__label">{label}</Typography>
            <Typography variant="body1">{text}</Typography>
        </div>
    )
}