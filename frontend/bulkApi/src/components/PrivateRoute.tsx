import React, { Fragment, FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from 'react-router-dom';
import { AuthVM } from "../models/AuthVM";
import { RootState } from "../store/rootReducer";

interface IProp {
    component: FunctionComponent;
    path: string;
    requiredClaims?: string[];
}

export function PrivateRoute({component, path, requiredClaims=[]}: IProp): JSX.Element {    

    let authVM: AuthVM;

    try {
        authVM = JSON.parse(localStorage.getItem("authVM") as string);
    } catch (error) {
        console.log(error);
        authVM = new AuthVM();
    }
     
    let isAuthenticated: boolean = authVM.isAuthenticated === true ? true : false;
    let claims: string[] = authVM.claims;
    let history = useHistory();

    if (!isAuthenticated) {
        console.log("not authenticated");
        history.push("/login");
    }

    let isAuthorized: boolean = requiredClaims.every(requiredClaim => claims.includes(requiredClaim));

    if (!isAuthorized) {
        console.log("not authorized");
        history.push("/login");
    }

    return <Route path={path} component= { component } />
     
}