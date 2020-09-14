import React, { useEffect, useState } from "react";
import { Bid } from "../models/Bid";
import { RootState } from "../store/rootReducer";
import { getBidsOfCustomerInCartAsync, updateBidInCartAsync } from "../store/thunks/bidThunk";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { DataTable } from "../components/DataTable";
import { MaterialTableComponent } from "../components/MaterialTableComponent";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { CartButtons } from "../components/CartButtons";
import { Button } from "@material-ui/core";
import { DialogueComponent } from "../components/DialogueComponent";

class Row {
    bidId: number | undefined;
    name: string | undefined;
    discountedPrice: string | undefined;
    updateCartComponent: JSX.Element | undefined;
    deliveryCharge: string | undefined;
    collectionAddress: string | undefined;
    tableData: any | undefined; // to set tableData: { checked: true } in order to select all rows by default
}

export function CartPage(): JSX.Element {

    const dispatch: Dispatch<any> = useDispatch();       
    
    // State to determine whether to show notification
    const [open, setOpen] = useState(false);

    // The Bids received from the GET request
    const bidsInCart: Bid[] = useSelector((action: RootState) => action.bidReducer.bids as Bid[] ) ?? [];  

    // For some reason, useState(bidQuantities) will produce only an empty array
    // Have to use useEffect to update the bidQuantites
    // need to pass primitive value into useEffect. If objects or arrays are passed, e.g. bidQuantities[], there will be inifite rerender
    // as useEffect compares by memory location. bidsInCart.map() will produce a new array in memory
    let isBidsInitialized: boolean = bidsInCart.length > 0;

    const bidQuantities: number[] = bidsInCart.map(row => row.quantity);    
    // console.log("bidQuantities", bidQuantities);    // [ 1, 3, 3, 1, 3, 1, 5 ]
    const [quantities, setQuantities] = useState<number[]>(bidQuantities);  //bidQuantites[], rows[], and bidsInCart[] have the same length and order
    // console.log("quantities", quantities);  // []

    useEffect(() => {
        document.title = "Cart";
        const customerId = 1;
        const action = getBidsOfCustomerInCartAsync(customerId);
        dispatch(action);

        setQuantities(bidQuantities);
    }, [isBidsInitialized]);

    // Convert the Bids to Rows to pass to the DataTable
    const rows: Row[] = bidsInCart.map(bid => createRowFromBid(bid));

    // To add React components to each row
    for (let i = 0; i < bidsInCart.length; i++) {
        const quantity: number = quantities[i]; 

        // Method reference to set quantity to pass into CartButtons
        const setQuantity = (newQuantity: number) => {
            let newQuantites: number[] = [...quantities];
            newQuantites[i] = newQuantity;
            setQuantities(newQuantites);
        };

        // Method reference to POST updated id to pass into CartButtons
        const handleUpdateCart = () => {
            let bid: Bid = new Bid();
            bid.bidId = bidsInCart[i].bidId;;
            bid.customerId = 1;
            bid.collectionAddress = "AMK";
            bid.discountSchemeId = bidsInCart[i].discountSchemeId;
            bid.quantity = quantity;
    
            const action = updateBidInCartAsync(bid);
            dispatch(action);
            setOpen(true)
        }
    
        rows[i].updateCartComponent = <CartButtons quantity={quantity} setQuantity={setQuantity} 
            action={handleUpdateCart}  actionTitle={"Update Cart"} size={"small"}/>
    }

    // Represents the rowIndexes when the user selects a row
    let rowIds: number[] = [];
    const handleChecked = (checkedRowIds: number[]) => {    
        console.log("checkedRowIds", checkedRowIds);
        rowIds = checkedRowIds;   
        console.log(rowIds);
    }

    const accessors: string[] = Object.keys(new Row());
    const columns = ["BidId", "Name", "Price per Item", "Quantity", "Delivery Charge", "Collection Address"];

    return <div>
        <MaterialTableComponent data={rows} columnNames={columns} accessors={accessors} title="Cart" 
            handleChecked={handleChecked} idColumnAccessorName={"bidId"}             
            actionIcon={AddShoppingCartIcon} />
        <DialogueComponent open={open} setOpen={setOpen} message={"Cart updated"} severity={"success"}/>
    </div>
}

function createRowFromBid(bid: Bid): Row {

    let dateString = "";
    if (bid.discountScheme?.expiryDate) {
        let date: Date = new Date(bid.discountScheme.expiryDate.toString());
        dateString = date.toDateString();        
    }

    let discountedPrice = bid.discountScheme?.discountedPrice as number;
    let originalPrice = bid.discountScheme?.product?.originalPrice as number;

    let row: Row = new Row();
    row.bidId = bid.bidId;
    row.collectionAddress = bid.collectionAddress;
    row.discountedPrice = `$${discountedPrice} (Save $${originalPrice - discountedPrice})`;
    row.deliveryCharge = "$" + bid.discountScheme?.deliveryCharge;
    row.name = bid.discountScheme?.product?.name;
    row.tableData = { checked: true }
    
    return row;
}