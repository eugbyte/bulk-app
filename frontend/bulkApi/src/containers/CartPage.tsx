import React, { useEffect, useState } from "react";
import { Bid } from "../models/Bid";
import { RootState } from "../store/rootReducer";
import { deleteBidFromCartAsync, getBidsOfCustomerInCartAsync, updateBidInCartAsync } from "../store/thunks/bidThunk";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { DataTable } from "../components/DataTable";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { CartButtons } from "../components/CartButtons";
import { DialogueComponent } from "../components/DialogueComponent";
import { Button, Container } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import { OrderCheckoutComponent } from "../components/OrderCheckoutComponent";
import { ACTIONS } from "../store/actionEnums";
import Typography from '@material-ui/core/Typography';


class Row {
    bidId: number | undefined;
    checkbox: JSX.Element | undefined;
    name: string | undefined;
    discountedPrice: string | undefined;
    updateCartComponent: JSX.Element | undefined;
    deliveryCharge: string | undefined;
    collectionAddress: string | undefined;
    deleteButton: JSX.Element | undefined;
    detailPanel: JSX.Element | undefined;
}


export function CartPage(): JSX.Element {
          
    const dispatch: Dispatch<any> = useDispatch(); 
    // State to determine whether to show notification
    const [open, setOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const handleNotification = (isOpen: boolean, message: string) => {
        setOpen(isOpen);
        setNotificationMessage(message);
    }

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

    // The Bids received from the GET request
    const bidsInCart: Bid[] = useSelector((action: RootState) => action.bidReducer.bids as Bid[] ) ?? [];  
    console.log("bids received", bidsInCart);

    useEffect(() => {
        document.title = "Cart";
        const customerId = 1;
        const action = getBidsOfCustomerInCartAsync(customerId);
        dispatch(action);        
    }, [bidsInCart.toString()]);

    // For some reason, useState(bidQuantities) will produce only an empty array
    // React hooks are always one step behind. On next render, the state variable will have a new value.
    // Have to use useEffect to update the bidQuantites
    // need to pass primitive value into useEffect. If objects or arrays are passed, e.g. bidQuantities[], there will be inifite rerender
    // as useEffect compares by memory location. bidsInCart.map() will produce a new array in memory
    let isBidsInitialized: boolean = bidsInCart.length > 0;

    const bidQuantities: number[] = bidsInCart.map(bid => bid.quantity);    
    // console.log("bidQuantities", bidQuantities);    // [ 1, 3, 3, 1, 3, 1, 5 ]
    const [quantities, setQuantities] = useState<number[]>(bidQuantities);  //bidQuantites[], rows[], and bidsInCart[] have the same length and order
    // console.log("quantities", quantities);  // []    

    useEffect(() => {
        setQuantities(bidQuantities);
    }, [isBidsInitialized]);

    //Response on update. If update is successful, make another request to get bids in cart
    const responseMessages: string[] = useSelector( (action: RootState) => action.bidReducer.httpMessages as string[] ) ?? [""]; 
    useEffect(() => {
        console.log("useEffect updateResponseMessages", responseMessages);
        let message: string = responseMessages[responseMessages.length - 1];
        if (message == ACTIONS.HTTP_UPDATE_SUCCESS || message == ACTIONS.HTTP_DELETE_SUCCESS) {
            const customerId = 1;
            const action = getBidsOfCustomerInCartAsync(customerId);
            dispatch(action); 
        }        
    }, [responseMessages.length]);

    // Convert the Bids to Rows to pass to the DataTable
    const rows: Row[] = bidsInCart.map(bid => createRowFromBid(bid));    

    // To add React components to each row
    for (let i = 0; i < bidsInCart.length; i++) {
        const quantity: number = quantities[i];  
        let bid: Bid = bidsInCart[i];       

        // Method reference to POST updated id to pass into CartButtons
        const handleUpdateCart = (newQuantity: number) => {
            let bidToUpdate: Bid = createBid(newQuantity, bid.bidId, bid.customerId, bid.collectionAddress, bid.discountSchemeId);    
            const updateAction = updateBidInCartAsync(bidToUpdate);
            dispatch(updateAction);
            handleNotification(true, "bid added to cart"); 
        }

        // Method reference to set quantity to pass into CartButtons
        const setQuantity = (newQuantity: number) => {
            let newQuantites: number[] = [...quantities];
            newQuantites[i] = newQuantity;
            setQuantities(newQuantites);
            handleUpdateCart(newQuantity);
        };

        const toggleCheckedRowId = () => {
            const bidId: number = bid.bidId;
            if (!selectedRowIds.includes(bidId)) {
                setSelectedRowIds([...selectedRowIds, bidId])
            } else {
                let newSelectedRowIds: number[] = selectedRowIds.filter(id => id != bidId);
                setSelectedRowIds(newSelectedRowIds);
            }
        }

        const deleteBid = () => {
            const bidId: number = bid.bidId;
            const deleteAction = deleteBidFromCartAsync(bidId);
            dispatch(deleteAction);
            handleNotification(true, "item deleted");
        }

        let dateString = "";
        if (bid.discountScheme?.expiryDate) {
            let date: Date = new Date(bid.discountScheme.expiryDate.toString());
            dateString = date.toDateString();        
        }
    
        rows[i].updateCartComponent = <CartButtons quantity={quantity} setQuantity={setQuantity} size={"small"}/>
        rows[i].checkbox = <Checkbox size="small" onChange={toggleCheckedRowId} />
        rows[i].deleteButton = <Button size={"small"} variant={"contained"} color={"primary"} onClick={deleteBid}>Delete</Button>
        rows[i].detailPanel = <Typography variant={"body2"} align={"left"} paragraph={true} color={"textSecondary"} style={{margin: "10px"}}>
                <b>Min Collective Quantity</b> {bid.discountScheme?.minOrderQnty} <br/>
                <b>Description</b> {bid.discountScheme?.product?.description} <br/>
                <b>Bid Expiry Date</b> {dateString} <br/>
            </Typography>       
    }

    let accessors: string[] = Object.keys(new Row());
    const detailPanelName: string = "detailPanel";
    accessors = accessors.filter(accessor => accessor != detailPanelName);
    const columns: any[] = ["BidId", "Check Box", "Name", "Price per Item", "Quantity", "Delivery Charge", "Collection Address", "Remove"];

    return <Container maxWidth="xl">
        <OrderCheckoutComponent bids={bidsInCart} rowIds={selectedRowIds} />
        <br/>
        <DataTable data={rows} columnNames={columns} accessors={accessors} title="Cart" 
            idColumnAccessorName={"bidId"}             
            actionMessage="Make Order"  actionIcon={AddShoppingCartIcon}  
            detailPanelFielddName={detailPanelName} />
        <DialogueComponent open={open} setOpen={setOpen} message={notificationMessage} severity={"success"}/>
    </Container>
}

// Method reference to POST updated id to pass into CartButtons
function createBid(newQuantity: number, bidId: number, customerId: number, collectionAddress: string, discountSchemeId: number): Bid {
    let bid: Bid = new Bid();
    bid.bidId = bidId;
    bid.customerId = customerId;
    bid.collectionAddress = collectionAddress;
    bid.discountSchemeId = discountSchemeId;
    bid.quantity = newQuantity;
    
    return bid;
}

function createRowFromBid(bid: Bid): Row {

   

    let discountedPrice = bid.discountScheme?.discountedPrice as number;
    let originalPrice = bid.discountScheme?.product?.originalPrice as number;

    let row: Row = new Row();
    row.bidId = bid.bidId;
    row.collectionAddress = bid.collectionAddress;
    row.discountedPrice = `$${discountedPrice} (Save $${originalPrice - discountedPrice})`;
    row.deliveryCharge = "$" + bid.discountScheme?.deliveryCharge;
    row.name = bid.discountScheme?.product?.name;
    //row.tableData = { checked: true }   
    
    return row;
}
 