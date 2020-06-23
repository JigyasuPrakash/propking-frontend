import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Error404 from './components/Error/Error404';
import Builder from './components/Builder/Builder';
import Generate from './components/Generate/Generate';
import Preview from './components/Preview/Preview';
import GetAll from './components/GetAll';
import Home from './components/Home';
import Header from './components/Header/Header';
import Project from './components/Project';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route render={({ location }) => (
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/getall" component={GetAll} />
          <Route path="/project/:id" component={Project} />
          <Route path="/builder" component={Builder} />
          <Route path="/generate/:id" component={Generate} />
          <Route path="/preview/:id" component={Preview} />
          <Route path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      )} />
    </BrowserRouter>
  );
}

export default App;
