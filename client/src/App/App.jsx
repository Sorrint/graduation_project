import React from 'react';
import '../style.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { publicRoutes } from './routes';
import UsersLoader from './components/ui/hoc/userLoader';
import ProtectedRoute from './components/common/protectedRoute';

export const getRoutes = (routes) => {
    return routes.map((route, key) => {
        return route.protected ? (
            <ProtectedRoute
                path={route.path}
                component={route.component}
                key={key}
                condition={route.condition}
                pathname={route.redirect}
            />
        ) : (
            <Route path={route.path} component={route.component} key={key} exact={route.exact} />
        );
    });
};

function App() {
    return (
        <>
            <UsersLoader>
                <Switch>
                    {getRoutes(publicRoutes)}
                    <Redirect to="/booking/" />
                </Switch>
            </UsersLoader>
        </>
    );
}

export default App;
