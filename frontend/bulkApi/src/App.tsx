import React from 'react';
import './App.css';
import { DiscountSchemesPage } from './containers/DiscountSchemesPage';
import { NavBar } from './components/NavBar';
import { Route } from 'react-router-dom';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { DiscountSchemeDetailHOC } from './containers/DiscountSchemeDetailHOC';
import { CartPage } from './containers/CartPage';
import { OrdersPage } from './containers/OrdersPage';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/discountScheme/:discountSchemeId" component= { DiscountSchemeDetailHOC } />
          <Route path="/cart" component= { CartPage } />
          <Route path="/orders" component= { OrdersPage } />
          <Route exact path="/" component={ DiscountSchemesPage } />
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
