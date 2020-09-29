import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { TextFieldUncontrolledComponent } from "../components/TextFieldComponents";
import { Product } from "../models/Product";
import { createProductsAsync } from "../store/thunks/productThunk";

enum FORM_NAMES {
    productId = "productId",
    name = "name",
    category = "category",
    description = "description",
    originalPrice = "originalPrice"
}

type MODE = "CREATE" | "UPDATE";

export function ProductForm(): JSX.Element {
    document.title = "Product Form";
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory();

    let routeParams: Record<string, string>  = (useParams()) as Record<string, string>;
    const productId: number = parseInt(routeParams["productId"]);

    const mode: MODE = productId === 0 ? "CREATE" : "UPDATE";

    const { errors, handleSubmit, control, getValues, watch } = useForm(); 

    const onSubmit = () => {
        const {productId, name, category, description, originalPrice} = getValues([FORM_NAMES.productId, FORM_NAMES.name, 
            FORM_NAMES.category, FORM_NAMES.description, FORM_NAMES.originalPrice]);
        const product = initializeProduct(name, category, description, originalPrice, productId);
        const action = createProductsAsync(product);
        dispatch(action);
    };

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

        </form>
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
 