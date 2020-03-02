import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

//Components
import CategoryList from "./category/CategoryList";
import ProductList from "./product/ProductList";
import BPartnerForm from "./bpartner/BPartnerForm";
import LoginPage from "./login/LoginPage";
import Home from "./Home";
import Nav from "./Nav";

const AppRouter = () => {
    return(
      <Router>
        <Nav />
        <Switch>
          <Route path={"/"} exact component={CategoryList} />
          <Route path="/bpartner" component={BPartnerForm} />
          <Route path="/categories" component={CategoryList} />
          <Route path="/products" component={ProductList} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default AppRouter;