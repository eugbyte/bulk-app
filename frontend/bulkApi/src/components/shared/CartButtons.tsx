import React from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface IProp {
    quantity: number; // quantity is part of useState(0)
    setQuantity: (num: number) => any;  // setQuantity is part of useState(0)
    size?: "small" | "medium" | "large"
    align?: "alignLeft" | "alignCenter" | "alignRight"
}

export function CartButtons({quantity, setQuantity, size="medium", align="alignLeft"}: IProp): JSX.Element {
    const classes: Record<string, any> = useStyles();

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrement  = () => {
        let newQuantity = quantity - 1
        if (newQuantity < 1)
            return;
        setQuantity(quantity - 1);
    }

    return <div className={classes[align]}>
        <ButtonGroup color="primary" aria-label="outlined primary button group" size={size}>
            <Button onClick={handleIncrement}><AddIcon/></Button>
            <Button>{quantity}</Button>
            <Button onClick={handleDecrement}><RemoveIcon /></Button>
        </ButtonGroup>
    </div>

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alignLeft: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      '& > *': {
        margin: theme.spacing(1),
      }
    }, 
    alignCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    alignRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'right',
      '& > *': {
        margin: theme.spacing(1),
      }
    }
  }),
);
 