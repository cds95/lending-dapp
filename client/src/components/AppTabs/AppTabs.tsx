import React, { useState } from 'react'
import { connect } from 'react-redux'
import { IReduxAppState } from '../../../types/redux'
import { CardContent, Card, Tabs, Tab } from '@material-ui/core'
import { ILoan } from '../../../types/models'
import { LoanList } from '../LoanList'
import {
    getAllLoans,
    getOpenUserLoans,
    getSettledUserLoans,
    getUserLentLoans,
} from '../../redux/selectors'

interface IAppTabsCompReduxStateProps {
    allLoans: ILoan[]
    userOpenLoans: ILoan[]
    userSettledLoans: ILoan[]
    userLentLoans: ILoan[]
}

enum ETab {
    OPEN_LOANS = 1,
    USER_OPEN_LOANS = 2,
    SETTLED_LOANS = 3,
    USER_LENT_LOANS = 4,
}

export const AppTabsComp: React.FunctionComponent<IAppTabsCompReduxStateProps> = ({
    userOpenLoans,
    userSettledLoans,
    allLoans,
    userLentLoans,
}) => {
    const [activeTab, setActiveTab] = useState(ETab.OPEN_LOANS)
    let displayedLoans: ILoan[] = []
    switch (activeTab) {
        case ETab.USER_OPEN_LOANS:
            displayedLoans = userOpenLoans
            break
        case ETab.SETTLED_LOANS:
            displayedLoans = userSettledLoans
            break
        case ETab.USER_LENT_LOANS:
            displayedLoans = userLentLoans
            break
        default:
            displayedLoans = allLoans
            break
    }
    return (
        <div className="app-tabs">
            <Tabs
                value={activeTab}
                onChange={(_: any, newActiveTab: number) =>
                    setActiveTab(newActiveTab)
                }
            >
                <Tab label="All Open Loans" value={ETab.OPEN_LOANS} />
                <Tab label="Borrowed Loans" value={ETab.USER_OPEN_LOANS} />
                <Tab label="Closed Loans" value={ETab.SETTLED_LOANS} />
                <Tab label="Lent Loans" value={ETab.USER_LENT_LOANS} />
            </Tabs>
            <Card className="app__content">
                <CardContent>
                    <LoanList loans={displayedLoans} />
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (
    state: IReduxAppState
): IAppTabsCompReduxStateProps => {
    return {
        userOpenLoans: getOpenUserLoans(state),
        userSettledLoans: getSettledUserLoans(state),
        allLoans: getAllLoans(state),
        userLentLoans: getUserLentLoans(state),
    }
}

export const AppTabs = connect(mapStateToProps)(AppTabsComp)
