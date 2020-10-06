import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../models/Product";
import { RootState } from "../store/rootReducer";
import { deleteProductAsync, getProductsAsync } from "../store/thunks/productThunk";
import { Dispatch } from "redux"; 
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Container, Grid } from "@material-ui/core";
import { DialogComponent } from "../components/DialogComponent";
import { DataTable } from "../components/DataTable";



class Row {
    name: string | undefined;
    originalPrice: number | undefined;
    category: string | undefined;
    description: string | undefined;
    update: JSX.Element | undefined;
    delete: JSX.Element | undefined;
}

export function ProductsPage(): JSX.Element {
    document.title = "Products";
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory(); 

    const products: Product[] = useSelector((action: RootState) => action.productReducer.products as Product[]) ?? [];
    useEffect(() => {
        const producerId = 1;
        const action = getProductsAsync(producerId);
        dispatch(action);        
    }, []);

    const columnNames: string[] = ["Name", "Original Price", "Category",  "Description", "Update","Delete"];
    const accessors: string[] = Object.keys(new Row());
    const rows: Row[] = products.map(product => createRow(product));

    const deleteProduct = (productId: number) => {
        const action = deleteProductAsync(productId);
        dispatch(action);
    }

    // When user clicks delete in the opened product dialog, close it, then open another and confirm delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); 

    for(let i = 0; i < products.length; i++) {
        let product: Product = products[i];
        const updateProduct = () => history.push("/producer/product/" + product.productId);
        const onDeleteClick = () => {
            setOpenDeleteDialog(true);
            deleteProduct.bind(null, product.producerId);
        }

        rows[i].update = <Button size="small" variant="outlined" onClick={updateProduct}>Update</Button>
        rows[i].delete = <Button color="secondary" size="small" variant="outlined" onClick={onDeleteClick}>Delete</Button>
        
    }    

    return <Container>
        <DataTable columnNames={columnNames} accessors={accessors} data={rows} title={"Products"} enablePaging={true} pageSize={5} />
        <DialogComponent open={openDeleteDialog} toggleOpen={() => setOpenDeleteDialog(!openDeleteDialog)} content={<p>Confirm Delete?</p>}
            secondaryAction={deleteProduct} secondaryActionTitle="Delete Product"/>
    </Container>
}

function createRow(product: Product): Row {
    let row: Row = new Row();
    row.name = product.name;
    row.originalPrice = product.originalPrice;
    row.category = product.category;
    row.description = product.description;
    return row;
}