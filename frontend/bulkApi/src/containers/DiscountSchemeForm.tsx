import React, { useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { Container, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { Product } from "../models/Product";
import { RootState } from "../store/rootReducer";
import { getProductsAsync } from "../store/thunks/productThunk";
import { SelectListItem } from "../models/SelectListItem";
import { SelectComponent } from "../components/SelectComponent";
import { DatePickerComponent } from "../components/DatePickerComponent";
import { useForm } from "react-hook-form";
import { TextFieldComponent } from "../components/TextFieldComponent";
import { DiscountScheme } from "../models/DiscountScheme";

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

    console.log(products);

    const { register, errors, handleSubmit, control } = useForm();
    const onSubmit = (data: any) => console.log(data, errors);

    return <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextFieldComponent control={control} errors={errors} name={"minOrderQnty"} label={"Minimum order quantity"} errorMessage={"Minimum order quantity is required"} 
                rules={{required: true, min: 1}}/>
            <TextFieldComponent control={control} errors={errors} name={"discountedPrice"} label={"Discounted Price"} errorMessage={"Discounted Price is required"} 
                rules={{required: true, min: 1}}/>
            {/* <TextField id="minimum-order-qnty" label="Minimum Order Qnty" />
            <TextField id="discounted-price" label="Discounted Price"  />
            <TextField id="delivery-charge" label="Delivery Charge" />

            <DatePickerComponent label="Expiry Date" onChange={()=>{}}/>

            <SelectComponent title="Product" state={null} selectListItems={selectListItems} handleChange={()=>{}} /> */}
            <br/>
            <input type="submit" value="Submit" />
        </form>

    </Container>
}

