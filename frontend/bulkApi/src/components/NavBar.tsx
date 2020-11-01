import React, { Dispatch, Fragment, useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Navbar, Nav, NavDropdown, DropdownButton } from 'react-bootstrap';
import "./NavBar.css";
import { AuthVM } from '../models/AuthVM';
import { CLAIMS } from '../enums/Claims';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { AuthContext } from './contexts/AuthContext';
import { logoutSync } from '../store/thunks/authThunk';
import { ACTIONS } from '../store/actionEnums';


export function NavBar() {
  
  const classes = useStyles();
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch(); 

  let authVM: AuthVM = useSelector((action: RootState) => action.authReducer.authVM) ?? new AuthVM("ACCOUNT");

  let logoutMessage: string = useSelector((action: RootState) => action.authReducer.message) ?? "";

  // When user refresh window, reducer state resets
  // Retrieve again from localstorage
  if (localStorage.getItem("authVM")) {
    authVM = JSON.parse( localStorage.getItem("authVM") as string );
  } 

  const logout = () => {
    const action = logoutSync();
    dispatch(action);
  }

  useEffect(() => {
    if (logoutMessage === ACTIONS.LOGOUT_SUCCESS) {
      history.push("/login");
    }
  }, [logoutMessage])

  return (
    <div>
      <Navbar expand="lg" variant="dark" className={classes.blueBg}>
          <Navbar.Brand><NavLink to="/" className={classes.navLink} >BulkApi</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

                {/* Consumer NavBar */}
                { authVM.claims?.includes(CLAIMS.CONSUMER) &&

                  <Fragment>
                    <Button color="inherit" ><NavLink to="/" className={classes.navLink} >Products</NavLink></Button>
                    <Button color="inherit"><NavLink to="/cart" className={classes.navLink}>Cart</NavLink></Button>
                    <Button color="inherit"><NavLink to="/orders" className={classes.navLink}>Orders</NavLink></Button>
                  </Fragment>
                }
              
                {/* Producer NavBar */}
                { authVM.claims?.includes(CLAIMS.PRODUCER) &&
                  <Fragment>
                    <Button color="inherit"><NavLink to="/producer/discountSchemes" className={classes.navLink} >Schemes</NavLink></Button>
                    <Button color="inherit"><NavLink to="/producer/products" className={classes.navLink} >Products</NavLink></Button>                    
                  </Fragment>
                }
                
              </Nav>

              {/* Authentication DropDown */}
              <DropdownButton alignRight title={authVM.userName}>
              { authVM.isAuthenticated
                ? <NavDropdown.Item >
                    <Nav.Link as={NavLink} onClick={logout} to="/login" style={{color: "black"}}>LOGOUT</Nav.Link>
                  </NavDropdown.Item> 
                : <NavDropdown.Item >
                  <Nav.Link as={NavLink} to="/login" style={{color: "black"}}>LOGIN</Nav.Link>
                </NavDropdown.Item> 
              }
              </DropdownButton>
                  
                       
                
          </Navbar.Collapse>
          
      </Navbar>
      <br/>
    </div>
  );
}
 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navLink: {
        color: "white",
        textDecoration: "inherit",        
    },
    blueBg: {
      backgroundColor: "#3f51b5",
      textDecoration: "inherit", 
    },
    dropDownLink: {
      color: "black",
      textDecoration: "inherit",
    }
  }),
);
