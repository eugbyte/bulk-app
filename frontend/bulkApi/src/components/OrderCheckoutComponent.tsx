import React from "react";
import { Bid } from "../models/Bid";
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

interface IProp {
    bids: Bid[];
    rowIds: number[];
    handleOrder: () => void
}

export function OrderCheckoutComponent({bids, rowIds, handleOrder}: IProp) {

    console.log("in orderCheckOut", bids);

    const selectedBids: Bid[] = bids.filter(bid =>  rowIds.includes(bid.bidId));

    const totalPrice: number = selectedBids
        .reduce((accum, bid) => accum + bid.quantity * (bid.discountScheme?.discountedPrice ?? 0), 0);

    const totalQuantity: number = selectedBids
        .reduce((accum, bid) => accum + bid.quantity ?? 0, 0);
    
    return <Paper>
        <Grid container spacing={3}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Typography variant={"body1"} align={"center"} color="secondary" paragraph={true}><b>Total Price: </b>${totalPrice}</Typography>
                <Typography variant={"body1"} align={"center"} color="textSecondary" paragraph={true}><b>Total Quantity: </b>{totalQuantity}</Typography>
            </Grid>
            <Grid item xs={3} alignContent="flex-end">
                <Button color="secondary" size="large" variant="contained" onClick={handleOrder} disabled={selectedBids.length < 1}>Order Bids</Button>
            </Grid>        
        </Grid> 
    </Paper>
    
}