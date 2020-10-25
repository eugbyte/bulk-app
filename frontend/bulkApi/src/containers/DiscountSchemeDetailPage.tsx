import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { DiscountScheme } from "../models/DiscountScheme";
import { RootState } from "../store/rootReducer";
import { getDiscountSchemeAsync } from "../store/thunks/discountSchemeThunk";
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { CartButtons } from "../components/CartButtons";
import e_commerce from '../images/e_commerce.png';
import { Bid } from "../models/Bid";
import { addBidToCartAsync, updateBidInCartAsync } from "../store/thunks/bidThunk";
import { SnackbarComponent } from "../components/SnackbarComponent"; 
import { SelectControlledComponent } from "../components/SelectComponents";
import { Grid } from "@material-ui/core";
import { SelectListItem } from "../models/SelectListItem";
import { TextComponent } from "../components/TextComponent";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export interface IProps {
    discountSchemeId: number;
    MODE: "CREATE" | "UPDATE";
    bidIdToUpdate?: number;
}

export function DiscountSchemeDetailPage({discountSchemeId, MODE, bidIdToUpdate=0}: IProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();  

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
    const avgDeliveryCharge: number = (!numBidsAtAddress) ? ds.deliveryCharge : ds.deliveryCharge / (numBidsAtAddress + 1);
 
    // POST bid when user bids for the discountScheme
    const submitBid = () => {
        let bid: Bid = new Bid();
        bid.customerId = 1;
        bid.collectionAddress = address;
        bid.quantity = quantity;

        let action = null;
        if (MODE === "CREATE") {
            bid.discountSchemeId = ds.discountSchemeId;
            action = addBidToCartAsync(bid);
        } else if (MODE === "UPDATE") {
            bid.bidId = bidIdToUpdate;
            action = updateBidInCartAsync(bid);
        }

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
    
    let leftExpiryDateDict: Record<string, any> = {
        "Expiry Date": dateString
    }
    let rightDescriptionDict: Record<string, any> = {
        "Description": ds.product?.description,
    }
    let leftPriceDict: Record<string, any> = {
        "Discounted Price": "$" + ds.discountedPrice,
    }
    let rightPriceDict: Record<string, any> = {
        "Original Price": "$" + ds.product?.originalPrice ?? "$"
    }
    let leftQuantityDict: Record<string, any> = {
        "Remaining Bids Needed": ds.minOrderQnty - currentBids,
    }
    let rightQuantityDict: Record<string, any> = {
        "Min Collective Quantity": ds.minOrderQnty,
        "Current Total Bids": currentBids,
    }
    let addressTextDict: Record<string, any> = {
        "Delivery Charge": "$" + ds.deliveryCharge,
        "Current bids at collection point": numBidsAtAddress,
    }
    let avgDeliveryChargeDict: Record<string, any> = {
        "Current Average Delivery charge": "approx $" + avgDeliveryCharge
    }    
    return  <Container maxWidth="sm">
        <Typography color="primary" variant="h5" align="left">{ds.product?.name ?? ""}</Typography>
        <CardMedia 
            component="img"
            image={e_commerce}
            title="https://acowebs.com/impact-ecommerce-society/"/>
        <br/>
        <Grid container>
            <Grid item xs={12}>
                    <TextComponent textDict={rightDescriptionDict}/>
                    <hr/>
                </Grid>
            <Grid item xs={12}>
                <TextComponent textDict={leftExpiryDateDict} color="textPrimary"/>
                <hr/>
            </Grid>           
            <Grid item xs={6}>
                <TextComponent textDict={leftPriceDict} color="textPrimary"/>
                <hr/>
            </Grid>
            <Grid item xs={6}>
                <TextComponent textDict={rightPriceDict}/>  
                <hr/>          
            </Grid>
            <Grid item xs={6}>
                <TextComponent textDict={leftQuantityDict} color="textPrimary"/>            
            </Grid>
            <Grid item xs={6}>
                <TextComponent textDict={rightQuantityDict}/>            
            </Grid>
        </Grid>
        
        <hr/>
        <Grid container>
            <Grid item xs={4}>        
                <SelectControlledComponent title={"Delivery"} state={address} selectListItems={selectListItems} handleChange={handleChangeAddress} />
            </Grid>
            <Grid item xs={8}>
                <TextComponent textDict={addressTextDict} />
                <TextComponent textDict={avgDeliveryChargeDict} color="textPrimary" />
            </Grid>
        </Grid>
        <hr/>
       
        <CartButtons quantity={quantity} setQuantity={setQuantity} align={"alignCenter"}/>
        <ButtonGroup size={"medium"}>            
            <Button  onClick={submitBid} color="primary" variant="contained" disabled={!address || quantity < 1}>Add To Cart</Button>           
          </ButtonGroup>
        <SnackbarComponent open={open} setOpen={setOpen} message={"Bid successfully created"} severity={"success"}/>
    </Container>
}