import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { DataTable } from "../components/DataTable";
import { DiscountScheme } from "../models/DiscountScheme";
import { RootState } from "../store/rootReducer";
import { getDiscountSchemesWithBidOfProducer } from "../store/thunks/discountSchemeThunk";
import { cloneDeep, uniqBy } from "lodash";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { SelectControlledComponent } from "../components/SelectComponents";
import { SelectListItem } from "../models/SelectListItem";
import { Product } from "../models/Product";
import { DialogComponent } from "../components/DialogComponent";
import { TextComponent } from "../components/TextComponent";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { deleteProductAsync } from "../store/thunks/productThunk";

type Status = "SUCCESS" | "PENDING" | "FAILED" | undefined;

class Row {
    name: JSX.Element | undefined;
    discountedPrice: JSX.Element | undefined;
    deliveryCharge: string | undefined = "0";
    minOrderQnty: number | undefined = 0;
    currentBids: number | undefined = 0;    
    bidExpiryDate: string | undefined  = "";
    bidStatus: Status
}

export function ProducerPage(): JSX.Element {

    document.title = "Orders";
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory(); 

    // Single source of truth, avoid mutating it
    const immutableDiscountSchemes: DiscountScheme[] = useSelector((action: RootState) => action.discountSchemeReducer.discountSchemes as DiscountScheme[]) ?? [];
    useEffect(() => {
        const producerId: number = 1;
        const action = getDiscountSchemesWithBidOfProducer(producerId);
        dispatch(action);
    }, []);

    // For the AutoComplete Filter
    let products: Product[] = immutableDiscountSchemes.map(ds => ds.product ?? new Product());
    products = uniqBy(products, (product) => product.name);    

    // DiscountSchemes to dispaly to the data table, subject to filtering
    const [discountSchemes, setDiscountSchemes] = useState<DiscountScheme[]>([]);
    useEffect(() => {
        console.log(immutableDiscountSchemes);
        setDiscountSchemes(immutableDiscountSchemes);        
    }, [immutableDiscountSchemes.length]);

    const [status, setStatus] = useState<Status>();
    const handleStatusChange = ((event: React.ChangeEvent<any>) => {
        let selectedStatus: Status = event.target.value as Status;
        setStatus(selectedStatus);
    });

    //Status filtering
    const selectListItems: SelectListItem[] = ["SUCCESS", "PENDING", "FAILED"].map((status) => new SelectListItem(status, status));
    
    // Product name filtering
    const [productName, setProductName] = useState<string>("");
    const handleChangeProductName = (name: string) => {
        console.log(name);
        setProductName(name);
    }

    useEffect(() => {
        let discountSchemesCopy: DiscountScheme[] = cloneDeep(immutableDiscountSchemes);
        discountSchemesCopy = discountSchemesCopy
            .filter(ds => status ? determineStatusOfScheme(ds) === status : true )
            .filter(ds => productName ? ds.product?.name?.toLowerCase()?.includes(productName.toLowerCase()) : true)
        setDiscountSchemes(discountSchemesCopy);
    }, [status, productName]);

    // To display the product as a dialog when user clicks on the link
    const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>(new Product());
    let productTextDict: Record<string, any> = {
        "Name": product.name,
        "Original Price": "$" + product.originalPrice,
        "Category": product.category,
        "Description": product.description        
    }
    let productTextComponent: JSX.Element = <TextComponent textDict={productTextDict} />

    // To redirect user to create discount Scheme
    const redirectToForm = () => history.push("/producer/discountSchemes/create");   

    // To create rows for the data table
    const rows: Row[] = [];

    for (let ds of discountSchemes) {
        let row: Row = createRowFromScheme(ds);
        const onClick = () => {
            let product: Product = discountSchemes
                .map(ds => ds.product)
                .find(product => product?.productId === ds.productId) ?? new Product();
            setProduct(product);

            setOpenProductDialog(!openProductDialog);
        };
        row.name = <Button onClick={onClick} size="small" variant="outlined">{ds.product?.name}</Button> ;
        rows.push(row);
    }

    //For when the user opens the Product Dialog
    const updateProduct = () => history.push("/producer/product/" + product.productId);
    const deleteProduct = () => {
        if (product.discountSchemes.length > 0) {
            return;
        }
        const action = deleteProductAsync(product.productId);
        dispatch(action);
    }

    // When user clicks delete in the opened product dialog, close it, then open another and confirm delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const handleOnDeleteClick = () => {
        setOpenProductDialog(false);
        setOpenDeleteDialog(true);
    }

    // Error Handling
    

    // For the Data Table
    const columnNames: string[] = ["Name", "Discounted Price", "Delivery Charge",  "Min Order Qnty", "Current Bids","Expiry Date", "Bid Status"];
    const accessors: string[] = Object.keys(new Row());        

    return <Container maxWidth="lg">
        <Grid container>
            <Grid item xs={2}>
                <SelectControlledComponent title="Status" state={status} selectListItems={selectListItems} handleChange={handleStatusChange}  />
            </Grid> 
            <Grid item xs={3}>
            <Autocomplete
                id="combo-box-demo"
                options={products}
                getOptionLabel={(option: Product) => option.name ?? ""}
                style={{ width: 300 }}
                onInputChange={(event, value) => handleChangeProductName(value)}
                renderInput={(params) => <TextField {...params} label="Products" variant="outlined" />}
            />
            </Grid>
            <Grid item xs={5}></Grid>     
            <Grid item xs={2}>
                <Button onClick={redirectToForm} variant="contained" color="primary">
                    Create Scheme
                </Button>
            </Grid>        
        </Grid>
        <br/>
        <DataTable columnNames={columnNames} accessors={accessors} data={rows} title={"Discount Schemes"} enablePaging={true} pageSize={5} />
        
        <DialogComponent open={openProductDialog} toggleOpen={() => setOpenProductDialog(!openProductDialog)} 
            content={productTextComponent} showPicture 
            action={updateProduct} actionTitle="Update Product"
            secondaryAction={handleOnDeleteClick} secondaryActionTitle="Delete Product"/>

        <DialogComponent open={openDeleteDialog} toggleOpen={() => setOpenDeleteDialog(!openDeleteDialog)} content={<p>Confirm Delete?</p>}
            secondaryAction={deleteProduct} secondaryActionTitle="Delete Product"/>
    </Container>
}

function createRowFromScheme(ds: DiscountScheme): Row {
    let row: Row = new Row();
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
    row.bidStatus = determineStatusOfScheme(ds);

    return row;    
}

function determineStatusOfScheme(ds: DiscountScheme): Status {
    const expiryDate: Date = new Date(ds.expiryDate as Date);

    const isSchemeSuccess: boolean = ds.bids.some(bid => bid.bidSuccessDate != null);
    const hasBidExpired: boolean = expiryDate < new Date();

    if (isSchemeSuccess) {
        return "SUCCESS"
    } else if (!isSchemeSuccess && hasBidExpired ) {
        return "FAILED";
    } else {
        return "PENDING";
    }
}