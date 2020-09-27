import React from "react";
import TextField from '@material-ui/core/TextField';
import { Controller, Control, DeepMap, FieldError } from "react-hook-form";

interface IProp {
    label: string,
    name: string,
    errorMessage?: string,
    defaultValue?: string,
    control: Control<Record<string, any>>,
    errors: DeepMap<Record<string, any>, FieldError>,
    rules: object,
    isFullWidth?: boolean
}

export function TextFieldUnControlledComponent({ isFullWidth=false, control, errors, label, name, defaultValue="", errorMessage="", rules={}}: IProp): JSX.Element {
    console.log("errors", errors);
    let isError: boolean = errors[name] != null;
    let helperText: string = isError ? errorMessage : "";

    return <div>
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={props => <TextField {...props} label={label} error={isError} helperText={helperText} fullWidth={isFullWidth} />} // props contains: onChange, onBlur and value
        />  
    </div> 
}