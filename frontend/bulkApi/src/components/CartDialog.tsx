import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Typography } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import { DiscountScheme } from "../models/DiscountScheme";
import { CartButtons } from "./CartButtons";

interface IProps {
    open: boolean;  //open is part of useState(false)
    toggleOpen: () => void; //toggleOpen is part of useState(false)
    title?: string;
    paras?: JSX.Element[];  // paragraphs to display, e.g. [<p></p>, <p></p>]
    actionTitle?: string,   //title of button
    action?: () => any; //callback function on button click
}

export function CartDialog({open, toggleOpen, title, paras, actionTitle, action}: IProps): JSX.Element {

    return <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <CardMedia 
                    component="img"
                    height="140"
                    image="e_commerce.png"
                    title="https://acowebs.com/impact-ecommerce-society/"/>
                {paras}
                
            </DialogContent>
            {actionTitle &&
                <DialogActions>
                    <Button onClick={action} color="primary">
                        {actionTitle}
                    </Button>
                </DialogActions>
            }            
            <DialogActions>                
                <Button onClick={toggleOpen} color="primary">
                    Close
                </Button>
            </DialogActions>
    </Dialog>

}
