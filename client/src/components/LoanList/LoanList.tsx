import React from "react"
import { connect } from "react-redux"
import { IReduxAppState } from "../../../types/redux"
import getWeb3 from "../../getWeb3"

interface ILoanListCompProps {

}

export class LoanListComp extends React.Component<ILoanListCompProps> {

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state: IReduxAppState) => {
    return {
        
    }
}

export const LoanList = connect(mapStateToProps)(LoanListComp)