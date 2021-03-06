import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface IProps { 
    open: boolean;  // useState(true)
    setOpen: (val: boolean) => void;    //useState(true)
    message: string | JSX.Element;
    severity: "error" | "warning" | "info" | "success",
    cleanUp?: () => any;    // callback function when notification closes;
    autoHideDuration?: number;
}

export function SnackbarComponent({open, setOpen, message, severity, cleanUp, autoHideDuration=6000}: IProps): JSX.Element {

    const handleClose = (reason: string) => { 
        setOpen(false); 
        if (cleanUp) {
            cleanUp();
        }
    }; 
    
    return <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={() => handleClose("clickaway")}>
        <Alert onClose={() => handleClose("clickaway")} severity={severity} >
            {message}
        </Alert>
    </Snackbar>
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

