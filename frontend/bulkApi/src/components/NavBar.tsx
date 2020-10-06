import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import "./NavBar.css";


export function NavBar() {
  
  const classes = useStyles();

  return (
    <div>
      <Navbar expand="lg" variant="dark" className={classes.blueBg}>
          <Navbar.Brand>BulkApi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Button color="inherit" ><NavLink to="/" className={classes.navLink} >Products</NavLink></Button>
                <Button color="inherit"><NavLink to="/cart" className={classes.navLink}>Cart</NavLink></Button>
                <Button color="inherit"><NavLink to="/orders" className={classes.navLink}>Orders</NavLink></Button>
                  
              </Nav>
              <Button color="inherit" style={{marginRight: "100px"}}>
                <NavDropdown title={<span className={classes.navLink}>Producer</span>} id="basic-nav-dropdown" style={{}} >
                    <NavDropdown.Item >
                      <Nav.Link as={NavLink} to="/producer/discountSchemes" style={{color: "black"}}>Manage Schemes</Nav.Link>
                    </NavDropdown.Item> 
                    <NavDropdown.Item >
                      <Nav.Link as={NavLink} to="/producer/products" style={{color: "black"}}>Manage Products</Nav.Link>
                    </NavDropdown.Item>      
                </NavDropdown>
              </Button>
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
