import React from 'react';
import './App.css';
import { DiscountSchemesPage } from './containers/DiscountSchemesPage';
import { Route } from 'react-router-dom';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { CartPage } from './containers/CartPage';
import { OrdersPage } from './containers/OrdersPage';
import { ProducerDiscountSchemePage } from './containers/ProducerDiscountSchemePage';
import { DiscountSchemeForm } from './containers/DiscountSchemeForm';
import { ProductForm } from './containers/ProductForm';
import { ProductsPage } from './containers/ProductsPage';
import { LoginForm } from './containers/LoginForm';
import { PrivateRoute } from './components/app/PrivateRoute';
import { Claims } from './models/AuthVM';
import { NavBar } from './components/app/NavBar';
import { DiscountSchemeDetailHOC } from './containers/DiscountSchemeDetail/DiscountSchemeDetailHOC';

function App() {

  return (
      <div className="App">
        <Router>
          <NavBar/>
          <Switch>
            {/* Public Paths */}
            <Route exact path="/" component={ DiscountSchemesPage } />
            <Route path="/login" component={ LoginForm } />

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
