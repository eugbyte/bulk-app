import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../models/Product";
import { RootState } from "../store/rootReducer";
import { deleteProductAsync, getProductsAsync } from "../store/thunks/productThunk";
import { Dispatch } from "redux"; 
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Container, Grid } from "@material-ui/core";
import { DialogComponent } from "../components/shared/DialogComponent";
import { DataTable } from "../components/shared/DataTable";
import "./toolTip.css";
import { ACTIONS } from "../store/actionEnums";
import { DataTableService } from "../services/DataTableService";


export class Row {
    name: string | undefined;
    originalPrice: string | undefined;
    category: string | undefined;
    description: string | undefined;
    update: JSX.Element | undefined;
    delete: JSX.Element | undefined;
}

export function ProductsPage(): JSX.Element {
    document.title = "Products";
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory(); 
    const producerId = 2;

    const products: Product[] = useSelector((action: RootState) => action.productReducer.products as Product[]) ?? [];
    useEffect(() => {
        
        const action = getProductsAsync(producerId);
        dispatch(action);        
    }, [dispatch]);

    const columnNames: string[] = ["Name", "Original Price", "Category",  "Description", "Update","Delete"];
    const accessors: string[] = Object.keys(new Row());
    const rows: Row[] = [];

    // When user clicks delete in the opened product dialog, confirm delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); 

    const [targetProduct, setTargetProduct] = useState<Product>(new Product());
    const deleteProduct = () => {
        if (targetProduct.discountSchemes.length > 0) {
            return;
        }
        const action = deleteProductAsync(targetProduct.productId);
        dispatch(action);
        setOpenDeleteDialog(false);
    } 

    let httpResponseMessage: string = useSelector((action: RootState) => action.productReducer.httpMessage as string);
    useEffect(() => {
        if (httpResponseMessage.includes(ACTIONS.HTTP_DELETE_SUCCESS)) {
            const action = getProductsAsync(producerId);
            dispatch(action);
        }
    }, [httpResponseMessage, dispatch]); 

    for (let i = 0; i < products.length; i++) {
        let product: Product = products[i];

        const updateProduct = () => history.push("/producer/product/" + product.productId);
        const onDeleteClick = () => {
            setOpenDeleteDialog(true);
            setTargetProduct(product);
        }

        let row: Row = DataTableService.createRowFromProduct_ProductsPage(product, updateProduct, onDeleteClick);
        rows.push(row);
    }    

    const redirectToProductForm = () => history.push("/producer/product/" + 0);

    return <Container>
        <Grid container>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
                <Button variant="contained" onClick={redirectToProductForm} color="primary">Create Product</Button>
            </Grid>
        </Grid>
        <Grid item xs={12}><br/></Grid>
        <DataTable columnNames={columnNames} accessors={accessors} data={rows} title={"Products"} enablePaging={true} pageSize={5} />
        <DialogComponent open={openDeleteDialog} toggleOpen={() => setOpenDeleteDialog(!openDeleteDialog)} content={<p>Confirm Delete?</p>}
            secondaryAction={deleteProduct} secondaryActionTitle="Delete Product"/>
    </Container>
}

