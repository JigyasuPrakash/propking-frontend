import React from 'react';
import Home from './components/Home';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Error404 from './components/Error/Error404';
import Builder from './components/Builder/Builder';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route render={({ location }) => (
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/builder" component={Builder} />
          <Route path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      )} />
    </BrowserRouter>
  );
}

export default App;
