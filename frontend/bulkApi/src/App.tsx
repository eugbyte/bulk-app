import React, { useState } from 'react';
import './App.css';
import { DiscountSchemesPage } from './containers/DiscountSchemesPage';
import { NavBar } from './components/NavBar';
import { Route } from 'react-router-dom';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { DiscountSchemeDetailHOC } from './containers/DiscountSchemeDetailHOC';
import { CartPage } from './containers/CartPage';
import { OrdersPage } from './containers/OrdersPage';
import { ProducerDiscountSchemePage } from './containers/ProducerDiscountSchemePage';
import { DiscountSchemeForm } from './containers/DiscountSchemeForm';
import { ProductForm } from './containers/ProductForm';
import { ProductsPage } from './containers/ProductsPage';
import { LoginForm } from './containers/LoginForm';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthContext } from './components/contexts/AuthContext';
import { AuthVM } from './models/AuthVM';

function App() {

  return (
      <div className="App">
        <Router>
          <NavBar/>
          <Switch>
            <Route path="/login" component={ LoginForm } />
            <Route path="/discountScheme/:discountSchemeId" component= { DiscountSchemeDetailHOC } />
            <Route path="/cart" component= { CartPage } />
            <Route path="/orders" component= { OrdersPage } />
            <Route path="/producer/products" component = { ProductsPage } />

            <PrivateRoute path="/producer/product/:productId" component = { ProductForm } />
            
            <Route path="/producer/discountSchemes/create" component = { DiscountSchemeForm } />
            <Route path="/producer/discountSchemes" component = { ProducerDiscountSchemePage } />
            <Route exact path="/" component={ DiscountSchemesPage } />
          </Switch>
        </Router> 
      </div>    
  );
}

export default App;
