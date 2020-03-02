import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './_services/PrivateRoute';

//Components
import { HomePage } from './components/home/HomePage';
import { LoginPage } from './components/login/LoginPage';
import { LogoutPage } from './components/login/LogoutPage';
import { CategoriesPage } from './components/categories/CategoriesPage';
import { ProductsPage } from './components/products/ProductsPage';
import { CategoryPage } from './components/categories/CategoryPage';
import { ProductPage } from './components/products/ProductPage';
import { RegisterPage } from './components/registers/RegisterPage';
import { RegistersPage } from './components/registers/RegistersPage';
import { OperationsPage } from './components/operations/OperationsPage';
import { OperationPage } from './components/operations/OperationPage';
import { OrdersPage } from './components/orders/OrdersPage';
import { TablesPage } from './components/tables/TablesPage';
import { TablePage } from './components/tables/TablePage';
import { TurnsPage } from './components/orders/TurnsPage';
import { TurnPage } from './components/orders/TurnPage';
import { UsersPage } from './components/users/UsersPage';
import { UserPage } from './components/users/UserPage';
import { NotFound } from './components/notfound/NotFound';
import { NavBar } from './components/navbar/NavBar';

import { userService } from './_services';

class App extends Component {
  constructor(props) {
      super(props);
  }

    render() {
        return (
            
            <div>              
                <Router basename={process.env.PUBLIC_URL}>
                    <div className="wrapper">
                    {! userService.isLogged() ? null : <NavBar />}            
                        <Switch>                        
                            <Route path="/login" component={LoginPage} />
                            <Route path="/logout" component={LogoutPage} />
                            <PrivateRoute path="/" exact component={HomePage} />                         
                            <PrivateRoute path="/categories" component={CategoriesPage} />
                            <PrivateRoute path="/category/:id" component={CategoryPage} />
                            <PrivateRoute path="/products" component={ProductsPage} />
                            <PrivateRoute path="/product/:id" component={ProductPage} />
                            <PrivateRoute path="/user/:id" component={UserPage} />
                            <PrivateRoute path={"/orders"} component={OrdersPage} />
                            <PrivateRoute path={"/users"} component={UsersPage} />
                            <PrivateRoute path={"/operations"} component={OperationsPage} />
                            <PrivateRoute path={"/operation/:id"} component={OperationPage} />
                            <PrivateRoute path={"/registers"} component={RegistersPage} />
                            <PrivateRoute path={"/register/:id"} component={RegisterPage} />
                            <PrivateRoute path={"/tables"} component={TablesPage} />
                            <PrivateRoute path={"/table/:id"} component={TablePage} />
                            <PrivateRoute path={"/turns"} component={TurnsPage} />
                            <PrivateRoute path={"/turn/:id"} component={TurnPage} />
                            <PrivateRoute path={"/listdetail/:id"} component={HomePage} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                        </div>
                </Router>
                </div>
        );
  }
}

export default App;