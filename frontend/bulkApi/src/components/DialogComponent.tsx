import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia'; 
import imageUrl  from  "../../src/images/e_commerce.png";

interface IProps {
    open: boolean;  //open is part of useState(false)
    toggleOpen: () => void; //toggleOpen is part of useState(false)
    title?: string;
    showPicture?: boolean;
    content?: JSX.Element;  // paragraphs to display, e.g. [<p></p>, <p></p>]
    actionTitle?: string,   //title of button
    action?: () => any; //callback function on button click
    secondaryActionTitle?: string,
    secondaryAction?: () => any;
}

export function DialogComponent({open, toggleOpen, title, content, actionTitle, action, showPicture=false, secondaryActionTitle, secondaryAction}: IProps): JSX.Element {

    return <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                { showPicture &&
                    <CardMedia 
                        component="img"
                        
                        //height="140"
                        image={imageUrl}
                        title="https://acowebs.com/impact-ecommerce-society/"/>
                } 
                <br/>               
                {content}                
            </DialogContent>
            {actionTitle &&
                <DialogActions>
                    <Button onClick={action} color="primary" variant="outlined">
                        {actionTitle}
                    </Button>
                </DialogActions>
            }            
            {secondaryActionTitle &&
                <DialogActions>
                    <Button onClick={secondaryAction as () => {}} color="secondary" variant="outlined">
                        {secondaryActionTitle}
                    </Button>
                </DialogActions>
            } 
            <DialogActions>                
                <Button onClick={toggleOpen} color="primary" variant="outlined">
                    Close
                </Button>
            </DialogActions>
    </Dialog>

}
