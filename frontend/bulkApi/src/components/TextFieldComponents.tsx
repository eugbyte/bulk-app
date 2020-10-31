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
    adornment?: string | null,
    variant?: "outlined" | "filled" | "standard",
    type?: "text" | "number" | "password"
}

export function TextFieldUncontrolledComponent({ label, name, defaultValue="", 
    isFullWidth=false, variant="standard", type="text",
    adornment=null,
    control, errors, 
    errorMessage="", rules={}}: IProp): JSX.Element {
    console.log("errors", errors);
    let isError: boolean = errors[name] != null;
    let helperText: string = isError ? errorMessage : "";

    return <div>
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={props => <TextField {...props} label={label} error={isError} helperText={helperText} 
                fullWidth={isFullWidth} variant={variant} type={type}
                InputProps={{
                    startAdornment: adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null
                }}
            />} 
        />  
    </div> 
}