import React, {  useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface IProps { 
    open: boolean;  // useState(true)
    setOpen: (val: boolean) => void;    //useState(true)
    message: string;
    severity: "error" | "warning" | "info" | "success",
    cleanUp?: () => any;    // callback function when notification closes
}

export function DialogueComponent({open, setOpen, message, severity, cleanUp}: IProps): JSX.Element {

    const handleClose = (reason: string) => { 
        setOpen(false); 
        if (cleanUp) {
            cleanUp();
        }
    }; 
    
    return <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose("clickaway")}>
        <Alert onClose={() => handleClose("clickaway")} severity={severity} >
            {message}
        </Alert>
    </Snackbar>
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

