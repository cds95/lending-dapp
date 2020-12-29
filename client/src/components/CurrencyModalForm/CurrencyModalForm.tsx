import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormLabel,
    TextField,
    Typography,
} from '@material-ui/core'
import React, { useState } from 'react'

interface ICurrencyModalFormProps {
    title: string
    formLabel: string
    submitLabel: string
    onSubmit: (amount: string, currencyUnit: string) => void
}

export const CurrencyModalForm: React.FunctionComponent<ICurrencyModalFormProps> = ({
    title,
    formLabel,
    onSubmit,
    submitLabel,
}) => {
    const [numEthToDeposit, setNumEthToDeposit] = useState('')
    const [currencyUnit, setCurrencyUnit] = useState('ether')
    const handleOnSubmit = () => {
        onSubmit(numEthToDeposit, '')
    }
    return (
        <div className="currency-modal-form">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <FormLabel>
                        <Typography variant="body1">{formLabel}</Typography>
                        <TextField
                            type="number"
                            value={numEthToDeposit || ''}
                            onChange={(e) => setNumEthToDeposit(e.target.value)}
                        ></TextField>
                    </FormLabel>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleOnSubmit}>
                    {submitLabel}
                </Button>
            </DialogActions>
        </div>
    )
}
