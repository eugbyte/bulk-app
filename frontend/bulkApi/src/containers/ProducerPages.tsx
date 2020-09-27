import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { DataTable } from "../components/DataTable";
import { DiscountScheme } from "../models/DiscountScheme";
import { RootState } from "../store/rootReducer";
import { getDiscountSchemesWithBidOfProducer } from "../store/thunks/discountSchemeThunk";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { cloneDeep } from "lodash";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { SelectControlledComponent } from "../components/SelectComponent";
import { SelectListItem } from "../models/SelectListItem";

type Status = "SUCCESS" | "PENDING" | "FAILED" | undefined;

class Row {
    name: string | undefined = "";
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
    }, [])

    const [discountSchemes, setDiscountSchemes] = useState<DiscountScheme[]>([]);
    useEffect(() => {
        console.log(immutableDiscountSchemes);
        setDiscountSchemes(immutableDiscountSchemes);
    }, [immutableDiscountSchemes.length]);

    const rows: Row[] = discountSchemes.map(ds => createRowFromScheme(ds));
    const columnNames: string[] = ["Name", "Discounted Price", "Delivery Charge",  "Min Order Qnty", "Current Bids","Expiry Date", "Bid Status"];
    const accessors: string[] = Object.keys(new Row());

    const [status, setStatus] = useState<Status>();
    const handleStatusChange = ((event: React.ChangeEvent<any>) => {
        let selectedStatus: Status = event.target.value as Status;
        setStatus(selectedStatus);
    });

    const selectListItems: SelectListItem[] = ["SUCCESS", "PENDING", "FAILED"].map((status) => new SelectListItem(status, status));

    useEffect(() => {
        let discountSchemesCopy: DiscountScheme[] = cloneDeep(immutableDiscountSchemes);
        discountSchemesCopy = discountSchemesCopy
            .filter(ds => status ? determineStatusOfScheme(ds) === status : true );
        setDiscountSchemes(discountSchemesCopy);
    }, [status]);

    const redirectToForm = () => history.push("/producer/discountSchemes/create");
   

    return <Container maxWidth="lg">
        <Grid container>
            <Grid item xs={2}>
                <SelectControlledComponent title="Status" state={status} selectListItems={selectListItems} handleChange={handleStatusChange}  />
            </Grid> 
            <Grid item xs={8}></Grid>     
            <Grid item xs={2}>
                <Button onClick={redirectToForm} variant="contained" color="primary">
                    Create Scheme
                </Button>
            </Grid>        
        </Grid>
        <br/>
        <DataTable columnNames={columnNames} accessors={accessors} data={rows} title={"Discount Schemes"} enablePaging={true} pageSize={5} />
    </Container>
}

function createRowFromScheme(ds: DiscountScheme): Row {
    let row: Row = new Row();
    if (ds == null) {
        return row;
    }
    row.name = ds.product?.name;
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