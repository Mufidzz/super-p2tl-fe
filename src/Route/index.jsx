import React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { firebase_app, auth0 } from '../Config/Config';
import { Auth0Provider } from '@auth0/auth0-react';
import {
        configureFakeBackend,
        authHeader,
        handleResponse,
} from '../Services/fack.backend';
import Callback from '../Auth/Callback';
import Loader from '../Layout/Loader';
import { authRoutes } from './AuthRoutes';
import LayoutRoutes from '../Route/LayoutRoutes';
import Signin from '../Auth/Signin';
import PrivateRoute from './PrivateRoute';

// setup fake backend
configureFakeBackend();
const Routers = () => {
        const [currentUser, setCurrentUser] = useState(false);
        const [authenticated, setAuthenticated] = useState(false);
        const jwt_token = localStorage.getItem('token');

        useEffect(() => {
                // let abortController = new AbortController();
                // const requestOptions = { method: 'GET', headers: authHeader() };
                // fetch('/users', requestOptions).then(handleResponse);
                // firebase_app.auth().onAuthStateChanged(setCurrentUser);
                // setAuthenticated(JSON.parse(localStorage.getItem('authenticated')));
                // console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
                // console.disableYellowBox = true;
                // return () => {
                //         abortController.abort();
                // };

        }, []);

        return (
                <Auth0Provider domain={auth0.domain} clientId={auth0.clientId} redirectUri={auth0.redirectUri}>
                        <BrowserRouter >
                                <>
                                        <Suspense fallback={<Loader />}>
                                                <Routes>
                                                        <Route path='/' element={<PrivateRoute />}>
                                                                {
                                                                        // currentUser !== null || authenticated ||
                                                                jwt_token ?
                                                                        <Route exact
                                                                                path={`/`}
                                                                                element={<Navigate to={`${process.env.PUBLIC_URL}/login`} />}
                                                                        /> : ''}
                                                                <Route path={`/*`} element={<LayoutRoutes />} />
                                                        </Route>
                                                        <Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />
                                                        <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
                                                        {authRoutes.map(({ path, Component }, i) => (
                                                                <Route path={path} element={Component} key={i} />
                                                        ))}
                                                </Routes>
                                        </Suspense>
                                </>
                        </BrowserRouter>
                </Auth0Provider>
        );
};

export default Routers;