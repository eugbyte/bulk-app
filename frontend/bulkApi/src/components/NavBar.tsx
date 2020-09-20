import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Navbar, Nav } from 'react-bootstrap';
import "./NavBar.css";


export function NavBar() {
  
  const classes = useStyles();

  return (
    <div>
      <Navbar expand="lg" variant="dark" style={{backgroundColor: "#3f51b5"}}>
          <Navbar.Brand>BulkApi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Button color="inherit" ><NavLink to="/" className={classes.navLink} >Products</NavLink></Button>
              <Button color="inherit"><NavLink to="/cart" className={classes.navLink}>Cart</NavLink></Button>
              <Button color="inherit"><NavLink to="/orders" className={classes.navLink}>Orders</NavLink></Button>
                {/* <Button color="inherit">
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
                </Button> */}
              </Nav>          
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
        
    }
  }),
);
