import React from "react";
import { AuthVM } from "../models/AuthVM";
import { Context } from "react";

const authVM: AuthVM = new AuthVM();
authVM.isAuthenticated = false;

export const AuthContext = React.createContext({
    authVM,
    setAuthVM: (val: AuthVM) => {}
});