import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { v4 as guid } from 'uuid';
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";

interface IPropUncontrolled {
    label: string,
    name: string,
    errorMessage?: string,
    defaultValue?: string,
    control: Control<Record<string, any>>,
    errors: DeepMap<Record<string, any>, FieldError>,
    rules?: object
}

export function DatePickerUncontrolledComponent({ control, errors, label, name, defaultValue="", errorMessage="", rules={}}: IPropUncontrolled): JSX.Element {
    let isError: boolean = errors[name] != null;
    let helperText: string = isError ? errorMessage : "";
    return <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={props => <DatePickerControlledComponent {...props} label={label} error={isError} helperText={helperText} />} // props contains: onChange, onBlur and value
    />  
}

interface IPropControlled {
    onChange: () => void;
    label: string;
    value: Date;
    error?: boolean;
    helperText?: string
}

export function DatePickerControlledComponent({label, onChange, value, error=false, helperText=""}: IPropControlled): JSX.Element {

    if (!value) {
        value = new Date();
    }
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            error={error}
            helperText={helperText}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id={guid()}
            label={label}
            value={value }
            onChange={onChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }} />
    </MuiPickersUtilsProvider>
}