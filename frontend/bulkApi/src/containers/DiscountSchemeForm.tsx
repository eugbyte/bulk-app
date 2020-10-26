import React, { useEffect } from "react";
import { Container, Grid, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; 
import { Product } from "../models/Product";
import { RootState } from "../store/rootReducer";
import { getProductsAsync } from "../store/thunks/productThunk";
import { SelectListItem } from "../models/SelectListItem";
import { DatePickerUncontrolledComponent } from "../components/DatePickerComponent";
import { useForm, Controller } from "react-hook-form";
import { TextFieldUncontrolledComponent } from "../components/TextFieldComponents";
import Button from '@material-ui/core/Button';
import { DiscountScheme } from "../models/DiscountScheme";
import { TextComponent } from "../components/TextComponent";
import { createDiscountSchemeAsync } from "../store/thunks/discountSchemeThunk";
import { ACTIONS } from "../store/actionEnums";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";

enum FORM_NAMES {
    productId = "productId",
    discountedPrice = "discountedPrice",
    minOrderQnty = "minOrderQnty",
    deliveryCharge = "deliveryCharge",
    expiryDate = "expiryDate"
}

export function DiscountSchemeForm(): JSX.Element {
    document.title = "Create Discount Scheme";

    const dispatch: Dispatch<any> = useDispatch(); 
    const history = useHistory();  

    const products: Product[] = useSelector((action: RootState) => action.productReducer.products as Product[] ) ?? [];  

    let selectListItems: SelectListItem[] = products.map(product => new SelectListItem(product.name, product.productId));

    useEffect(() => {
        const producerId: number = 2;
        const action = getProductsAsync(producerId);
        dispatch(action);
    }, []);  

    // React hook form - uncontrolled state that uses useRef behind the scenes
    const { errors, handleSubmit, control, getValues, watch } = useForm();    

    const watchProductId: number = watch(FORM_NAMES.productId, 0);
    const selectedProduct: Product = products.find(product => product.productId === watchProductId) ?? new Product();
    const productTextDict: Record<string, any> = {
        "Original Price": "$" + selectedProduct.originalPrice,
        "Description": selectedProduct.description
    }
    console.log("watchProductId", watchProductId);    

    const onSubmit = (data: any) => {
        //console.log(data, errors);
        const {productId, discountedPrice, minOrderQnty, deliveryCharge, expiryDate} = getValues([FORM_NAMES.productId, FORM_NAMES.discountedPrice, 
            FORM_NAMES.minOrderQnty, FORM_NAMES.deliveryCharge, FORM_NAMES.expiryDate]);
        const discountScheme: DiscountScheme = createDiscountScheme(productId, minOrderQnty, discountedPrice, expiryDate, deliveryCharge);
        const action = createDiscountSchemeAsync(discountScheme);
        dispatch(action);
    }   

    // If create is successful, redirect
    const apiMessage: string = useSelector( (action: RootState) => action.discountSchemeReducer.httpMessage as string ) ?? ""; 
    useEffect(() => {
        if (apiMessage.includes(ACTIONS.HTTP_CREATE_SUCCESS)) {
            history.push("/producer/discountSchemes");
        }
    }, [apiMessage]);

    // Redirect to product form if user decides to create new product
    const redirectToProductForm = () => history.push("/producer/product/" + "0");

    return <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <Grid container justify="flex-start">
                <Grid item xs={4}>
                    <Controller                     
                        control={control}
                        name={FORM_NAMES.productId}                
                        rules={{"required": true }}
                        render={({onChange}: any) =>  <Autocomplete
                                id="combo-box-demo"
                                options={products}
                                getOptionLabel={(option: Product) => option.name ?? ""}
                                style={{ width: 300 }} 
                                onChange={(event: any, data) => onChange((data as Product).productId)}                                
                                renderInput={(params) => <TextField {...params} label="Products" variant="outlined" />}  
                                />
                        }
                    />
                    {errors["productId"] &&
                        <p style={{fontSize: "14px", color: "red", textAlign: "left"}}>Product is required</p>                                            
                    }
                
                    {/* <SelectUncontrolledComponent title={"Choose Product"} selectListItems={selectListItems} name={FORM_NAMES.productId} errorMessage="Scheme is required"
                        control={control} errors={errors} rules={{required: true}} /> */}
                </Grid>                
                <Grid item xs={3} alignItems="flex-end">
                    <Button onClick={redirectToProductForm} variant="outlined" size="small" style={{bottom: "-30%"}} >Or create one</Button>
                </Grid>
                <EmptyGridRow />

                { watchProductId > 0 &&
                    <Grid item xs={12}>
                        <TextComponent textDict={productTextDict}  color={"textSecondary"} />
                    </Grid>
                }
                <EmptyGridRow />

                <Grid item xs={12}>
                    <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.discountedPrice} label={"Discounted Price"} errorMessage={"Discounted Price is required"} 
                        rules={{required: true, min: 1}} adornment={"$"} />
                </Grid>
                <EmptyGridRow />

                <Grid item xs={12}>
                    <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.minOrderQnty} label={"Minimum order quantity"} errorMessage={"Minimum order quantity is required"} 
                        rules={{required: true, min: 1}} />
                </Grid>
                <EmptyGridRow />

                <Grid item xs={12}>
                    <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.deliveryCharge} label={"Delivery Charge"} errorMessage={"Delivery Charge is required"} 
                        rules={{required: true, min: 1}} adornment={"$"} />        
                </Grid>
                <EmptyGridRow />

                <Grid item xs={2}>
                    <DatePickerUncontrolledComponent label={"Expiry Date"} name={FORM_NAMES.expiryDate} 
                        control={control} errors={errors} rules={{required: true}} errorMessage={"Expiry Date is required"} />
                </Grid>
                <EmptyGridRow />

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button> 
                </Grid>
                <EmptyGridRow />

            </Grid>            
                        
        </form>
    </Container>
}

function createDiscountScheme(productId: number, minOrderQnty: number, discountedPrice: number, expiryDate: Date, deliveryCharge: number): DiscountScheme {
    let discountScheme: DiscountScheme = new DiscountScheme();
    discountScheme.productId = productId;
    discountScheme.minOrderQnty = minOrderQnty;
    discountScheme.discountedPrice = discountedPrice;
    discountScheme.expiryDate = expiryDate;
    discountScheme.deliveryCharge = deliveryCharge;

    return discountScheme;
}

function EmptyGridRow(): JSX.Element {
    return <Grid item xs={12}><br/></Grid>;
}
