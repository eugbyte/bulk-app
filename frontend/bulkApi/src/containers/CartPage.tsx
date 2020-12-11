import React, { useEffect, useState } from "react";
import { Bid } from "../models/Bid";
import { RootState } from "../store/rootReducer";
import { deleteBidFromCartAsync, getBidsOfCustomerInCartAsync, orderBidsFromCart, updateBidInCartAsync } from "../store/thunks/bidThunk";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { DataTable } from "../components/shared/DataTable";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { SnackbarComponent } from "../components/shared/SnackbarComponent";
import { Container } from "@material-ui/core";
import { OrderCheckoutComponent } from "../components/cartPage/OrderCheckoutComponent";
import { ACTIONS } from "../store/actionEnums";
import { useHistory } from "react-router-dom";
import { cloneDeep } from "lodash";
import { DataTableService } from "../services/DataTableService";

export class Row {
    bidId: number | undefined;
    checkbox: JSX.Element | undefined;
    name: string | undefined;
    discountedPrice: string | undefined;
    updateCartComponent: JSX.Element | undefined;    
    collectionAddress: JSX.Element | undefined;
    deliveryCharge: JSX.Element | undefined;
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
    const [bids, setBids] = useState<Bid[]>([]);
    useEffect(() => {
        setBids(cloneDeep(bidsInCart));
    }, [bidsInCart.length, JSON.stringify(bidsInCart)])

    // For some reason, useState(bidsInCart.map(bid => bid.quantity)) will produce only an empty array
    // React hooks are always one step behind. On next render, the state variable will have a new value.
    useEffect(() => {
        document.title = "Cart";
        const customerId = 1;
        const action = getBidsOfCustomerInCartAsync(customerId);
        dispatch(action);        
    }, [dispatch]); 

    // When the user selects the row (Bid) in the datatable
    const [selectedRowBidIds, setSelectedRowBidIds] = useState<number[]>([]);
    const handleOrder = () => {
        let bidsToOrder: Bid[] = bids.filter(bid => selectedRowBidIds.includes(bid.bidId));
        const action = orderBidsFromCart(bidsToOrder);
        dispatch(action);
    };

    //Response on update. If update is successful, make another request to get bids in cart
    const apiMessage: string = useSelector( (action: RootState) => action.bidReducer.httpMessage as string ) ?? ""; 
    useEffect(() => {

        // if user successfully makes an order, redirect to orders page
        if (apiMessage.includes(ACTIONS.HTTP_UPDATE_ORDER_SUCCESS)) {
            history.push("/orders");
        }
    }, [apiMessage, history]);

    // Convert the Bids to Rows to pass to the DataTable
    // const rows: Row[] = bids.map(bid => createRowFromBid(bid));
    let rows: Row[] = [];    

    // To add React components to each row
    for (let i = 0; i < bids.length; i++) {
        let bid: Bid = bids[i];       

        // Method reference to POST updated id to pass into CartButtons
        const handleUpdateCart = (newQuantity: number, collectionAddress: string) => {
            let bidsCopy: Bid[] = cloneDeep(bidsInCart);    
            let bidCopy = bidsCopy[i];
            bidCopy.quantity = newQuantity;
            bidCopy.collectionAddress = collectionAddress;
            setBids(bidsCopy);
            const updateAction = updateBidInCartAsync(bidCopy);
            dispatch(updateAction);
            handleNotification(true, "bid added to cart"); 
        }

        // Method reference to set quantity to pass into CartButtons
        const handleChangeQuantity = (newQuantity: number) => {
            handleUpdateCart(newQuantity, bid.collectionAddress);            
        };

        const handleChangeAddress = (event: React.ChangeEvent<any>) => {
            let selectedAddress: string = event.target.value;
            handleUpdateCart(bid.quantity, selectedAddress);
        }

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
            let newBids = cloneDeep(bids).filter((bid, index) => index !== i);
            setBids(newBids);
        } 

        let row: Row = DataTableService.createRowFromBid_CartPage(bid, handleChangeQuantity, toggleCheckedRowId, deleteBid, handleChangeAddress);
        rows.push(row);
        
    }

    let accessors: string[] = Object.keys(new Row());   // accessors allow the DataTable to access the properties of the Row object. 
    const detailPanelName: string = "detailPanel";  // Remove access to detailPanel property
    accessors = accessors.filter(accessor => accessor !== detailPanelName);
    const columnNames: any[] = ["BidId", "Check Box", "Name", "Price per Item", "Quantity", "Collection Address", "Average Delivery Charge", "Remove"];

    return <Container maxWidth="xl">
        <OrderCheckoutComponent bids={bids} rowIds={selectedRowBidIds} handleOrder={handleOrder} />
        <br/>
        <DataTable data={rows} columnNames={columnNames} accessors={accessors} title="Cart" 
            idColumnAccessorName={"bidId"}             
            actionMessage="Make Order"  actionIcon={AddShoppingCartIcon}  
            enabledDetailPanel={true} detailPanelFieldName={detailPanelName} />
        <SnackbarComponent open={open} setOpen={setOpen} message={notificationMessage} severity={"success"}/>        
    </Container>
}
 