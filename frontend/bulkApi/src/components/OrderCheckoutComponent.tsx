import React from "react";
import { Bid } from "../models/Bid";
import Typography from '@material-ui/core/Typography';
import { Button, Container } from "@material-ui/core";

interface IProp {
    bids: Bid[];
    rowIds: number[];
}

export function OrderCheckoutComponent({bids, rowIds}: IProp) {

    const selectedBids: Bid[] = bids.filter(bid =>  rowIds.includes(bid.bidId));

    const totalPrice: number = selectedBids
        .reduce((accum, bid) => accum + bid.quantity * (bid.discountScheme?.discountedPrice ?? 0), 0);

    const totalQuantity: number = selectedBids
        .reduce((accum, bid) => accum + bid.quantity ?? 0, 0);
    
    return <Container>
        <Typography variant={"body1"} align={"center"} color="secondary" paragraph={true}><b>Total Price: </b>${totalPrice}</Typography>
        <Typography variant={"body1"} align={"center"} color="textSecondary" paragraph={true}><b>Total Quantity: </b>{totalQuantity}</Typography>
    </Container> 
    
}