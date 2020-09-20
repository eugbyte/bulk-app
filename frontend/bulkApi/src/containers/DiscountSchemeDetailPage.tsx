import React, { useEffect, useState } from "react";
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
import { DialogueComponent } from "../components/DialogueComponent"; 
import { SelectComponent } from "../components/SelectComponent";
import { Grid } from "@material-ui/core";
import { SelectListItem } from "../models/SelectListItem";
import { TextComponent } from "../components/TextComponent";

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

    let ds: DiscountScheme = useSelector((action: RootState) => action.discountSchemeReducer.discountScheme as DiscountScheme ) ?? new DiscountScheme();      

    console.log("in DiscountSchemeDetailPage", ds);

    // Collection Address
    const addressBidCountDict = ds.addressBidCountDict as Record<string, number>;   // { collectionAddress: number of bids} 
    const selectListItems: SelectListItem[] = [];
    for (let address in addressBidCountDict) {
        let selectListItem: SelectListItem = new SelectListItem(address, address);
        selectListItems.push(selectListItem);
    }

    const [address, setAddress] = useState<string>("");
    const handleChangeAddress = (event: React.ChangeEvent<any>) => {
        let selectedAddress: string = event.target.value;
        console.log(selectedAddress);
        setAddress(selectedAddress);
    }
    const numBidsAtAddress: number = addressBidCountDict[address];
    const avgDeliveryCharge: number = (!numBidsAtAddress) ? ds.deliveryCharge : ds.deliveryCharge / numBidsAtAddress;
 
    // POST bid when user bids for the discountScheme
    const submitBid = () => {
        let bid: Bid = new Bid();
        bid.customerId = 1;
        bid.collectionAddress = "AMK";
        bid.discountSchemeId = ds.discountSchemeId;
        bid.quantity = quantity;

        const action = addBidToCartAsync(bid);
        dispatch(action);
        setOpen(true);
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

    let textDict: Record<string, any> = {
        "Description": ds.product?.description,
        "Original Price": "$" + ds.product?.originalPrice ?? "$",
        "Discounted Price": "$" + ds.discountedPrice,
        "Min Collective Quantity": ds.minOrderQnty,
        "Current Total Bids": currentBids,
        "Remaining Bids Needed": ds.minOrderQnty - currentBids,
        "Expiry Date": dateString
    } 

    let addressTextDict: Record<string, any> = {
        "Delivery Charge": "$" + ds.deliveryCharge,
        "Current bids at collection point": numBidsAtAddress,
        "Current Average Delivery charge": "approx $" + avgDeliveryCharge
    }
    
    return  <Container maxWidth="sm">
        <Typography color="primary" variant="h5" align="left">{ds.product?.name ?? ""}</Typography>
        <CardMedia 
            component="img"
            image={e_commerce}
            title="https://acowebs.com/impact-ecommerce-society/"/>
        <br/>
        <TextComponent textDict={textDict}/>
        <hr/>
        <Grid container>
            <Grid item xs={4}>        
                <SelectComponent title={"Delivery"} state={address} selectListItems={selectListItems} handleChange={handleChangeAddress} />
            </Grid>
            <Grid item xs={8}>
                <TextComponent textDict={addressTextDict} />
            </Grid>
        </Grid>
        <hr/>
       
        <CartButtons quantity={quantity} setQuantity={setQuantity} actionTitle={"Update Cart"} action={submitBid} align={"alignCenter"}/>
        <DialogueComponent open={open} setOpen={setOpen} message={"Bid successfully created"} severity={"success"}/>
    </Container>
}