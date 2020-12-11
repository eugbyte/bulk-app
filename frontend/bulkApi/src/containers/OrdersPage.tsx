import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { Bid } from "../models/Bid";
import { RootState } from "../store/rootReducer";
import { getPendingOrSuccessfulBids } from "../store/thunks/bidThunk";
import { Container } from "@material-ui/core";
import { DataTable } from "../components/shared/DataTable";
import { DataTableService } from "../services/DataTableService";

export class Row {
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
    const rows: Row[] = bids.map(bid => DataTableService.createRowFromBid_OrdersPage(bid));

     return <Container maxWidth="lg">
         <DataTable columnNames={columnNames} accessors={accessors} data={rows} title={"Submitted Bids"} enablePaging={true} pageSize={5} />
     </Container>
}

 