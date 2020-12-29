import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@material-ui/core'
import { EEtherCurrencyUnit } from '../../types'
import React, { useState } from 'react'
import './CurrencyModalForm.scss'

interface ICurrencyModalFormProps {
    title: string
    formLabel: string
    submitLabel: string
    onSubmit: (amount: string, currencyUnit: EEtherCurrencyUnit) => void
}

export const CurrencyModalForm: React.FunctionComponent<ICurrencyModalFormProps> = ({
    title,
    formLabel,
    onSubmit,
    submitLabel,
}) => {
    const [amount, setAmount] = useState('')
    const [currencyUnit, setCurrencyUnit] = useState(EEtherCurrencyUnit.ETHER)
    const handleOnSubmit = () => {
        onSubmit(amount, currencyUnit)
    }
    const handleOnUnitChange = (e: any) => {
        setCurrencyUnit(e.target.value as EEtherCurrencyUnit)
    }
    return (
        <div className="currency-modal-form">
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <Typography variant="body1">{formLabel}</Typography>
                <div className="currency-modal-form__content">
                    <FormGroup className="currency-modal-form__amount-field">
                        <TextField
                            placeholder="Amount"
                            type="number"
                            value={amount || ''}
                            onChange={(e) => setAmount(e.target.value)}
                        ></TextField>
                    </FormGroup>
                    <FormControl>
                        <InputLabel>Unit</InputLabel>
                        <Select
                            onChange={handleOnUnitChange}
                            value={currencyUnit}
                        >
                            {Object.values(EEtherCurrencyUnit).map(
                                (currencyUnit) => (
                                    <MenuItem value={currencyUnit}>
                                        {currencyUnit}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleOnSubmit}>
                    {submitLabel}
                </Button>
            </DialogActions>
        </div>
    )
}
