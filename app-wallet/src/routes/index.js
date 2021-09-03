import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import LoginView from '../views/Login'; 
import RegisterView from '../views/Register';
import Dashboard from '../views/Dashboard';
import PostTransactionView from '../views/PostTransaction';
import UpdateTransactionView from '../views/UpdateTransaction';

const Routes = () => {
    const token = window.localStorage.getItem('token');
    return (
        <Router>
            <Switch>

                <Route path="/register" render={() =>{
                    return token ? <Redirect to="/dashboard" /> : <RegisterView />
                }} />

                <Route path="/login" render={() =>{
                    return token ? <Redirect to="/dashboard" /> : <LoginView />
                }} />

                <Route path="/dashboard" render={() =>{
                    return token ?  <Dashboard /> : <Redirect to="/login" />
                }} />

                <Route path="/post" render={() =>{
                    return token ?  <PostTransactionView />: <Redirect to="/login" />
                }} />

                <Route path="/update/:id" render={() =>{
                    return token ?  <UpdateTransactionView />: <Redirect to="/login" />
                }} />
            </Switch>
        </Router>
    )
}

export default Routes
