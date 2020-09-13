import React from 'react';
import './App.css';
import { DiscountSchemesPage } from './containers/DiscountSchemesPage';
import { NavBar } from './components/NavBar';
import { Route } from 'react-router-dom';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { DiscountSchemeDetailPage } from './containers/DiscountSchemeDetailPage';
import { CartPage } from './containers/CartPage';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/discountScheme/:discountSchemeId" component= { DiscountSchemeDetailPage } />
          <Route path="/cart" component= { CartPage } />
          <Route exact path="/" component={ DiscountSchemesPage } />
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
