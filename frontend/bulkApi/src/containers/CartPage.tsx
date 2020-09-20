import React, { useEffect, useState } from "react";
import { Bid } from "../models/Bid";
import { RootState } from "../store/rootReducer";
import { deleteBidFromCartAsync, getBidsOfCustomerInCartAsync, orderBidsFromCart, updateBidInCartAsync } from "../store/thunks/bidThunk";
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
import { SummaryDictComponent } from "../components/SummaryDictComponent";
import { useHistory } from "react-router-dom";


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
    const history = useHistory();          
    const dispatch: Dispatch<any> = useDispatch(); 

    // State to determine whether to show notification
    const [open, setOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const handleNotification = (isOpen: boolean, message: string) => {
        setOpen(isOpen);
        setNotificationMessage(message);
    }

    // The Bids received from the GET request
    const bidsInCart: Bid[] = useSelector((action: RootState) => action.bidReducer.bids as Bid[] ) ?? [];  
    console.log("bids received", bidsInCart);

    useEffect(() => {
        document.title = "Cart";
        const customerId = 1;
        const action = getBidsOfCustomerInCartAsync(customerId);
        dispatch(action);        
    }, []);

    // For some reason, useState(bidsInCart.map(bid => bid.quantity)) will produce only an empty array
    // React hooks are always one step behind. On next render, the state variable will have a new value.
    // as useEffect compares by memory location. useEffect(()=>{}, [bidsInCart.map()]) will produce a new array in memory

    const [quantities, setQuantities] = useState<number[]>([]);  //bidQuantites[], rows[], and bidsInCart[] have the same length and order

    // When the user selects the row (Bid) in the datatable
    const [selectedRowBidIds, setSelectedRowBidIds] = useState<number[]>([]);
    const handleOrder = () => {
        let bidsToOrder: Bid[] = bidsInCart.filter(bid => selectedRowBidIds.includes(bid.bidId));
        const action = orderBidsFromCart(bidsToOrder);
        dispatch(action);
    };

    //Response on update. If update is successful, make another request to get bids in cart
    const apiMessage: string = useSelector( (action: RootState) => action.bidReducer.httpMessage as string ) ?? ""; 
    useEffect(() => {
        console.log("useEffect updateResponseMessages", apiMessage);

        // if user successful update quantity or remove from cart, refresh page
        if (apiMessage.includes(ACTIONS.HTTP_UPDATE_SUCCESS) || apiMessage.includes(ACTIONS.HTTP_DELETE_SUCCESS)) {
            const customerId = 1;
            const action = getBidsOfCustomerInCartAsync(customerId);
            dispatch(action); 
        
        // upon successful GET bids, set the state for the bids' quantities
        } else if (apiMessage.includes(ACTIONS.HTTP_READ_SUCCESS)) {
            const bidQuantities: number[] = bidsInCart.map(bid => bid.quantity);    
            setQuantities(bidQuantities);
        }       

        // if user successfully makes an order, redirect to orders page
        if (apiMessage.includes(ACTIONS.HTTP_UPDATE_ORDER_SUCCESS)) {
            console.log(apiMessage);
            history.push("/orders")
        }
    }, [apiMessage]);

    // Convert the Bids to Rows to pass to the DataTable
    const rows: Row[] = bidsInCart.map(bid => createRowFromBid(bid));    

    // To add React components to each row
    for (let i = 0; i < bidsInCart.length; i++) {
        const quantity: number = quantities[i];  
        let bid: Bid = bidsInCart[i];       

        // Method reference to POST updated id to pass into CartButtons
        const handleUpdateCart = (newQuantity: number) => {
            let bidToUpdate: Bid = createBid(bid.bidId, newQuantity, bid.collectionAddress);    
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
            if (!selectedRowBidIds.includes(bidId)) {
                setSelectedRowBidIds([...selectedRowBidIds, bidId])
            } else {
                let newSelectedRowIds: number[] = selectedRowBidIds.filter(id => id !== bidId);
                setSelectedRowBidIds(newSelectedRowIds);
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

        let summaryDict: Record<string, any> = {
            "Min Collective Quantity": bid.discountScheme?.minOrderQnty,
            "Description": bid.discountScheme?.product?.description,
            "Bid Expiry Date": dateString,
            "Current total bids": bid.currentTotalBids,
            "Remaining bids required": bid.discountScheme?.minOrderQnty as number - (bid.currentTotalBids as number)
        }  

        rows[i].detailPanel = <SummaryDictComponent dictSummary={summaryDict} />       
    }

    let accessors: string[] = Object.keys(new Row());   // accessors allow the DataTable to access the properties of the Row object. 
    const detailPanelName: string = "detailPanel";  // Remove access to detailPanel property
    accessors = accessors.filter(accessor => accessor !== detailPanelName);
    const columnNames: any[] = ["BidId", "Check Box", "Name", "Price per Item", "Quantity", "Delivery Charge", "Collection Address", "Remove"];

    return <Container maxWidth="xl">
        <OrderCheckoutComponent bids={bidsInCart} rowIds={selectedRowBidIds} handleOrder={handleOrder} />
        <br/>
        <DataTable data={rows} columnNames={columnNames} accessors={accessors} title="Cart" 
            idColumnAccessorName={"bidId"}             
            actionMessage="Make Order"  actionIcon={AddShoppingCartIcon}  
            enabledDetailPanel={true} detailPanelFieldName={detailPanelName} />
        <DialogueComponent open={open} setOpen={setOpen} message={notificationMessage} severity={"success"}/>
    </Container>
}

// Method reference to POST updated id to pass into CartButtons
function createBid(bidId: number, newQuantity: number, collectionAddress: string): Bid {
    let bid: Bid = new Bid();
    bid.bidId = bidId;
    bid.collectionAddress = collectionAddress;
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
 