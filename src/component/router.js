import React, { Suspense } from 'react';
import {  Router, Redirect, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import PrivateRoute from "./privateRouter";
import PublicRoute from "./publicRouter";

const Login = React.lazy(() => import('../containers/login'));
const SignUp = React.lazy(() => import('../containers/signUp'));
const Dashboard = React.lazy(() => import('../containers/dashboard'));
const NotFound = React.lazy(() => import('./common/notFound'));
const SelectBox = React.lazy(() => import('./common/materialUI/select'));
const AddProduct = React.lazy(() => import('./product/AddProduct/index'));
const Product = React.lazy(() => import('./product/viewProduct'));


const Routes = ({tokenCustom}) => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Router history={history}>
                    <Switch>
                        <PublicRoute exact path='/404' component={NotFound} isAuthenticated={tokenCustom} />
                        <PublicRoute exact path='/login' component={Login} isAuthenticated={tokenCustom} />
                        <PublicRoute path='/dashboard' component={Dashboard} isAuthenticated={tokenCustom}  exact />
                        <PrivateRoute path='/addproduct/:id' component={AddProduct} isAuthenticated={tokenCustom}  exact />
                        <PrivateRoute path='/product' component={Product} isAuthenticated={tokenCustom}  exact />
                        <PrivateRoute path='/select' component={SelectBox} isAuthenticated={tokenCustom}  exact />
                        <PublicRoute exact path='/signup' component={SignUp} isAuthenticated={tokenCustom} />
                        <Redirect to='/login' />
                    </Switch>
                </Router>
            </Suspense>
        </>
    );
};


const mapStateToProps = state =>({
    tokenCustom:  (state.userReducer && state.userReducer.user && state.userReducer.user.token) || '',
})

export default connect(mapStateToProps) (Routes);

