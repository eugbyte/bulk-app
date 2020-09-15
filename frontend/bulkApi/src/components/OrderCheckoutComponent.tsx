import React from "react";
import { Bid } from "../models/Bid";
import Typography from '@material-ui/core/Typography';

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
    
    return <div>
        <Typography><b>Total Price:</b>${totalPrice}</Typography>
        <Typography><b>Total Quantity:</b>${totalQuantity}</Typography>
    </div> 
    
}