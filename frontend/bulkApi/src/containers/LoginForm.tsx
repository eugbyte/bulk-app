import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { TextFieldUncontrolledComponent } from "../components/TextFieldComponents";
import { IdentityUser } from "../models/IdentityUser";
import { loginAsync } from "../store/thunks/authThunk";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux"; 

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

    const { errors, handleSubmit, control, getValues, reset, setValue } = useForm<FORM_DATA>(); 

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
                    rules={{required: true}} errorMessage="Name is required" />
            }/>
            
            <GridRow component={
                <TextFieldUncontrolledComponent isFullWidth={true} control={control} errors={errors} name={FORM_NAMES.passwordHash} label={"Password"} 
                    rules={{required: true}} errorMessage="Password is required" />
            }/>
                        

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button> 

        </form>
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