import React from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';



interface IProp {
    quantity: number; // quantity is part of useState(0)
    setQuantity: (num: number) => any;  // setQuantity is part of useState(0)
    actionTitle?: string;
    action?: (val: any) => any;
}

export function CartButtons({quantity, setQuantity, actionTitle, action}: IProp): JSX.Element {
    const classes = useStyles();

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrement  = () => {
        let newQuantity = quantity - 1
        if (newQuantity < 1)
            return;
        setQuantity(quantity - 1);
    }

    return <div className={classes.buttonGroup}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={handleIncrement}><AddIcon/></Button>
            <Button>{quantity}</Button>
            <Button onClick={handleDecrement}><RemoveIcon /></Button>
        </ButtonGroup>

          <ButtonGroup>
            
            <Button  onClick={action} color="primary" variant="contained">{actionTitle}</Button>
           
          </ButtonGroup>
        

        
    </div>

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);
 