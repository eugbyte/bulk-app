import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia'; 
import { DiscountSchemeDetailPage } from "../containers/DiscountSchemeDetailPage";

interface IProps {
    open: boolean;  //open is part of useState(false)
    toggleOpen: () => void; //toggleOpen is part of useState(false)
    title?: string;
    showPicture?: boolean;
    content?: JSX.Element;  // paragraphs to display, e.g. [<p></p>, <p></p>]
    actionTitle?: string,   //title of button
    action?: () => any; //callback function on button click
}

export function DialogComponent({open, toggleOpen, title, content, actionTitle, action, showPicture=false}: IProps): JSX.Element {

    return <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                { showPicture &&
                    <CardMedia 
                        component="img"
                        height="140"
                        image="e_commerce.png"
                        title="https://acowebs.com/impact-ecommerce-society/"/>
                }                
                {content}                
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