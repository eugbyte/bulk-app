import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { TextFieldUncontrolledComponent } from "../components/TextFieldComponents";
import { IdentityUser } from "../models/IdentityUser";
import { loginAsync } from "../store/thunks/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux"; 
import { AuthVM } from "../models/AuthVM";
import { RootState } from "../store/rootReducer";
import { SnackbarComponent } from "../components/SnackbarComponent"; 

enum FORM_NAMES {
    userName = "userName",
    passwordHash = "passwordHash"
}

type FORM_DATA = {
    "userName" : string,
    "passwordHash": string;
}


export function LoginForm(): JSX.Element {
    document.title = "Login";
    const dispatch: Dispatch<any> = useDispatch();
    const history = useHistory();

    let [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    let defaultAuthVM = new AuthVM();
    defaultAuthVM.isAuthenticated = "UNTOUCHED";

    let authVM: AuthVM = useSelector((action: RootState) => action.authReducer.authVM) ?? defaultAuthVM;

    useEffect(() => { 
        if (authVM.isAuthenticated === "UNTOUCHED") {
            return;
        }

        if (authVM.isAuthenticated) {
            history.push("");
        } else {
            setOpenSnackBar(true);
        }
    }, [authVM.isAuthenticated]);
  

    const { errors, handleSubmit, control } = useForm<FORM_DATA>(); 

    const onSubmit = (data: FORM_DATA) => {
        console.log(data);
        let identityUser: IdentityUser = new IdentityUser();
        identityUser.userName = data.userName;
        identityUser.passwordHash = data.passwordHash;

        const action = loginAsync(identityUser);
        dispatch(action);

    }

    return <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
            <GridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.userName} label={"UserName"} 
                    variant="outlined"
                    rules={{required: true}} errorMessage="Name is required" />
            }/>
            
            <GridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.passwordHash} label={"Password"} 
                    variant="outlined" type="password"
                    rules={{required: true}} errorMessage="Password is required" />
            }/>
                        

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button> 

        </form>
        <SnackbarComponent open={openSnackBar} setOpen={setOpenSnackBar} message="Authentication failed" severity="error"/>
    </Container>
}

interface IRowProp {
    component: JSX.Element,
    display?: "initial" | "none"
}

function GridRow({component, display="initial"}: IRowProp): JSX.Element {
    return <div>
        <Grid item xs={12}>
            {component}
        </Grid>
        <Grid item xs={12}><br/></Grid>
    </div>;
}