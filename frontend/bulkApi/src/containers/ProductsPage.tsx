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
import "./toolTip.css";


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
    const producerId = 1;

    const products: Product[] = useSelector((action: RootState) => action.productReducer.products as Product[]) ?? [];
    useEffect(() => {
        
        const action = getProductsAsync(producerId);
        dispatch(action);        
    }, []);

    const columnNames: string[] = ["Name", "Original Price", "Category",  "Description", "Update","Delete"];
    const accessors: string[] = Object.keys(new Row());
    const rows: Row[] = [];

    // When user clicks delete in the opened product dialog, close it, then open another and confirm delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); 

    const [targetProduct, setTargetProduct] = useState<Product>(new Product());
    const deleteProduct = () => {
        console.log("productId", targetProduct.productId);
        if (targetProduct.discountSchemes.length > 0) {
            return;
        }
        const action = deleteProductAsync(targetProduct.productId);
        dispatch(action);

        setOpenDeleteDialog(false);

        // Refresh and get updated products
        dispatch(getProductsAsync(producerId));
    } 

    for(let i = 0; i < products.length; i++) {
        let product: Product = products[i];
        let row: Row = createRow(product);

        const updateProduct = () => history.push("/producer/product/" + product.productId);
        const onDeleteClick = () => {
            setOpenDeleteDialog(true);
            setTargetProduct(product);
        }

        // If product already has schemes, disallow delete
        const isDisableDelete: boolean = product.discountSchemes.length > 0;
        let tooltipMessage: string = isDisableDelete ? "Cannot delete product as it has dependent discount schemes" : "Delete";

        row.update = <Button size="small" variant="outlined" onClick={updateProduct}>Update</Button>
        row.delete = <div className="a">
            <Button color="secondary" size="small" variant="outlined"  
                disabled={isDisableDelete} 
                onClick={onDeleteClick}>Delete<span className="tooltiptext">{tooltipMessage}</span></Button> 
        </div> 
        rows.push(row);
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