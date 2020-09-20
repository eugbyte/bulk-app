import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ApiError } from "../models/ApiError";
import { errorAction } from "../store/actions/errorAction";
import { ACTIONS } from "../store/actionEnums";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ErrorCollection } from "../models/ErrorCollection";

interface IProp {
    autoHideDuration?: number;
    error: ApiError | Error | ErrorCollection | null,
    message: string
}

// Stateful component
// Parent component does not need to hold the showAlert in its state
export function ErrorNotification({error, autoHideDuration=6000, message}: IProp): JSX.Element {
    // API Errors received if any
    // To display error notification
    const dispatch: Dispatch<any> = useDispatch(); 
    const [openAlert, setOpenAlert] = useState<boolean>(false); 
    const handleCloseAlert = () => {
        setOpenAlert(false);
        const cleanUpErrorAction = errorAction(ACTIONS.CLEAR_ERROR, error as ApiError | Error | ErrorCollection );
        dispatch(cleanUpErrorAction);
    }

    useEffect(()=> {
        if (error) {
            setOpenAlert(true);
        }
    }, [error]);
    return <Snackbar open={openAlert} autoHideDuration={autoHideDuration} onClose={handleCloseAlert}>
    <Alert severity="error" onClose={handleCloseAlert}>{message}</Alert>
</Snackbar>
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }