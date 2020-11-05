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
import { AuthContext } from './contexts/AuthContext';
import { AuthVM, Claims } from './models/AuthVM';

function App() {

  return (
      <div className="App">
        <Router>
          <NavBar/>
          <Switch>
            {/* Public Paths */}
            <Route path="/login" component={ LoginForm } />
            <Route exact path="/" component={ DiscountSchemesPage } />

            {/* Consumer paths */}
            <PrivateRoute path="/discountScheme/:discountSchemeId" component= { DiscountSchemeDetailHOC } requiredClaims={[Claims.CONSUMER]} />
            <PrivateRoute path="/cart" component= { CartPage } requiredClaims={[Claims.CONSUMER]} />
            <PrivateRoute path="/orders" component= { OrdersPage } requiredClaims={[Claims.CONSUMER]} />

            {/* Producer paths */}
            <PrivateRoute path="/producer/products" component = { ProductsPage } requiredClaims={[Claims.PRODUCER]} />
            <PrivateRoute path="/producer/product/:productId" component = { ProductForm } requiredClaims={[Claims.PRODUCER]} />            
            <PrivateRoute path="/producer/discountSchemes/create" component = { DiscountSchemeForm } requiredClaims={[Claims.PRODUCER]} />
            <PrivateRoute path="/producer/discountSchemes" component = { ProducerDiscountSchemePage } requiredClaims={[Claims.PRODUCER]} />
          </Switch>
        </Router> 
      </div>    
  );
}

export default App;
