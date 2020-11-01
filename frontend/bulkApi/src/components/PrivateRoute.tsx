import { Container } from "@material-ui/core";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useHistory } from 'react-router-dom';
import { ErrorPage } from "../containers/ErrorPage";
import { AuthVM } from "../models/AuthVM";
import { RootState } from "../store/rootReducer";
import { SnackbarComponent } from "./SnackbarComponent";

interface IProp {
    component: FunctionComponent;
    path: string;
    requiredClaims?: string[];
}

export function PrivateRoute({component, path, requiredClaims=[]}: IProp): JSX.Element {    

    let authVM: AuthVM = new AuthVM();

    if (localStorage.getItem("authVM")) {
        authVM = JSON.parse(localStorage.getItem("authVM") as string);
    }
     
    let isAuthenticated: boolean = authVM.isAuthenticated === true ? true : false;
    let claims: string[] = authVM.claims;
    let history = useHistory();

    if (!isAuthenticated) {
        console.log("not authenticated");
        history.push("/login");
    }

    let [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    let isAuthorized: boolean = requiredClaims.every(requiredClaim => claims.includes(requiredClaim));

    let linkToLoginForm: JSX.Element = <Fragment>
        <span>Not Authorized </span>
        <NavLink to="/login" style={{color: "white"}}><b>Click here to login</b></NavLink>
    </Fragment> 

    useEffect(() => {
        if (!isAuthorized) {
            console.log("not authorized");
            setOpenSnackBar(true);
            return;
            // history.push("/login");
        }
    }, [isAuthorized]);

    

    return <Fragment>
        {  isAuthorized
            ? <Route path={path} component= { component } />
            : <ErrorPage />
        }        
        <SnackbarComponent open={openSnackBar} setOpen={setOpenSnackBar} message={linkToLoginForm} severity="warning" autoHideDuration={10000}/>
    </Fragment>
     
}