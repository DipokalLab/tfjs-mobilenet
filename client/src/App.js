import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RootPage from './pages/Root.js'
import './App.css'

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={RootPage} />
            </Switch>

        </div>
    );
};

export default App;