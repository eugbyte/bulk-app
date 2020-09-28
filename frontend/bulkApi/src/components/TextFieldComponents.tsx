import React from "react";
import TextField from '@material-ui/core/TextField';
import { Controller, Control, DeepMap, FieldError } from "react-hook-form";
import InputAdornment from '@material-ui/core/InputAdornment';

interface IProp {
    label: string,
    name: string,
    errorMessage?: string,
    defaultValue?: string,
    control: Control<Record<string, any>>,
    errors: DeepMap<Record<string, any>, FieldError>,
    rules: object,
    isFullWidth?: boolean,
    adornment?: string | null
}

export function TextFieldUncontrolledComponent({ isFullWidth=false, control, errors, label, name, defaultValue="", errorMessage="", rules={}, adornment=null}: IProp): JSX.Element {
    console.log("errors", errors);
    let isError: boolean = errors[name] != null;
    let helperText: string = isError ? errorMessage : "";

    return <div>
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={props => <TextField {...props} label={label} error={isError} helperText={helperText} fullWidth={isFullWidth} 
                InputProps={{
                    startAdornment: adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null
                }}
            />} 
        />  
    </div> 
}