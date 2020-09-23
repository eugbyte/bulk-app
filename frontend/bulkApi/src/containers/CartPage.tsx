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
import { useHistory } from "react-router-dom";
import { CartDialog } from "../components/CartDialog";
import { SelectListItem } from "../models/SelectListItem";
import { SelectComponent } from "../components/SelectComponent";
import { Grid } from "@material-ui/core";
import { TextComponent } from "../components/TextComponent";
import { cloneDeep } from "lodash";

class Row {
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

    const [bidToUpdate, setBidToUpdate] = useState<Bid>(new Bid());
    const [showCartDialogue, setShowCartDialogue] = useState<boolean>(false);
    

    // The Bids received from the GET request
    const bidsInCart: Bid[] = useSelector((action: RootState) => action.bidReducer.bids as Bid[] ) ?? [];  
    const [bids, setBids] = useState<Bid[]>([]);
    useEffect(() => {
        setBids(cloneDeep(bidsInCart));
    }, [bidsInCart.length])
    console.log("bids received", bidsInCart);

    // For some reason, useState(bidsInCart.map(bid => bid.quantity)) will produce only an empty array
    // React hooks are always one step behind. On next render, the state variable will have a new value.
    useEffect(() => {
        document.title = "Cart";
        const customerId = 1;
        const action = getBidsOfCustomerInCartAsync(customerId);
        dispatch(action);        
    }, []); 

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
        // if user successful update quantity or remove from cart, refresh page
        if (apiMessage.includes(ACTIONS.HTTP_UPDATE_SUCCESS) || apiMessage.includes(ACTIONS.HTTP_DELETE_SUCCESS)) {
            const customerId = 1;
            // const action = getBidsOfCustomerInCartAsync(customerId);
            //dispatch(action); 
        }
        // if user successfully makes an order, redirect to orders page
        if (apiMessage.includes(ACTIONS.HTTP_UPDATE_ORDER_SUCCESS)) {
            console.log(apiMessage);
            history.push("/orders")
        }
    }, [apiMessage]);

    // Convert the Bids to Rows to pass to the DataTable
    const rows: Row[] = bids.map(bid => createRowFromBid(bid));    

    // To add React components to each row
    for (let i = 0; i < bids.length; i++) {
        let bid: Bid = bids[i];       
        const quantity: number = bid.quantity as number;

        // Method reference to POST updated id to pass into CartButtons
        const handleUpdateCart = (newQuantity: number, collectionAddress: string) => {
            //let bidToUpdate: Bid = createBid(bid.bidId, newQuantity, collectionAddress);
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
            let newBids = cloneDeep(bids).filter((bid, index) => index != i);
            console.log(bids, newBids);
            setBids(newBids);
        } 

        let dateString = "";
        if (bid.discountScheme?.expiryDate) {
            let date: Date = new Date(bid.discountScheme.expiryDate.toString());
            dateString = date.toDateString();        
        }

        rows[i].updateCartComponent = <CartButtons quantity={quantity} setQuantity={handleChangeQuantity} size={"small"}/>
        rows[i].checkbox = <Checkbox size="small" onChange={toggleCheckedRowId} />
        rows[i].deleteButton = <Button size={"small"} variant={"contained"} color={"primary"} onClick={deleteBid}>Delete</Button>

        // Collection Address
        const addressBidCountDict = bid.addressBidCountDict as Record<string, number>;   // { collectionAddress: number of bids} 
        const selectListItems: SelectListItem[] = [];
        for (let address in addressBidCountDict) {
            let selectListItem: SelectListItem = new SelectListItem(address, address);
            selectListItem.selected = bid.collectionAddress === address;
            selectListItems.push(selectListItem);
        }        
        rows[i].collectionAddress = <SelectComponent title={"Delivery"} state={bid.collectionAddress} selectListItems={selectListItems} handleChange={handleChangeAddress} />

        // Detail Panel
        let descriptionDict: Record<string, any> = {
            "Description": bid.discountScheme?.product?.description,
            "Bid Expiry Date": dateString
        }  

        let quantityDict: Record<string, any> = {
            "Min Order Quantity": bid.discountScheme?.minOrderQnty,
            "Current total bids": bid.currentTotalBids,
            "Remaining bids required": bid.discountScheme?.minOrderQnty as number - (bid.currentTotalBids as number)
        }

        let deliveryDict: Record<string, any> = {
            "Delivery Charge": "$" + bid.discountScheme?.deliveryCharge
        }
        rows[i].detailPanel = <Grid container>
            <Grid item xs={4}>
                <TextComponent textDict={descriptionDict}/>
            </Grid>
            <Grid item xs={4}>
                <TextComponent textDict={quantityDict}/>
            </Grid>
            <Grid item xs={4}>
                <TextComponent textDict={deliveryDict}/>
            </Grid>
        </Grid>
        
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
        <DialogueComponent open={open} setOpen={setOpen} message={notificationMessage} severity={"success"}/>
        <CartDialog open={showCartDialogue} toggleOpen={() => setShowCartDialogue(!showCartDialogue)} discountSchemeId={bidToUpdate.discountSchemeId} bidId={bidToUpdate.bidId} />
        
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
    row.discountedPrice = `$${discountedPrice} (Save $${originalPrice - discountedPrice})`;
    row.name = bid.discountScheme?.product?.name;

    const addressBidCountDict = bid.addressBidCountDict as Record<string, number>; 
    const numBidsAtAddress: number = addressBidCountDict[bid.collectionAddress];
    const deliveryCharge: number = bid?.discountScheme?.deliveryCharge ?? 0;
    const avgDeliveryCharge: number = (!numBidsAtAddress) ? deliveryCharge : deliveryCharge / numBidsAtAddress;
    row.deliveryCharge = <Grid container>
        <Grid item xs={6}>
            <span>{`$${avgDeliveryCharge}`}</span>
        </Grid>
        <Grid item xs={6}>
            <span style={{borderBottom:"1px solid black", display:"block", fontSize:"12px"}}>${deliveryCharge}</span>
            <span style={{fontSize:"12px"}}>{numBidsAtAddress} other bids here</span>
        </Grid>
    </Grid>
    
    return row;
}
 