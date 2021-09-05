import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
//views
import LoginView from '../views/Login'; 
import RegisterView from '../views/Register';
import Dashboard from '../views/Dashboard';
import PostTransactionView from '../views/PostTransaction';
import UpdateTransactionView from '../views/UpdateTransaction';
import Home from '../views/Home';

//layout
import NavBar from '../layout/navBar';
import Footer from '../layout/footer';

const Routes = () => {
    let token = window.localStorage.getItem('token');
    return (
        <Router>
            <NavBar token={token}/>
            <Switch>
                <Route path="/" exact><Home /></Route>
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
            <Footer />
        </Router>
    )
}

export default Routes
