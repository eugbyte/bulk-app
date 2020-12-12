import { Button, Checkbox, Grid } from "@material-ui/core";
import React from "react";
import { CartButtons } from "../components/shared/CartButtons";
import { SelectControlledComponent } from "../components/shared/SelectComponents";
import { TextComponent } from "../components/shared/TextComponent";
import { Row as RowCart }  from "../containers/CartPage";
import { Row as RowOrder } from "../containers/OrdersPage";
import { Row as SchemeRow } from "../containers/ProducerDiscountSchemePage";
import { Row as RowProduct } from "../containers/ProductsPage";
import { Bid } from "../models/Bid";
import { DiscountScheme } from "../models/DiscountScheme";
import { Product } from "../models/Product";
import { SelectListItem } from "../models/SelectListItem";
import { DiscountSchemeService } from "./DiscountSchemeService";

export class DataTableService {

    static createRowFromBid_CartPage(bid: Bid, 
        handleChangeQuantity: (newQuantity: number)=>void, 
        toggleCheckedRowId: ()=>void,
        deleteBid: ()=>void,
        handleChangeAddress: (event: React.ChangeEvent<any>)=>void,
        ): RowCart {

        let discountedPrice = bid.discountScheme?.discountedPrice as number;
        let originalPrice = bid.discountScheme?.product?.originalPrice as number;
        let dateString = "";
        if (bid.discountScheme?.expiryDate) {
            let date: Date = new Date(bid.discountScheme.expiryDate.toString());
            dateString = date.toDateString();        
        }
        const quantity: number = bid.quantity as number;

        let row: RowCart = new RowCart();
        row.bidId = bid.bidId;
        row.discountedPrice = `$${discountedPrice} (Save $${originalPrice - discountedPrice})`;
        row.name = bid.discountScheme?.product?.name;

        const addressBidCountDict = bid.addressBidCountDict as Record<string, number>; 
        const numBidsAtAddress: number = addressBidCountDict[bid.collectionAddress];
        const deliveryCharge: number = bid?.discountScheme?.deliveryCharge ?? 0;
        const avgDeliveryCharge: number = (!numBidsAtAddress) ? deliveryCharge : deliveryCharge / (numBidsAtAddress + 1);
        row.deliveryCharge = <Grid container>
            <Grid item xs={6}>
                <span>{`$${avgDeliveryCharge.toString().slice(0, 4)}`}</span>
            </Grid>
            <Grid item xs={6}>
                <span style={{borderBottom:"1px solid black", display:"block", fontSize:"12px"}}>${deliveryCharge}</span>
                <span style={{fontSize:"12px"}}>{numBidsAtAddress} other bids here</span>
            </Grid>
        </Grid>

        row.updateCartComponent = <CartButtons quantity={quantity} setQuantity={handleChangeQuantity} size={"small"}/>
        row.checkbox = <Checkbox size="small" onChange={toggleCheckedRowId} />
        row.deleteButton = <Button size={"small"} variant={"contained"} color={"primary"} onClick={deleteBid}>Delete</Button>

        // Collection Address
        const selectListItems: SelectListItem[] = [];
        for (let address in addressBidCountDict) {
            let selectListItem: SelectListItem = new SelectListItem(address, address);
            selectListItem.selected = bid.collectionAddress === address;
            selectListItems.push(selectListItem);
        }        
        row.collectionAddress = <SelectControlledComponent title={"Delivery"} state={bid.collectionAddress?.toString()} 
            selectListItems={selectListItems} handleChange={handleChangeAddress} />

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
        row.detailPanel = <Grid container>
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
        
        return row;
    }

    static createRowFromBid_OrdersPage(bid: Bid): RowOrder {
        let discountedPrice: number = bid.discountScheme?.discountedPrice as number;
        let originalPrice: number = bid.discountScheme?.product?.originalPrice as number;
        let minOrderQnty: number = bid.discountScheme?.minOrderQnty as number;
        let currentTotalBids: number = bid.currentTotalBids as number;
    
        let row: RowOrder = new RowOrder();
        row.quantity = bid.quantity + "";
        row.collectionAddress = bid.collectionAddress;
        row.discountedPrice = `$${discountedPrice} (Save $${originalPrice - discountedPrice})`;
        row.deliveryCharge = "$" + bid.discountScheme?.deliveryCharge;
        row.name = bid.discountScheme?.product?.name;
        row.remainingBidsRequired = minOrderQnty - currentTotalBids;
    
        let expiryDate: Date = new Date(bid.discountScheme?.expiryDate as Date);    //json return date as strings
        row.bidExpiryDate = expiryDate.toDateString();
    
        if (bid.bidSuccessDate != null) {
            row.bidStatus = "SUCCESS";        
        } else if (new Date() > expiryDate) {
            row.bidStatus = "FAILED";
        } else {
            row.bidStatus = "PENDING";
        }
        
        return row;
    }

    static createRowFromProduct_ProductsPage(product: Product, updateProduct: ()=>void, onDeleteClick: ()=>void): RowProduct {
        let row: RowProduct = new RowProduct();
        row.name = product.name;
        row.originalPrice = "$" + product.originalPrice;
        row.category = product.category;
        row.description = product.description;

        // If product already has schemes, disallow delete
        const isDisableDelete: boolean = product.discountSchemes.length > 0;
        let tooltipMessage: string = isDisableDelete ? "Cannot delete product as it has dependent discount schemes" : "";

        row.update = <Button size="small" variant="outlined" onClick={updateProduct}>Update</Button>
        row.delete = <div className="tooltip__div-visible">
            <Button color="secondary" size="small" variant="outlined"  
                disabled={isDisableDelete} 
                onClick={onDeleteClick}>Delete
                <span className="tooltiptext">{tooltipMessage}</span>
            </Button> 
        </div> 

        return row;
    }

    static createRowFromScheme_ProducerDiscountSchemePage(ds: DiscountScheme, onNameClick: ()=>void, onDeleteClick: ()=>void): SchemeRow {
        let row: SchemeRow = new SchemeRow();
        if (ds == null) {
            return row;
        }
        
        const discountedPrice = ds.discountedPrice;
        const originalPrice = ds.product?.originalPrice;
        row.discountedPrice = <span>${discountedPrice} <del>${originalPrice}</del></span>
    
        const expiryDate: Date = new Date(ds.expiryDate as Date);
        row.bidExpiryDate = expiryDate.toDateString();
        row.deliveryCharge = "$" + ds.deliveryCharge;
        row.currentBids =  ds.bids
            .filter(bid => !bid.isInCart)
            .reduce((accum, bid) => accum + bid.quantity, 0);
    
        row.minOrderQnty = ds.minOrderQnty;
        row.bidStatus = DiscountSchemeService.determineStatusOfScheme(ds);

        // Disallow deleting of schemes which have bids
        const isDisableDelete: boolean = ds.bids.length > 0;
        let tooltipMessage: string = isDisableDelete ? "Cannot delete scheme as it has dependent bids" : "";

        row.name = <Button onClick={onNameClick} size="small" variant="outlined">{ds.product?.name}</Button> ;
        row.delete = <div className="tooltip__div-visible">
            <Button size="small" variant="outlined" color="secondary" disabled={isDisableDelete}
                onClick={onDeleteClick}>Delete
                    <span className="tooltiptext">{tooltipMessage}</span>
                </Button>
        </div> ;
    
        return row;    
    }
    
    


}
