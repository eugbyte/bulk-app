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

class Row {
    bidId: number | undefined;
    name: string | undefined;
    discountedPrice: string | undefined;
    updateCartComponent: JSX.Element | undefined;
    deliveryCharge: string | undefined;
    collectionAddress: string | undefined;
    viewProductComponent: JSX.Element | undefined;
}

export function CartPage(): JSX.Element {

    const dispatch: Dispatch<any> = useDispatch();          

    // The Bids received from the GET request
    const bidsInCart: Bid[] = useSelector((action: RootState) => action.bidReducer.bids as Bid[] ) ?? [];  

    useEffect(() => {
        document.title = "Cart";
        const customerId = 1;
        const action = getBidsOfCustomerInCartAsync(customerId);
        dispatch(action);
    }, []);

    // Convert the Bids to Rows to pass to the DataTable
    const rows: Row[] = bidsInCart.map(bid => createRowFromBid(bid));

    // To allow the user to adjust the quantities through CartButtons component
    const bidQuantities: number[] = bidsInCart.map(row => row.quantity);
    // For some reason, useState(bidQuantities) will produce only an empty array
    // Have to use useEffect to update the bidQuantites
    // need to pass primitive value into useEffect. If objects or arrays are passed, e.g. bidQuantities[], there will be inifite rerender
    // as useEffect compares by memory location. bidsInCart.map() will produce a new array in memory
    // console.log("bidQuantities", bidQuantities);    // bidQuantitie  Array(7) [ 1, 1, 6, 1, 3, 1, 5 ]

    const [quantities, setQuantities] = useState<number[]>(bidQuantities);  //bidQuantites[], rows[], and bidsInCart[] have the same length and order
    // console.log("quantities", quantities);  // quantities  Array []
    let isBidsInitialized: boolean = bidQuantities.length > 0;
    useEffect(() => {
        setQuantities(bidQuantities);
        console.log("bidQuanttiies in useEffect", bidQuantities);
    }, [isBidsInitialized])
    // console.log("quantities", quantities);  // quantities  Array(7) [ 1, 1, 6, 1, 3, 1, 5 ]

    const handleUpdateCart = (bidId: number, quantity: number, dsId: number) => {
        let bid: Bid = new Bid();
        bid.bidId = bidId;
        bid.customerId = 1;
        bid.collectionAddress = "AMK";
        bid.discountSchemeId = dsId;
        bid.quantity = quantity;

        const action = updateBidInCartAsync(bid);
        dispatch(action);
    }

    
    // To add React components to each row
    for (let i = 0; i < bidsInCart.length; i++) {
        const quantity: number = quantities[i];
        const bidId = bidsInCart[i].bidId;
        const discountSchemeId = bidsInCart[i].discountSchemeId;

        const setQuantity = (newQuantity: number) => {
            let newQuantites: number[] = [...quantities];
            newQuantites[i] = newQuantity;
            setQuantities(newQuantites);
        };

    
        rows[i].updateCartComponent = <CartButtons quantity={quantity} setQuantity={setQuantity} 
            action={()=> handleUpdateCart(bidId, quantity, discountSchemeId)}  actionTitle={"Update Cart"} size={"small"}/>
        rows[i].viewProductComponent = <Button size={"small"}>More info</Button>
    }

    // Represents the rowIndexes when the user selects a row
    let rowIds: number[] = [];
    const handleChecked = (checkedRowIds: number[]) => {    
        rowIds = checkedRowIds;   
        console.log(rowIds);
    }
    const accessors: string[] = Object.keys(new Row());
    const columns = ["BidId", "Name", "Price per Item", "Quantity", "Delivery Charge", "Collection Address", "View more"];

    return <div>
        <MaterialTableComponent data={rows} columnNames={columns} accessors={accessors} title="Cart" 
            handleChecked={handleChecked} idColumnAccessorName={"bidId"}             
            actionIcon={AddShoppingCartIcon}
            />
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
    
    return row;
}