import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { DataTable } from "../components/shared/DataTable";
import { DiscountScheme } from "../models/DiscountScheme";
import { RootState } from "../store/rootReducer";
import { deleteDiscountSchemeAsync, getDiscountSchemesWithBidOfProducer } from "../store/thunks/discountSchemeThunk";
import { cloneDeep, uniqBy } from "lodash";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { SelectControlledComponent } from "../components/shared/SelectComponents";
import { SelectListItem } from "../models/SelectListItem";
import { Product } from "../models/Product";
import { DialogComponent } from "../components/shared/DialogComponent";
import { TextComponent } from "../components/shared/TextComponent";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { ACTIONS } from "../store/actionEnums";
import { DataTableService } from "../services/DataTableService";
import { DiscountSchemeService, Status } from "../services/DiscountSchemeService";


export class Row {
    name: JSX.Element | undefined;
    discountedPrice: JSX.Element | undefined;
    deliveryCharge: string | undefined = "0";
    minOrderQnty: number | undefined = 0;
    currentBids: number | undefined = 0;    
    bidExpiryDate: string | undefined  = "";
    bidStatus: Status;
    delete: JSX.Element | undefined;
}

export function ProducerDiscountSchemePage(): JSX.Element {

    document.title = "Schemes";
    const producerId: number = 2;
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory(); 

    // Single source of truth, avoid mutating it
    const immutableDiscountSchemes: DiscountScheme[] = useSelector((action: RootState) => action.discountSchemeReducer.discountSchemes as DiscountScheme[]) ?? [];
    useEffect(() => {
        
        const action = getDiscountSchemesWithBidOfProducer(producerId);
        dispatch(action);
    }, [dispatch]);

    // For the AutoComplete Filter
    let products: Product[] = immutableDiscountSchemes.map(ds => ds.product ?? new Product());
    products = uniqBy(products, (product) => product.name);    

    // DiscountSchemes to dispaly to the data table, subject to filtering
    const [discountSchemes, setDiscountSchemes] = useState<DiscountScheme[]>([]);
    useEffect(() => {
        setDiscountSchemes(immutableDiscountSchemes);        
    }, [immutableDiscountSchemes.length, immutableDiscountSchemes]);

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
        setProductName(name);
    }

    useEffect(() => {
        let discountSchemesCopy: DiscountScheme[] = cloneDeep(immutableDiscountSchemes);
        discountSchemesCopy = discountSchemesCopy
            .filter(ds => status ? DiscountSchemeService.determineStatusOfScheme(ds) === status : true )
            .filter(ds => productName ? ds.product?.name?.toLowerCase()?.includes(productName.toLowerCase()) : true)
        setDiscountSchemes(discountSchemesCopy);
    }, [status, productName, immutableDiscountSchemes]);

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

    // When user clicks delete in the opened product dialog, close it, then open another and confirm delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); 
    const [targetDiscountScheme, setTargetDiscountScheme] = useState<DiscountScheme>(new DiscountScheme());
    const deleteProduct = () => {
        if (targetDiscountScheme.bids.length > 0) {
            return;
        }
        const deleteAction = deleteDiscountSchemeAsync(targetDiscountScheme.discountSchemeId);
        dispatch(deleteAction);
        setOpenDeleteDialog(false);
    } 

    let httpResponseMessage: string = useSelector((action: RootState) => action.discountSchemeReducer.httpMessage as string) ?? "";
    useEffect(() => {
        if (httpResponseMessage.includes(ACTIONS.HTTP_DELETE_SUCCESS)) {
            
            const action = getDiscountSchemesWithBidOfProducer(producerId);
            dispatch(action);
        }
    }, [httpResponseMessage, dispatch]);

    // Set the rows for the datatable
    for (let ds of discountSchemes) {
        const onNameClick = () => {
            let product: Product = discountSchemes
                .map(ds => ds.product)
                .find(product => product?.productId === ds.productId) ?? new Product();
            setProduct(product);

            setOpenProductDialog(!openProductDialog);
        };
        const onDeleteClick = () => {
            setTargetDiscountScheme(ds);
            setOpenDeleteDialog(true);
        }

        let row: Row = DataTableService.createRowFromScheme_ProducerDiscountSchemePage(ds, onNameClick, onDeleteClick);
        rows.push(row);
    }

    
    const columnNames: string[] = ["Name", "Discounted Price", "Delivery Charge",  "Min Order Qnty", "Current Bids","Expiry Date", "Bid Status", "Delete"];
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
            content={productTextComponent} showPicture />
        <DialogComponent open={openDeleteDialog} toggleOpen={() => setOpenDeleteDialog(!openDeleteDialog)} content={<p>Confirm Delete?</p>}
            secondaryAction={deleteProduct} secondaryActionTitle="Delete Product"/>
    </Container>
}

