import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useParams } from "react-router-dom";
import { DiscountScheme } from "../models/DiscountScheme";
import { RootState } from "../store/rootReducer";
import { getDiscountSchemeAsync } from "../store/thunks/discountSchemeThunk";
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { CartButtons } from "../components/CartButtons";
import e_commerce from '../images/e_commerce.png';
import { Bid } from "../models/Bid";
import { addBidToCartAsync } from "../store/thunks/bidThunk";
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogueComponent } from "../components/DialogueComponent";
import { errorActionCreator } from "../store/errorAction";
import { ACTIONS } from "../store/actionEnums";
import MaterialTable from "material-table";
import { MaterialTableComponent } from "../components/MaterialTableComponent";

export function DiscountSchemeDetailPage(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();  
    
    // DiscountScheme Id parse from route parameter
    let routeParams: Record<string, string>  = (useParams()) as Record<string, string>;
    const discountSchemeId: number = parseInt(routeParams["discountSchemeId"]);

    // Quantity to add to cart
    const [quantity, setQuantity] = useState(1);

    // State to determine whether to show notification
    const [open, setOpen] = useState(false);
  
    // The discountScheme retrieved through a GET request
    useEffect(() => {
        const action = getDiscountSchemeAsync(discountSchemeId);
        dispatch(action);
        
        // Note that you cannot pass values obtained from useSelector to the useEffect dependency array
        // Since you are returning a new object (at a different memory address) from the reducer, 
        // useEffect will treat it that vaLue changed when doing shallow comparison
    }, [discountSchemeId]);  
    let ds: DiscountScheme = useSelector((action: RootState) => action.discountSchemeReducer.discountScheme as DiscountScheme );      

    // The error, if any, when GET the discountScheme
    const error = useSelector((action: RootState) => action.errorReducer.error as Error);   

    // When user dismisses error notification, clean up errors with this callback function
    const cleanUpError = () => {
        console.log("cleaning up");
        const action = errorActionCreator(ACTIONS.CLEAR_ERROR);
        dispatch(action);
    };
    
    // When an error occurs, set notification state to true to display notification
    useEffect(() => {
        console.log(error);
        if (error) {
            setOpen(true);
        } else {
            setOpen(false);
        } 
    }, [error]);    
    
    // The time when the bid is successfully created through the POST request
    let isOkTime: Date = useSelector((action: RootState) => action.bidReducer.isOkTime as Date );
    console.log(isOkTime);  
    
    // Whenever user successfully submits POST request, set notification state to true to display notification
    useEffect(() => {
        if (isOkTime) {
            setOpen(true);
        }
        console.log("isOkTime", isOkTime);
    }, [isOkTime]);

    // If API is loading or returns an error ...
    if (!ds || error) {
        return <Container maxWidth="sm">
            <p>Loading Discount Scheme...</p>  
            <CircularProgress /> 
            <DialogueComponent open={open} setOpen={setOpen} message={"Failed to retrieve product"} severity={"error"} cleanUp={cleanUpError} />
        </Container>
    } 
 
    // POST bid when user bids for the discountScheme
    const submitBid = () => {
        let bid: Bid = new Bid();
        bid.customerId = 1;
        bid.collectionAddress = "AMK";
        bid.discountSchemeId = ds.discountSchemeId;
        bid.quantity = quantity;

        const action = addBidToCartAsync(bid);
        dispatch(action);
    };

    
    // The details of the the discountScheme to display
    let dateString: string = "";
    if (ds.expiryDate) {
        let date: Date = new Date(ds.expiryDate.toString());
        dateString = date.toDateString();
    }  

    let currentBids: number = ds.bids
            .filter(bid => !bid.isInCart)
            .reduce((accum, bid) => accum + bid?.quantity, 0);

    let textDict = {
        "Description": ds.product?.description,
        "Original Price": "$" + ds.product?.originalPrice ?? "$",
        "Discounted Price": "$" + ds.discountedPrice,
        "Min Order Quantity": ds.minOrderQnty,
        "Current Total Bids": currentBids,
        "Remaining Bids Needed": ds.minOrderQnty - currentBids,
        "Expiry Date": dateString
    } 
    
    let paras: JSX.Element[] = [];
    for (let [key, value] of Object.entries(textDict)) {
        let para: JSX.Element = <Typography variant="body2" color="textSecondary" component="p" align="left" key={key}>
            <b>{key}&nbsp;</b>{value} 
        </Typography>
        paras.push(para)
    }

    let title = ds.product?.name ?? "";
    
    return  <Container maxWidth="sm">
        <Typography color="primary" variant="h5" align="left">{title}</Typography>
        <CardMedia 
            component="img"
            image={e_commerce}
            title="https://acowebs.com/impact-ecommerce-society/"/>
        <br/>
        {paras}
        <CartButtons quantity={quantity} setQuantity={setQuantity} actionTitle={"Update Cart"} action={submitBid}/>
        <DialogueComponent open={open} setOpen={setOpen} message={"Bid successfully created"} severity={"success"}/>
    </Container>
}