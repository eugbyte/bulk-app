import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { Bid } from "../models/Bid";
import { RootState } from "../store/rootReducer";
import { getPendingOrSuccessfulBids } from "../store/thunks/bidThunk";
import { Container } from "@material-ui/core";
import { DataTable } from "../components/DataTable";

class Row {
    name: string | undefined;
    discountedPrice: string | undefined;
    quantity: string | undefined;
    deliveryCharge: string | undefined;
    collectionAddress: string | undefined;
    remainingBidsRequired: number | undefined;
};

export function OrdersPage(): JSX.Element {
    document.title = "Orders";
    const dispatch: Dispatch<any> = useDispatch();

    const bids: Bid[] = useSelector((action: RootState) => action.bidReducer.bids as Bid[] ) ?? [];

    useEffect(() => {
        const customerId: number = 1;
        const action = getPendingOrSuccessfulBids(customerId);
        dispatch(action);
    }, []);

    const columns: string[] = ["Name", "Discounted Price", "Quantity", "Delivery Charge", "Collection Address", "Remaining Bids Required"];
    const accessors: string[] = Object.keys(new Row());
    const rows: Row[] = bids.map(bid => createRowFromBid(bid));

     return <Container>
         <DataTable columnNames={columns} accessors={accessors} data={rows} title={"Pending / Successful Bids"} />
     </Container>
}

function createRowFromBid(bid: Bid): Row {   

    let discountedPrice = bid.discountScheme?.discountedPrice as number;
    let originalPrice = bid.discountScheme?.product?.originalPrice as number;

    let row: Row = new Row();
    row.quantity = bid.quantity + "";
    row.collectionAddress = bid.collectionAddress;
    row.discountedPrice = `$${discountedPrice} (Save $${originalPrice - discountedPrice})`;
    row.deliveryCharge = "$" + bid.discountScheme?.deliveryCharge;
    row.name = bid.discountScheme?.product?.name;
    row.remainingBidsRequired = bid.discountScheme?.minOrderQnty as number - (bid.currentTotalBids as number);
    
    return row;
}
 