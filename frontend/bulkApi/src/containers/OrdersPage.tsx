import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { Bid } from "../models/Bid";
import { RootState } from "../store/rootReducer";
import { getPendingOrSuccessfulBids } from "../store/thunks/bidThunk";
import { Container } from "@material-ui/core";
import { DataTable } from "../components/shared/DataTable";

class Row {
    name: string | undefined;
    discountedPrice: string | undefined;
    quantity: string | undefined;
    deliveryCharge: string | undefined;
    collectionAddress: string | undefined;
    remainingBidsRequired: number | undefined;
    bidExpiryDate: string | undefined;
    bidStatus: "SUCCESS" | "PENDING" | "FAILED" | undefined
};

export function OrdersPage(): JSX.Element {
    document.title = "Orders";
    const dispatch: Dispatch<any> = useDispatch();

    const bids: Bid[] = useSelector((action: RootState) => action.bidReducer.bids as Bid[] ) ?? [];

    useEffect(() => {
        const customerId: number = 1;
        const action = getPendingOrSuccessfulBids(customerId);
        dispatch(action);
    }, [dispatch]);

    const columnNames: string[] = ["Name", "Discounted Price Per Item", "Quantity", "Delivery Charge", "Collection Address", "Remaining Bids Required", "Bid Expiry Date", "Bid Status"];
    const accessors: string[] = Object.keys(new Row());
    const rows: Row[] = bids.map(bid => createRowFromBid(bid));

     return <Container maxWidth="lg">
         <DataTable columnNames={columnNames} accessors={accessors} data={rows} title={"Submitted Bids"} enablePaging={true} pageSize={5} />
     </Container>
}

function createRowFromBid(bid: Bid): Row {   

    let discountedPrice: number = bid.discountScheme?.discountedPrice as number;
    let originalPrice: number = bid.discountScheme?.product?.originalPrice as number;
    let minOrderQnty: number = bid.discountScheme?.minOrderQnty as number;
    let currentTotalBids: number = bid.currentTotalBids as number;

    let row: Row = new Row();
    row.quantity = bid.quantity + "";
    row.collectionAddress = bid.collectionAddress;
    row.discountedPrice = `$${discountedPrice} (Save $${originalPrice - discountedPrice})`;
    row.deliveryCharge = "$" + bid.discountScheme?.deliveryCharge;
    row.name = bid.discountScheme?.product?.name;
    row.remainingBidsRequired = minOrderQnty - currentTotalBids;

    let expiryDate: Date = new Date(bid.discountScheme?.expiryDate as Date);    //json return date as strings
    row.bidExpiryDate = expiryDate.toDateString();

    if (bid.bidSuccessDate != null) {
        row.bidStatus = "SUCCESS";        
    } else if (new Date() > expiryDate) {
        row.bidStatus = "FAILED";
    } else {
        row.bidStatus = "PENDING";
    }
    
    return row;
}
 