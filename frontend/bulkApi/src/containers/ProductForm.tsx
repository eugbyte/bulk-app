import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { useHistory, useParams } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextFieldUncontrolledComponent } from "../components/TextFieldComponents";
import { Product } from "../models/Product";
import { createProductsAsync, getProductAsync, updateProductAsync } from "../store/thunks/productThunk";
import { RootState } from "../store/rootReducer";
import Button from '@material-ui/core/Button';
import { ACTIONS } from "../store/actionEnums";
import { useState } from "react";
import { SnackbarComponent } from "../components/SnackbarComponent";

enum FORM_NAMES {
    productId = "productId",
    name = "name",
    category = "category",
    description = "description",
    originalPrice = "originalPrice"
}

type FORM_DATA = {
    "productId" : number,
    "name": string;
    "category": string;
    "description": string;
    "originalPrice": number;
}


// User can either Create or Update the product
type MODE = "CREATE" | "UPDATE";

export function ProductForm(): JSX.Element {
    document.title = "Product Form";
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory();

    // If creating, route param is set to 0. If update, route param is set to existing productId
    let routeParams: Record<string, string>  = (useParams()) as Record<string, string>;    
    const productId: number = parseInt(routeParams["productId"]); 
    const mode: MODE = productId === 0 ? "CREATE" : "UPDATE";

    let productToUpdate: Product = useSelector((action: RootState) => action.productReducer.product as Product ) ?? new Product();

    useEffect(() => {
        if (mode === "UPDATE") {
            const action = getProductAsync(productId);
            dispatch(action);
        }   
    }, [productId]);   

    const { errors, handleSubmit, control, getValues, reset, setValue } = useForm<FORM_DATA>(); 

    useEffect(() => {
        if (mode === "UPDATE") {
            setValue(FORM_NAMES.productId, productToUpdate.productId);
            setValue(FORM_NAMES.name, productToUpdate.name);
            setValue(FORM_NAMES.category, productToUpdate.category);
            setValue(FORM_NAMES.description, productToUpdate.description);
            setValue(FORM_NAMES.originalPrice, productToUpdate.originalPrice);
        }
    }, [JSON.stringify(productToUpdate)])
    
    

    const onSubmit = (data: any) => {

        const {productId, name, category, description, originalPrice} = data;        
        //getValues([FORM_NAMES.productId, FORM_NAMES.name, FORM_NAMES.category, FORM_NAMES.description, FORM_NAMES.originalPrice]);
        const product = initializeProduct(productId, name, category, description, originalPrice);
        console.log("submitting product", product);
        if (mode === "CREATE") {
            const action = createProductsAsync(product);
            dispatch(action);
            reset({});
        } else if (mode === "UPDATE") {
            product.producerId = productToUpdate.producerId;
            const action = updateProductAsync(productId, product);
            dispatch(action);
            //reset(product);
        }                
    };
    
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const apiMessage: string = useSelector( (action: RootState) => action.productReducer.httpMessage as string ) ?? ""; 
    useEffect(() => {
        if (apiMessage.includes(ACTIONS.HTTP_CREATE_SUCCESS) || apiMessage.includes(ACTIONS.HTTP_UPDATE_SUCCESS)) {
            setOpenSnackbar(true);
        }        
    }, [apiMessage]);

    return <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <GridRow display="none" component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.productId} label={"Product Id"} 
                    rules={{required: false}}  />
            }/>
            
            <GridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.name} label={"Name"} 
                    rules={{required: true}} errorMessage="Name is required" />
            }/>

            <GridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.originalPrice} label={"Original Price"} 
                    rules={{required: true, min: 1}} adornment={"$"} errorMessage="Original Price is required" />
            } />

            <GridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.category} label={"Category"} 
                    rules={{required: false}} />
            }/>

            <GridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.description} label={"Description"} 
                    rules={{required: false}}  />
            }/>                          

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button> 

        </form>
        <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} severity={"success"} message={mode + " is successful!"}/>
    </Container>
}

interface IRowProp {
    component: JSX.Element,
    display?: "initial" | "none"
}
function GridRow({component, display="initial"}: IRowProp): JSX.Element {
    return <div>
        <Grid item xs={12} style={{display: display}}>
            {component}
        </Grid>
        <Grid item xs={12}><br/></Grid>
    </div>;
}

function initializeProduct(productId: number, name: string, category: string, description: string, originalPrice: number): Product {
    let product: Product = new Product();
    product.productId = productId > 0 ? productId : 0;  //When creating product, productId is set to null from react hook form
    product.name = name;
    product.category = category;
    product.description = description;
    product.originalPrice = originalPrice;
    product.producerId = 1;
    return product;
}
 