import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';
import Test from './pages/teste';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />,
                <Route path="/repository/:repository" component={Repository} />
                <Route path="/teste" component={Test} />
            </Switch>
        </BrowserRouter>
    );
}
