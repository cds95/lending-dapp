import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IReduxAction, IReduxAppState } from '../../../types/redux'
import {
    FormGroup,
    Typography,
    TextField,
    FormLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core'
import ApiUtils from '../../ApiUtils'

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
    const [numEthToDeposit, setNumEthToDeposit] = useState(0)

    const handleOnSubmit = () => {
        if (networkId) {
            ApiUtils.topupBalance(networkId, account, numEthToDeposit)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Deposit Funds to Lending Tree</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <FormLabel>
                        <Typography variant="body1">
                            How much do you want to deposit?
                        </Typography>
                        <TextField
                            type="number"
                            value={numEthToDeposit || ''}
                            onChange={(e) =>
                                setNumEthToDeposit(parseInt(e.target.value))
                            }
                        ></TextField>
                    </FormLabel>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleOnSubmit}>
                    Deposit!
                </Button>
            </DialogActions>
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
