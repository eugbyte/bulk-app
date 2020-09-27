import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { Product } from "../models/Product";
import { RootState } from "../store/rootReducer";
import { getProductsAsync } from "../store/thunks/productThunk";
import { SelectListItem } from "../models/SelectListItem";
import { SelectUncontrolledComponent } from "../components/SelectComponent";
import { DatePickerUncontrolledComponent } from "../components/DatePickerComponent";
import { useForm } from "react-hook-form";
import { TextFieldUnControlledComponent } from "../components/TextFieldComponent";
import Button from '@material-ui/core/Button';

export function DiscountSchemeForm(): JSX.Element {
    document.title = "Create Discount Scheme";

    const dispatch: Dispatch<any> = useDispatch(); 

    const products: Product[] = useSelector((action: RootState) => action.productReducer.products as Product[] ) ?? [];  

    let selectListItems: SelectListItem[] = products.map(product => new SelectListItem(product.name, product.productId));

    useEffect(() => {
        const producerId: number = 1;
        const action = getProductsAsync(producerId);
        dispatch(action);
    }, []);

    const { errors, handleSubmit, control } = useForm();
    const onSubmit = (data: any) => console.log(data, errors);

    return <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justify="flex-start">
                <Grid item xs={1}>
                    <SelectUncontrolledComponent title={"Product"} selectListItems={selectListItems} name={"discountSchemes"} errorMessage="Scheme is required"
                    control={control} errors={errors} rules={{required: true}} />
                </Grid>
                <Grid item xs={12}>
                    <TextFieldUnControlledComponent isFullWidth={true} control={control} errors={errors} name={"discountedPrice"} label={"Discounted Price"} errorMessage={"Discounted Price is required"} 
                        rules={{required: true, min: 1}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextFieldUnControlledComponent isFullWidth={true} control={control} errors={errors} name={"minOrderQnty"} label={"Minimum order quantity"} errorMessage={"Minimum order quantity is required"} 
                        rules={{required: true, min: 1}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextFieldUnControlledComponent isFullWidth={true} control={control} errors={errors} name={"deliveryCharge"} label={"Delivery Charge"} errorMessage={"Delivery Charge is required"} 
                        rules={{required: true, min: 1}}/>        
                </Grid>
                <Grid item xs={2}>
                    <DatePickerUncontrolledComponent label={"Expiry Date"} name={"expiryDate"} 
                        control={control} errors={errors} rules={{required: true}} errorMessage={"Expiry Date is required"} />
                </Grid>
                <Grid item xs={12}><br/></Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button> 
                </Grid>
            </Grid>

            
                        
        </form>

    </Container>
}

