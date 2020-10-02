import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { useHistory, useParams } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { TextFieldUncontrolledComponent } from "../components/TextFieldComponents";
import { Product } from "../models/Product";
import { createProductsAsync, getProductAsync, updateProductAsync } from "../store/thunks/productThunk";
import { RootState } from "../store/rootReducer";
import Button from '@material-ui/core/Button';
import { ModeComment } from "@material-ui/icons";
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

    useEffect(() => {
        if (mode === "UPDATE") {
            const action = getProductAsync(productId);
            dispatch(action);
        }   
    }, [productId]);

    let productToUpdate: Product = useSelector((action: RootState) => action.productReducer.product as Product ) ?? new Product();

    const { errors, handleSubmit, control, getValues, setValue } = useForm(); 
    
    if (mode === "UPDATE") {
        setValue(FORM_NAMES.productId, productToUpdate.productId);
        setValue(FORM_NAMES.name, productToUpdate.name);
        setValue(FORM_NAMES.category, productToUpdate.category);
        setValue(FORM_NAMES.description, productToUpdate.description);
        setValue(FORM_NAMES.originalPrice, productToUpdate.originalPrice);
    }

    const onSubmit = () => {
        const {productId, name, category, description, originalPrice} = getValues([FORM_NAMES.productId, FORM_NAMES.name, 
            FORM_NAMES.category, FORM_NAMES.description, FORM_NAMES.originalPrice]);
        const product = initializeProduct(name, category, description, originalPrice, productId);
        console.log("submitting product", product);
        if (mode === "CREATE") {
            const action = createProductsAsync(product);
            dispatch(action);
        } else if (mode === "UPDATE") {
            product.producerId = productToUpdate.producerId;
            const action = updateProductAsync(productId, product);
            dispatch(action);
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
            <EmptyGridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.productId} label={"Product Id"} 
                    rules={{required: false}} />
            }/>
            
            <EmptyGridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.name} label={"Name"} 
                    rules={{required: true}} />
            }/>

            <EmptyGridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.originalPrice} label={"Original Price"} 
                    rules={{required: true, min: 1}} adornment={"$"} />
            } />

            <EmptyGridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.category} label={"Category"} 
                    rules={{required: true}} />
            }/>

            <EmptyGridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.description} label={"Description"} 
                    rules={{required: false}} />
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
function EmptyGridRow({component, display="initial"}: IRowProp): JSX.Element {
    return <div>
        <Grid item xs={12} style={{display: display}}>
            {component}
        </Grid>
        <Grid item xs={12}><br/></Grid>
    </div>;
}

function initializeProduct(name: string, category: string, description: string, originalPrice: number, productId=0): Product {
    let product: Product = new Product();
    product.productId = productId;
    product.name = name;
    product.category = category;
    product.description = description;
    product.originalPrice = originalPrice;
    return product;
}
 